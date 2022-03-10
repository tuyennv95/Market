package com.td.simple.service;

import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.product.ProductSuggestionViewDto;
import com.td.simple.model_dto.product.ProductViewDto;
import com.td.simple.model_info.product.ProductAddInfo;
import com.td.simple.model_info.product.ProductUpdateInfo;
import com.td.simple.model_info.product.ProductPageableInfo;

import java.util.List;

public interface ProductService {

    ApiResult<ProductViewDto> create(ProductAddInfo info);

    ApiResult<ProductViewDto> update(ProductUpdateInfo info);

    ApiResult<ProductViewDto> delete(String code);

    List<ProductViewDto> search(ProductPageableInfo model);

    ApiResult<Long> count(ProductPageableInfo model);

    ApiResult<ProductViewDto> findByCode(String code);

    List<ProductViewDto> findByCodes(List<String> codes);

    List<ProductSuggestionViewDto> suggestion(String keyword, String keywordType, int top);

    List<ProductViewDto> topBuy(int page, int top);

    void makeTextSearch();
}
