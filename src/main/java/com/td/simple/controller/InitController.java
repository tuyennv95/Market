package com.td.simple.controller;

import com.td.simple.model_dto.ApiResult;
import com.td.simple.service.InitService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/init-data")
public class InitController {

    private final InitService service;

    public InitController(InitService service) {
        this.service = service;
    }

    @GetMapping("/test")
    public String test() {
        return "Test";
    }

    @GetMapping()
    public ResponseEntity<ApiResult<Boolean>> init() {
        ApiResult<Boolean> apiResult = service.initData();

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }
}


