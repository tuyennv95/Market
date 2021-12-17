package com.td.simple.service;


import com.td.simple.model.account.CurrentUser;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.customer.CustomerViewDto;
import com.td.simple.model_info.customer.CustomerAddInfo;
import com.td.simple.model_info.customer.CustomerPageableInfo;
import com.td.simple.model_info.customer.CustomerUpdateInfo;
import com.td.simple.model_info.employee.UpdatePasswordInfo;

import java.util.List;

public interface CustomerService {

    ApiResult<CustomerViewDto> create(CustomerAddInfo model, CurrentUser currentUser);

    ApiResult<CustomerViewDto> update(CustomerUpdateInfo model, CurrentUser currentUser);

    ApiResult<CustomerViewDto> delete(String username, CurrentUser currentUser);

    List<CustomerViewDto> search(CustomerPageableInfo model, CurrentUser currentUser);

    ApiResult<Long> count(CustomerPageableInfo model, CurrentUser currentUser);

    ApiResult<CustomerViewDto> findByUsername(String username);

    List<CustomerViewDto> findByUsernameIn(List<String> usernames);

    List<CustomerViewDto> suggestion(String keyword, String keywordType, int top);

//    List<CustomerSuggestionDto> suggestionShort(String keyword, String keywordType, int top);

    /**
     * Nhân viên thay đổi mật khẩu của mình
     */
    ApiResult<Boolean> updatePassword(UpdatePasswordInfo info, CurrentUser currentUser);
}
