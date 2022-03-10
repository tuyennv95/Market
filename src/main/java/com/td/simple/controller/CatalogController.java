package com.td.simple.controller;

import com.td.simple.auth.service.CurrentUserService;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.catalog.CatalogViewDto;
import com.td.simple.model_info.catalog.CatalogAddInfo;
import com.td.simple.model_info.catalog.CatalogPageableInfo;
import com.td.simple.model_info.catalog.CatalogUpdateInfo;
import com.td.simple.service.CatalogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/catalog")
public class CatalogController {

    private final CatalogService service;
    private final CurrentUserService currentUserService;

    public CatalogController(
            CatalogService service, CurrentUserService currentUserService) {
        this.service = service;
        this.currentUserService = currentUserService;
    }

    @PostMapping("/pageable")
    public List<CatalogViewDto> pageable(@RequestBody CatalogPageableInfo info) {
        return service.search(info);
    }

    @PostMapping("/count")
    public ApiResult<Long> count(@RequestBody CatalogPageableInfo info) {
        return service.count(info);
    }

    @GetMapping("/{code}")
    public ResponseEntity<ApiResult<CatalogViewDto>> findByCode(@PathVariable() String code) {
        ApiResult<CatalogViewDto> apiResult = service.findByCode(code);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PostMapping("/codes")
    public List<CatalogViewDto> findByCodes(@RequestBody List<String> codes) {
        return service.findByCodeIn(codes);
    }

    @PostMapping()
    public ResponseEntity<ApiResult<CatalogViewDto>> create(@RequestBody CatalogAddInfo info) {
        ApiResult<CatalogViewDto> apiResult = service.create(info, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<ApiResult<CatalogViewDto>> update(@RequestBody CatalogUpdateInfo info) {
        ApiResult<CatalogViewDto> apiResult = service.update(info, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<ApiResult<CatalogViewDto>> delete(@PathVariable() String code) {
        ApiResult<CatalogViewDto> apiResult = service.delete(code, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @GetMapping("/group/{code}")
    public List<CatalogViewDto> findByGroupCode(@PathVariable() String code) {
        return service.findByGroupCode(code);
    }

    @PostMapping("/group/codes")
    public List<CatalogViewDto> findByGroupCodes(@RequestBody List<String> codes) {
        return service.findByGroupCodeIn(codes);
    }
}


