package com.fincore.gateway.Config;

import com.fincore.gateway.Service.TokenSessionValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.server.WebFilter;
import reactor.core.publisher.Mono;

import java.net.UnknownHostException;
import java.util.Arrays;

@Slf4j
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Value("${security.jwt.bypass-paths:}")
    private String[] bypassPaths;

    private final TokenSessionValidator tokenSessionValidator;

    public SecurityConfig(TokenSessionValidator tokenSessionValidator) {
        this.tokenSessionValidator = tokenSessionValidator;
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        log.info("Initializing SecurityWebFilterChain, bypassPaths={}", Arrays.toString(bypassPaths));

        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchanges -> {
                    // Permit default public endpoints
                    exchanges.pathMatchers("/auth/login", "/actuator/info", "/actuator/health", "/reports/types")
                            .permitAll();

                    // Permit any configured bypass paths (from properties)
                    if (bypassPaths != null && bypassPaths.length > 0) {
                        Arrays.stream(bypassPaths).forEach(p -> {
                            if (p != null && !p.isBlank()) exchanges.pathMatchers(p).permitAll();
                        });
                    }

                    exchanges.anyExchange().authenticated();
                })
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
                // Run Redis validation right before authorization checks
                .addFilterAt(redisValidationFilter(), SecurityWebFiltersOrder.AUTHORIZATION)
                .build();
    }

    /**
     * A defensive reactive filter that validates the authenticated principal with Redis (or whatever TokenSessionValidator does).
     * Handles resolution/DNS errors explicitly and logs carefully.
     */
    private WebFilter redisValidationFilter() {
        return (exchange, chain) -> {
            log.debug("RedisValidationFilter invoked for path={}", exchange.getRequest().getPath());

            // Defer execution to subscription time
            return Mono.defer(() ->
                    exchange.getPrincipal()
                            .cast(Authentication.class)
                            // if there is no principal, continue the chain (unauthenticated requests are handled by security config)
                            .flatMap(auth -> {
                                log.debug("Principal found: {}", auth.getName());

                                // tokenSessionValidator.validateWithRedis(auth) should return Mono<Authentication> or similar
                                return tokenSessionValidator.validateWithRedis(auth)
                                        .doOnSuccess(validAuth -> log.debug("Redis validated principal={}", validAuth == null ? "null" : validAuth.getName()))
                                        // on success, continue filter chain
                                        .flatMap(validAuth -> chain.filter(exchange))
                                        // If validation completes empty, treat as unauthorized
                                        .switchIfEmpty(Mono.defer(() -> {
                                            log.warn("Redis validation returned empty for principal={}", auth.getName());
                                            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                                            return exchange.getResponse().setComplete();
                                        }))
                                        // Specific handling for DNS/resolve errors (service not reachable)
                                        .onErrorResume(UnknownHostException.class, ex -> {
                                            log.error("DNS/resolve error during redis validation: {}", ex.getMessage());
                                            exchange.getResponse().setStatusCode(HttpStatus.SERVICE_UNAVAILABLE); // 503
                                            return exchange.getResponse().setComplete();
                                        })
                                        // Generic error fallback: return 401 (do not leak internal exception)
                                        .onErrorResume(ex -> {
                                            log.error("Error in RedisValidationFilter for principal={} : {}", auth.getName(), ex.toString());
                                            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                                            return exchange.getResponse().setComplete();
                                        });
                            })
                            // No principal => just continue (authentication will be enforced later)
                            .switchIfEmpty(Mono.defer(() -> {
                                log.debug("No principal available for request {}, continuing chain", exchange.getRequest().getPath());
                                return chain.filter(exchange);
                            }))
            );
        };
    }

}