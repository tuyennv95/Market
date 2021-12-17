package com.td.simple.model_dto.employee;

import com.td.simple.common.DepartmentRoleType;
import lombok.Data;

import java.io.Serializable;

@Data
public class EmployeeSuggestionDto implements Serializable {

    private String username;

    private String code;

    private String fullName;

    private String email;

    private String phone;

    private DepartmentRoleType departmentRole;

    private String avatar;

//    private TitleViewDto title;

//    private DepartmentViewDto department;
}
