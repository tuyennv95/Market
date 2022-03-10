package com.td.simple.controller;

import com.td.simple.auth.service.CurrentUserService;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.customer.CustomerSuggestionViewDto;
import com.td.simple.model_dto.customer.CustomerViewDto;
import com.td.simple.model_info.customer.CustomerAddInfo;
import com.td.simple.model_info.customer.CustomerPageableInfo;
import com.td.simple.model_info.customer.CustomerRegistrationInfo;
import com.td.simple.model_info.customer.CustomerUpdateInfo;
import com.td.simple.model_info.employee.UpdatePasswordInfo;
import com.td.simple.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/customer")
public class CustomerController {

    private final CustomerService service;
    private final CurrentUserService currentUserService;

    public CustomerController(CustomerService service, CurrentUserService currentUserService) {
        this.service = service;
        this.currentUserService = currentUserService;
    }

    @PostMapping("/private/pageable")
    public List<CustomerViewDto> pageable(@RequestBody CustomerPageableInfo info) {
        return service.search(info);
    }

    @PostMapping("/private/count")
    public ApiResult<Long> count(@RequestBody CustomerPageableInfo info) {
        return service.count(info);
    }

    @GetMapping("/private/{username}")
    public ResponseEntity<ApiResult<CustomerViewDto>> findByUsername(@PathVariable() String username) {
        ApiResult<CustomerViewDto> apiResult = service.findByUsername(username);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PostMapping("/private/usernames")
    public List<CustomerViewDto> findByUsernames(@RequestBody List<String> usernames) {
        return service.findByUsernameIn(usernames);
    }

    @PostMapping("/private")
    public ResponseEntity<ApiResult<CustomerViewDto>> create(@RequestBody CustomerAddInfo info) {
        ApiResult<CustomerViewDto> apiResult = service.create(info, false);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PutMapping("/private")
    public ResponseEntity<ApiResult<CustomerViewDto>> update(@RequestBody CustomerUpdateInfo info) {
        ApiResult<CustomerViewDto> apiResult = service.update(info, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @DeleteMapping("/private/{username}")
    public ResponseEntity<ApiResult<CustomerViewDto>> delete(@PathVariable() String username) {
        ApiResult<CustomerViewDto> apiResult = service.delete(username);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    /**
     * === Public
     */

    @PostMapping("/public/registration")
    public ResponseEntity<ApiResult<CustomerViewDto>> registration(@RequestBody CustomerRegistrationInfo info) {
        ApiResult<CustomerViewDto> apiResult = service.registration(info);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @GetMapping("/public/suggestion")
    public List<CustomerSuggestionViewDto> suggestion(
            @RequestParam String keyword,
            @RequestParam(required = false, defaultValue = "") String type,
            @RequestParam(required = false, defaultValue = "10") int top
    ) {
        return service.suggestion(keyword.toLowerCase(), type, top);
    }

    /**
     * === Customer
     */

    @PostMapping("/customer/update-password")
    public ResponseEntity<ApiResult<Boolean>> updatePassword(@RequestBody UpdatePasswordInfo info) {
        ApiResult<Boolean> apiResult = service.updatePassword(info, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @GetMapping("/customer/favorite/{productCode}")
    public ResponseEntity<ApiResult<Boolean>> favorite(@PathVariable String productCode) {
        ApiResult<Boolean> apiResult = service.favorite(productCode, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }
}
