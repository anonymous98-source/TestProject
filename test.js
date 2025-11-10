package com.fincore.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Simple DTO for transferring screen-related information.
 *
 * Contains basic metadata such as screen ID, title, path,
 * and a short description used in UI rendering or access configs.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScreenDetails {

    /** Unique identifier of the screen. */
    private String screenId;

    /** Display title or label shown for the screen. */
    private String screenTitle;

    /** Path to the component or frontend route. */
    private String componentPath;

    /** Short description about what this screen represents. */
    private String description;
}
