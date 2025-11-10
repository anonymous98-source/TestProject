package com.fincore.gateway.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

/**
 * DTO representing basic details of a screen or component.
 * 
 * Used mainly for transferring limited screen metadata,
 * typically for menu or UI rendering responses.
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScreenDetailsDto {

    /** Unique identifier of the screen. */
    private String screenId;

    /** Title displayed for the screen in the UI. */
    private String screenTitle;

    /** Path or route of the frontend component. */
    private String componentPath;
}
