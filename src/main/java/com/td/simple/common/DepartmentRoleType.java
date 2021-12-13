package com.td.simple.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum DepartmentRoleType {
    MANAGER("MANAGER", "Quản lý"),
    STAFF("STAFF", "Nhân viên");

    private final String value;
    private final String reasonPhrase;
}
