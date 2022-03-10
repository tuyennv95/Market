package com.td.simple.repository;

import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.employee.Employee;
import com.td.simple.model_info.employee.EmployeePageableInfo;

import java.util.List;

public interface EmployeeRepositoryCustom {

    List<Employee> search(EmployeePageableInfo info, CurrentUser currentUser);

    Long count(EmployeePageableInfo info, CurrentUser currentUser);

    void updatePassword(CurrentUser currentUser, String newPassword);
}
