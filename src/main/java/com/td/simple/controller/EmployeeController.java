package com.td.simple.controller;

import com.td.simple.auth.service.CurrentUserService;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.employee.EmployeeViewDto;
import com.td.simple.model_info.employee.EmployeeAddInfo;
import com.td.simple.model_info.employee.EmployeePageableInfo;
import com.td.simple.model_info.employee.EmployeeUpdateInfo;
import com.td.simple.model_info.employee.UpdatePasswordInfo;
import com.td.simple.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/employee")
public class EmployeeController {

    private final EmployeeService service;
    private final CurrentUserService currentUserService;

    public EmployeeController(EmployeeService service, CurrentUserService currentUserService) {
        this.service = service;
        this.currentUserService = currentUserService;
    }

    @PostMapping("/private/pageable")
    public List<EmployeeViewDto> pageable(@RequestBody EmployeePageableInfo info) {
        return service.search(info, currentUserService.getCurrentUser());
    }

    @PostMapping("/private/count")
    public ApiResult<Long> count(@RequestBody EmployeePageableInfo info) {
        return service.count(info, currentUserService.getCurrentUser());
    }

    @GetMapping("/private/{username}")
    public ResponseEntity<ApiResult<EmployeeViewDto>> findByUsername(@PathVariable() String username) {
        ApiResult<EmployeeViewDto> apiResult = service.findByUsername(username);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PostMapping("/private/usernames")
    public List<EmployeeViewDto> findByUsernames(@RequestBody List<String> usernames) {
        return service.findByUsernameIn(usernames);
    }

    @PostMapping("/private")
    public ResponseEntity<ApiResult<EmployeeViewDto>> create(@RequestBody EmployeeAddInfo info) {
        ApiResult<EmployeeViewDto> apiResult = service.create(info, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PutMapping("/private")
    public ResponseEntity<ApiResult<EmployeeViewDto>> update(@RequestBody EmployeeUpdateInfo info) {
        ApiResult<EmployeeViewDto> apiResult = service.update(info, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @DeleteMapping("/private/{username}")
    public ResponseEntity<ApiResult<EmployeeViewDto>> delete(@PathVariable() String username) {
        ApiResult<EmployeeViewDto> apiResult = service.delete(username, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PostMapping("/customer/private/update-password")
    public ResponseEntity<ApiResult<Boolean>> updatePassword(@RequestBody UpdatePasswordInfo info) {
        ApiResult<Boolean> apiResult = service.updatePassword(info, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }
}
