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
public class EmployeeUpdateInfo implements Serializable {

    @NonNull
    private String username;

    private String avatar;
    private String fullName;

    private String email;
    @NonNull
    private String phone;

    // Mã chức vụ.
    private String titleCode;
    // Mã phòng ban
    private String departmentCode;
    // Quyền truy cập hệ thống
    // Là trưởng phòng, nhìn được thông tin của nhân viên trong phòng
    private DepartmentRoleType departmentRole;
    @Builder.Default
    private Set<String> roles = new HashSet<>();

    private boolean enabled;
}
