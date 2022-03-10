package com.td.simple.model.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CurrentUser implements Serializable {

    private String phone;

    private String email;

    private String username;

    private String name;

    private boolean isCustomer;

    private String accessToken;

    private String culture;

    private String timeZone;

    // Mã tenent của tài khoản.
    private String system;

    private String departmentCode;

    private String idPath;

    private Boolean isManager;

    private String image;

    private List<String> roles;

    private String departmentRole;

    private List<String> departmentModes;

    private List<String> ancestorsDepartmentCode;

    private List<String> productFavorite;
}
