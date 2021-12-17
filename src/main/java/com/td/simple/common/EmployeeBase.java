package com.td.simple.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeBase implements Serializable {

    // Tên tài hoản.
    private String username;

    private String avatar;

    // Họ và tên.
    private String fullName;

    // Mã phòng ban
    private String departmentCode;

    // Danh sách mã các phòng ban cha bên trên.
    @Builder.Default
    private Set<String> ancestorsDepartmentCode = new HashSet<>();

    // Mã chức vụ
    private String titleCode;

    // Vai trò của nhân viên trong đơn vị. (MANAGER: Quản lý, STAFF: Nhân viên)
    private DepartmentRoleType departmentRole;
}
