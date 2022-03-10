package com.td.simple.service;

import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.category.CategoryViewDto;
import com.td.simple.model_info.category.CategoryAddInfo;
import com.td.simple.model_info.category.CategoryPageableInfo;
import com.td.simple.model_info.category.CategoryUpdateInfo;

import java.util.List;

public interface CategoryService {

    ApiResult<CategoryViewDto> create(CategoryAddInfo info);

    ApiResult<CategoryViewDto> update(CategoryUpdateInfo info);

    ApiResult<CategoryViewDto> delete(String code);

    List<CategoryViewDto> search(CategoryPageableInfo model);

    ApiResult<Long> count(CategoryPageableInfo model);

    ApiResult<CategoryViewDto> findByCode(String code);

    List<CategoryViewDto> findByCodes(List<String> codes);

    /**
     * === Public
     */

    List<CategoryViewDto> getList();
}
