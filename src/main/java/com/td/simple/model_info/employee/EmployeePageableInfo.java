package com.td.simple.model_info.employee;

import com.td.simple.model.employee.EmployeeStatusType;
import com.td.simple.model_info.BasePageableInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
public class EmployeePageableInfo extends BasePageableInfo implements Serializable {

    // Trạng thái nhân viên
    private EmployeeStatusType status;

    private Set<String> roles;

    public EmployeePageableInfo(int currentPage, int recordPerPage) {
        this.setCurrentPage(currentPage);
        this.setRecordPerPage(recordPerPage);
    }
}
