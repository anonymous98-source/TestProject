package com.fincore.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePasswordDTO {

    private String userId;
    private String message;
    private String password;
    private boolean updateFlag;
    private String otp;
}
