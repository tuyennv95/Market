package com.td.simple.repository;

import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.customer.Customer;
import com.td.simple.model_info.customer.CustomerPageableInfo;

import java.util.List;

public interface CustomerRepositoryCustom {

    List<Customer> search(CustomerPageableInfo info, CurrentUser currentUser);

    Long count(CustomerPageableInfo info, CurrentUser currentUser);
}
