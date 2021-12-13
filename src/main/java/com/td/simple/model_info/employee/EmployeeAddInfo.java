package com.td.simple.model_info.employee;

import com.td.simple.common.DepartmentRoleType;
import lombok.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeAddInfo implements Serializable {

    // Sử dụng username do hệ thống sinh ra
    // Null => nhập mới, != null => sinh tự động
    @NonNull
    private String usernameRoot;

    @NonNull
    private String username;
    private String password;
    private String avatar;
    private String fullName;
    private String email;
    @NonNull
    private String phone;

    // Mã chức vụ.
    private String titleCode;
    // Mã phòng ban
    private String departmentCode;
    // Là trưởng phòng, nhìn được thông tin của nhân viên trong phòng
    private DepartmentRoleType departmentRole;
    // Quyền truy cập hệ thống
    @Builder.Default
    private Set<String> roles = new HashSet<>();

    private boolean enabled;
}
