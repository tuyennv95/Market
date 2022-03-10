package com.td.simple.repository;

import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.order.Order;
import com.td.simple.model_info.order.OrderPageableInfo;

import java.util.List;

public interface OrderRepositoryCustom {

    List<Order> search(OrderPageableInfo info, CurrentUser currentUser);

    Long count(OrderPageableInfo info, CurrentUser currentUser);
}
