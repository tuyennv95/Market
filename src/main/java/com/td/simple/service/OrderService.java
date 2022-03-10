package com.td.simple.service;

import com.td.simple.model.account.CurrentUser;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.order.OrderViewDto;
import com.td.simple.model_info.order.OrderAddInfo;
import com.td.simple.model_info.order.OrderPageableInfo;
import com.td.simple.model_info.order.OrderUpdateInfo;

import java.util.List;

public interface OrderService {

    ApiResult<OrderViewDto> create(OrderAddInfo info, CurrentUser currentUser);

    ApiResult<OrderViewDto> update(OrderUpdateInfo info, CurrentUser currentUser);

    ApiResult<OrderViewDto> delete(String code);

    List<OrderViewDto> search(OrderPageableInfo model, CurrentUser currentUser);

    ApiResult<Long> count(OrderPageableInfo model, CurrentUser currentUser);

    ApiResult<OrderViewDto> findByCode(String code);

    List<OrderViewDto> findByCodes(List<String> codes);

    List<String> getAddressPurchaseHistory(CurrentUser currentUser);
}
