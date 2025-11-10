package com.fincore.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScreenDetails {
    private String screenId;
    private String screenTitle;
    private String componentPath;
    private String description;
}
