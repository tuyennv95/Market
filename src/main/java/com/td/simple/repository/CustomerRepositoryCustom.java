package com.td.simple.repository;

import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.customer.Customer;
import com.td.simple.model_info.customer.CustomerPageableInfo;

import java.math.BigDecimal;
import java.util.List;

public interface CustomerRepositoryCustom {

    List<Customer> search(CustomerPageableInfo info);

    Long count(CustomerPageableInfo info);

    List<Customer> suggestion(String keyword, String keywordType, int top);

    void updatePassword(CurrentUser currentUser, String newPassword);

    void favorite(Customer customer);

    void updateMoneySpent(String username, BigDecimal value);
}
