package com.td.simple.service;


import com.td.simple.model.account.CurrentUser;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.employee.EmployeeViewDto;
import com.td.simple.model_info.employee.EmployeeAddInfo;
import com.td.simple.model_info.employee.EmployeePageableInfo;
import com.td.simple.model_info.employee.EmployeeUpdateInfo;
import com.td.simple.model_info.employee.UpdatePasswordInfo;

import java.util.List;

public interface EmployeeService {

    ApiResult<EmployeeViewDto> create(EmployeeAddInfo model, CurrentUser currentUser);

    ApiResult<EmployeeViewDto> update(EmployeeUpdateInfo model, CurrentUser currentUser);

    ApiResult<EmployeeViewDto> delete(String username, CurrentUser currentUser);

    List<EmployeeViewDto> search(EmployeePageableInfo model, CurrentUser currentUser);

    ApiResult<Long> count(EmployeePageableInfo model, CurrentUser currentUser);

    ApiResult<EmployeeViewDto> findByUsername(String username);

    List<EmployeeViewDto> findByUsernameIn(List<String> usernames);

    List<EmployeeViewDto> suggestion(String keyword, String keywordType, int top);

//    List<EmployeeSuggestionDto> suggestionShort(String keyword, String keywordType, int top);

    /**
     * Nhân viên thay đổi mật khẩu của mình
     */
    ApiResult<Boolean> updatePassword(UpdatePasswordInfo info, CurrentUser currentUser);
}
