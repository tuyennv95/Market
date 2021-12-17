package com.td.simple.service.impl;

import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.product.ProductViewDto;
import com.td.simple.model_info.product.ProductAddInfo;
import com.td.simple.model_info.product.ProductEditInfo;
import com.td.simple.model_info.product.ProductPageableInfo;
import com.td.simple.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Override
    public ApiResult<ProductViewDto> create(ProductAddInfo info) {
        return null;
    }

    @Override
    public ApiResult<ProductViewDto> update(ProductEditInfo info) {
        return null;
    }

    @Override
    public List<ProductViewDto> search(ProductPageableInfo model) {
        return null;
    }

    @Override
    public ApiResult<Long> count(ProductPageableInfo model) {
        return null;
    }

    @Override
    public ApiResult<ProductViewDto> findByCode(String code) {
        return null;
    }
}
