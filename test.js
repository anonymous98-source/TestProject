package com.fincore.gateway.Config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.interfaces.RSAPublicKey;
import java.util.Base64;

/**
 * Configures a ReactiveJwtDecoder bean based on the active JWT mode.
 *
 * <p>Two modes supported:</p>
 * <ul>
 *   <li><b>HMAC</b> — Uses a Base64-encoded HS256 secret key</li>
 *   <li><b>RSA</b> — Uses an RSA public key in PEM format</li>
 * </ul>
 *
 * <p>Switching between HMAC and RSA is done purely through properties,
 * no code changes needed.</p>
 */
@Configuration
public class JwtDecoderConfig {

    @Value("${security.jwt.mode:hmac}")
    private String mode;

    @Value("${security.jwt.hmac-base64-secret:}")
    private String hmacBase64Secret;

    @Value("${security.jwt.rsa-public:}")
    private String rsaPublicPem;

    /**
     * Basic sanity check to ensure the correct configuration
     * properties are provided for the selected JWT mode.
     */
    @PostConstruct
    void sanity() {
        if ("hmac".equalsIgnoreCase(mode)) {
            if (hmacBase64Secret == null || hmacBase64Secret.isBlank()) {
                throw new IllegalStateException("HMAC mode selected but property 'security.jwt.hmac-base64-secret' is empty");
            }
        } else if ("rsa".equalsIgnoreCase(mode)) {
            if (rsaPublicPem == null || rsaPublicPem.isBlank()) {
                throw new IllegalStateException("RSA mode selected but property 'security.jwt.rsa-public' is empty");
            }
        } else {
            throw new IllegalStateException("Unsupported value for security.jwt.mode: " + mode + " (use 'hmac' or 'rsa')");
        }
    }

    /**
     * Creates a ReactiveJwtDecoder bean based on the configured mode.
     *
     * @return a NimbusReactiveJwtDecoder for HS256 (HMAC) or RS256 (RSA)
     */
    @Bean
    public ReactiveJwtDecoder jwtDecoder() {
        if ("hmac".equalsIgnoreCase(mode)) {
            // Decode Base64 string to bytes and create a SecretKey for HMAC verification
            byte[] secretBytes = Base64.getDecoder().decode(hmacBase64Secret);
            SecretKey key = new SecretKeySpec(secretBytes, "HmacSHA256");
            return NimbusReactiveJwtDecoder.withSecretKey(key).build();
        } else {
            // Parse RSA public key from PEM format for RS256 verification
            RSAPublicKey publicKey = KeyUtils.parseRsaPublicKey(rsaPublicPem);
            return NimbusReactiveJwtDecoder.withPublicKey(publicKey).build();
        }
    }
}
