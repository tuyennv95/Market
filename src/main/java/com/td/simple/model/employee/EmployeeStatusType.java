package com.td.simple.model.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum EmployeeStatusType {
    ENABLED("ENABLED", "Đang hoạt động"),
    OFF_A_TIME("OFF_A_TIME", "Tạm nghỉ 1 thời gian"),
    NOT_ACTIVE("NOT_ACTIVE", "Chưa kích hoạt"),
    DIS_ENABLED("DIS_ENABLED", "Đã nghỉ việc");

    private final String value;
    private final String reasonPhrase;
}
