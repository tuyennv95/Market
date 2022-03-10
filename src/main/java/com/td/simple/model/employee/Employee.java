package com.td.simple.model.employee;

import com.td.simple.model.account.Account;
import com.td.simple.common.DepartmentRoleType;
import com.td.simple.utils.StringUtils;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "cms_employees")
public class Employee extends Account {

    // Tài khoản quản trị của hệ thống.
    private boolean system;

    // Trạng thái nhân viên
    private EmployeeStatusType status;

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

    public void makeTextSearch() {
        String textSearch = this.getUsername() +
                " " +
                this.getFullName() +
                " " +
                this.getPhone() +
                " " +
                this.getEmail();

        textSearch = textSearch.toLowerCase();
        textSearch = StringUtils.unAccent(textSearch);

        this.setTextSearch(textSearch);
    }
}
