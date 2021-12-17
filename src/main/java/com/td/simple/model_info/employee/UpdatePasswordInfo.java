package com.td.simple.model_info.employee;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class UpdatePasswordInfo implements Serializable {

    private String currentPassword;

    private String newPassword;

    private String verifyPassword;

}
