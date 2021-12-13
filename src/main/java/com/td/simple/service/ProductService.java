package com.td.simple.service;

import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.product.ProductViewDto;
import com.td.simple.model_info.product.ProductAddInfo;
import com.td.simple.model_info.product.ProductEditInfo;
import com.td.simple.model_info.product.ProductPageableInfo;

import java.util.List;

public interface ProductService {
    ApiResult<ProductViewDto> create(ProductAddInfo info);

    ApiResult<ProductViewDto> update(ProductEditInfo info);

    List<ProductViewDto> search(ProductPageableInfo model);

    ApiResult<Long> count(ProductPageableInfo model);

    ApiResult<ProductViewDto> findByCode(String code);
}
