package com.td.simple.model_dto.employee;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.td.simple.common.DepartmentRoleType;
import com.td.simple.model.employee.EmployeeStatusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeViewDto implements Serializable {

    private String avatar;

    private String username;

    // Trạng thái nhân viên
    private EmployeeStatusType status;

    private String fullName;
    // Họ
    private String firstName;
    // Tên
    private String lastName;
    // Họ đệm
    private String middleName;

    private String phone;

    private String email;

    // Mã chức vụ.
    private String titleCode;

    // Mã phòng ban
    private String departmentCode;

    // Danh sách mã các phòng ban cha bên trên.
    @Builder.Default
    private Set<String> ancestorsDepartmentCode = new HashSet<>();

    // Các loại của phòng ban này (WAREHOUSE, SALE, PURCHASE, ACCOUNTANT, SUPPORT, COMPANY)
    @Builder.Default
    private Set<String> departmentModes = new HashSet<>();

    // Là trưởng phòng, nhìn được thông tin của nhân viên trong phòng
    private DepartmentRoleType departmentRole;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime createdDate;

    private String createdBy;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime lastModifiedDate;

    private String lastModifiedBy;
}
