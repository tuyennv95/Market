package com.td.simple.service;


import com.td.simple.model.account.CurrentUser;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.customer.CustomerSuggestionViewDto;
import com.td.simple.model_dto.customer.CustomerViewDto;
import com.td.simple.model_info.customer.CustomerAddInfo;
import com.td.simple.model_info.customer.CustomerPageableInfo;
import com.td.simple.model_info.customer.CustomerRegistrationInfo;
import com.td.simple.model_info.customer.CustomerUpdateInfo;
import com.td.simple.model_info.employee.UpdatePasswordInfo;

import java.util.List;

public interface CustomerService {

    ApiResult<CustomerViewDto> create(CustomerAddInfo model, boolean createdByCustomer);

    ApiResult<CustomerViewDto> update(CustomerUpdateInfo model, CurrentUser currentUser);

    ApiResult<CustomerViewDto> delete(String username);

    List<CustomerViewDto> search(CustomerPageableInfo model);

    ApiResult<Long> count(CustomerPageableInfo model);

    ApiResult<CustomerViewDto> findByUsername(String username);

    List<CustomerViewDto> findByUsernameIn(List<String> usernames);

    List<CustomerSuggestionViewDto> suggestion(String keyword, String keywordType, int top);

    ApiResult<CustomerViewDto> registration(CustomerRegistrationInfo model);

    ApiResult<Boolean> updatePassword(UpdatePasswordInfo info, CurrentUser currentUser);

    ApiResult<Boolean> favorite(String productCode, CurrentUser currentUser);
}
