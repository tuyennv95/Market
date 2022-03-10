package com.td.simple.model_info.customer;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class CustomerRegistrationInfo implements Serializable {

    @NotNull
    private String phone;

    @NotNull
    private String fullName;

    @NotNull
    private String password;

    @NotNull
    private String verifyPassword;
}
