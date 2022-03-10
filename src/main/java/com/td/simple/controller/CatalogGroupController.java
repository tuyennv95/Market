package com.td.simple.controller;

import com.td.simple.auth.service.CurrentUserService;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.catalog.CatalogGroupViewDto;
import com.td.simple.model_info.catalog.CatalogGroupAddInfo;
import com.td.simple.model_info.catalog.CatalogGroupPageableInfo;
import com.td.simple.model_info.catalog.CatalogGroupUpdateInfo;
import com.td.simple.service.CatalogGroupService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/catalog-group")
public class CatalogGroupController {

    private final CatalogGroupService service;
    private final CurrentUserService currentUserService;

    public CatalogGroupController(
            CatalogGroupService service, CurrentUserService currentUserService) {
        this.service = service;
        this.currentUserService = currentUserService;
    }

    @PostMapping("/pageable")
    public List<CatalogGroupViewDto> pageable(@RequestBody CatalogGroupPageableInfo info) {
        return service.search(info);
    }

    @PostMapping("/count")
    public ApiResult<Long> count(@RequestBody CatalogGroupPageableInfo info) {
        return service.count(info);
    }

    @GetMapping("/{code}")
    public ResponseEntity<ApiResult<CatalogGroupViewDto>> findByCode(@PathVariable() String code) {
        ApiResult<CatalogGroupViewDto> apiResult = service.findByCode(code);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PostMapping("/codes")
    public List<CatalogGroupViewDto> findByCodes(@RequestBody List<String> codes) {
        return service.findByCodeIn(codes);
    }

    @PostMapping()
    public ResponseEntity<ApiResult<CatalogGroupViewDto>> create(@RequestBody CatalogGroupAddInfo info) {
        ApiResult<CatalogGroupViewDto> apiResult = service.create(info, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<ApiResult<CatalogGroupViewDto>> update(@RequestBody CatalogGroupUpdateInfo info) {
        ApiResult<CatalogGroupViewDto> apiResult = service.update(info, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @DeleteMapping("/{code}")
    public ResponseEntity<ApiResult<CatalogGroupViewDto>> delete(@PathVariable() String code) {
        ApiResult<CatalogGroupViewDto> apiResult = service.delete(code, currentUserService.getCurrentUser());

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }
}


