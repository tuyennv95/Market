package com.td.simple.controller;

import com.td.simple.auth.service.CurrentUserService;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.order.OrderViewDto;
import com.td.simple.model_info.order.OrderAddInfo;
import com.td.simple.model_info.order.OrderPageableInfo;
import com.td.simple.model_info.order.OrderUpdateInfo;
import com.td.simple.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/order")
public class OrderController {

    private final OrderService service;
    private final CurrentUserService currentUserService;

    public OrderController(
            OrderService service, CurrentUserService currentUserService) {
        this.service = service;
        this.currentUserService = currentUserService;
    }

    @PostMapping("/pageable")
    public List<OrderViewDto> pageable(@RequestBody OrderPageableInfo info) {
        return service.search(info, currentUserService.getCurrentUser());
    }

    @PostMapping("/count")
    public ApiResult<Long> count(@RequestBody OrderPageableInfo info) {
        return service.count(info, currentUserService.getCurrentUser());
    }

    @GetMapping("/{code}")
    public ResponseEntity<ApiResult<OrderViewDto>> findByCode(@PathVariable() String code) {
        ApiResult<OrderViewDto> apiResult = service.findByCode(code);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PostMapping("/codes")
    public List<OrderViewDto> findByCodes(@RequestBody List<String> codes) {
        return service.findByCodes(codes);
    }

    @PutMapping()
    public ResponseEntity<ApiResult<OrderViewDto>> update(@RequestBody OrderUpdateInfo info) {
        ApiResult<OrderViewDto> apiResult = service.update(info, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<ApiResult<OrderViewDto>> delete(@PathVariable() String code) {
        ApiResult<OrderViewDto> apiResult = service.delete(code);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    /**
     * === Customer
     */

    @PostMapping("/customer")
    public ResponseEntity<ApiResult<OrderViewDto>> create(@RequestBody OrderAddInfo info) {
        ApiResult<OrderViewDto> apiResult = service.create(info, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @GetMapping("/customer/get-address-history")
    public ApiResult<List<String>> getAddressHistory() {
        return new ApiResult<>(service.getAddressPurchaseHistory(currentUserService.getCurrentUser()));
    }
}


