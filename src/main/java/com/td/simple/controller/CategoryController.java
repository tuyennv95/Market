package com.td.simple.controller;

import com.td.simple.auth.service.CurrentUserService;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.category.CategoryViewDto;
import com.td.simple.model_info.category.CategoryAddInfo;
import com.td.simple.model_info.category.CategoryPageableInfo;
import com.td.simple.model_info.category.CategoryUpdateInfo;
import com.td.simple.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/category")
public class CategoryController {

    private final CategoryService service;
    private final CurrentUserService currentUserService;

    public CategoryController(
            CategoryService service, CurrentUserService currentUserService) {
        this.service = service;
        this.currentUserService = currentUserService;
    }

    @PostMapping("/private/pageable")
    public List<CategoryViewDto> pageable(@RequestBody CategoryPageableInfo info) {
        return service.search(info);
    }

    @PostMapping("/private/count")
    public ApiResult<Long> count(@RequestBody CategoryPageableInfo info) {
        return service.count(info);
    }

    @GetMapping("/private/{code}")
    public ResponseEntity<ApiResult<CategoryViewDto>> findByCode(@PathVariable() String code) {
        ApiResult<CategoryViewDto> apiResult = service.findByCode(code);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PostMapping("/private/codes")
    public List<CategoryViewDto> findByCodes(@RequestBody List<String> codes) {
        return service.findByCodes(codes);
    }

    @PostMapping("/private")
    public ResponseEntity<ApiResult<CategoryViewDto>> create(@RequestBody CategoryAddInfo info) {
        ApiResult<CategoryViewDto> apiResult = service.create(info);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PutMapping("/private")
    public ResponseEntity<ApiResult<CategoryViewDto>> update(@RequestBody CategoryUpdateInfo info) {
        ApiResult<CategoryViewDto> apiResult = service.update(info);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @DeleteMapping("/private/{code}")
    public ResponseEntity<ApiResult<CategoryViewDto>> delete(@PathVariable() String code) {
        ApiResult<CategoryViewDto> apiResult = service.delete(code);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    /**
     * === Public
     */

    @GetMapping("/public")
    public List<CategoryViewDto> getList() {
        return service.getList();
    }
}


