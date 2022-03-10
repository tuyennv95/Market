package com.td.simple.controller;

import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.product.ProductSuggestionViewDto;
import com.td.simple.model_dto.product.ProductViewDto;
import com.td.simple.model_info.product.ProductAddInfo;
import com.td.simple.model_info.product.ProductPageableInfo;
import com.td.simple.model_info.product.ProductUpdateInfo;
import com.td.simple.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/product")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping("/private")
    public ResponseEntity<ApiResult<ProductViewDto>> create(@RequestBody ProductAddInfo info) {
        ApiResult<ProductViewDto> apiResult = service.create(info);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PutMapping("/private")
    public ResponseEntity<ApiResult<ProductViewDto>> update(@RequestBody ProductUpdateInfo info) {
        ApiResult<ProductViewDto> apiResult = service.update(info);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @DeleteMapping("/private/{code}")
    public ResponseEntity<ApiResult<ProductViewDto>> delete(@PathVariable() String code) {
        ApiResult<ProductViewDto> apiResult = service.delete(code);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    /**
     * === Public
     */

    @PostMapping("/public/pageable")
    public List<ProductViewDto> pageable(@RequestBody ProductPageableInfo info) {
        return service.search(info);
    }

    @PostMapping("/public/count")
    public ApiResult<Long> count(@RequestBody ProductPageableInfo info) {
        return service.count(info);
    }

    @GetMapping("/public/{code}")
    public ResponseEntity<ApiResult<ProductViewDto>> findByCode(@PathVariable() String code) {
        ApiResult<ProductViewDto> apiResult = service.findByCode(code);

        return new ResponseEntity<>(apiResult, apiResult.isError() ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @PostMapping("/public/codes")
    public List<ProductViewDto> findByCodes(@Valid @RequestBody List<String> codes) {
        return service.findByCodes(codes);
    }

    @GetMapping("/public/suggestion")
    public List<ProductSuggestionViewDto> suggestion(
            @RequestParam String keyword,
            @RequestParam(required = false, defaultValue = "") String type,
            @RequestParam(required = false, defaultValue = "10") int top
    ) {
        return service.suggestion(keyword.toLowerCase(), type, top);
    }

    @GetMapping("/public/top-buy")
    public List<ProductViewDto> topBuy(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int top
    ) {
        return service.topBuy(page, top);
    }

//    @GetMapping("/public/make-text-search")
//    public ApiResult<Boolean> makeTextSearch() {
//        service.makeTextSearch();
//
//        return new ApiResult<>(true);
//    }


    /**
     * === Customer
     */
}
