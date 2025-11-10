package com.fincore.gateway.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScreenDetailsDto {
    private String screenId;
    private String screenTitle;
    private String componentPath;
}
