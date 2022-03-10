package com.td.simple.service;


import com.td.simple.model.account.CurrentUser;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.catalog.CatalogViewDto;
import com.td.simple.model_info.catalog.CatalogAddInfo;
import com.td.simple.model_info.catalog.CatalogPageableInfo;
import com.td.simple.model_info.catalog.CatalogUpdateInfo;

import java.util.List;

public interface CatalogService {

    List<CatalogViewDto> search(CatalogPageableInfo model);

    ApiResult<Long> count(CatalogPageableInfo model);

    ApiResult<CatalogViewDto> create(CatalogAddInfo model, CurrentUser currentUser);

    ApiResult<CatalogViewDto> update(CatalogUpdateInfo model, CurrentUser currentUser);

    ApiResult<CatalogViewDto> delete(String code, CurrentUser currentUser);

    ApiResult<CatalogViewDto> findByCode(String code);

    List<CatalogViewDto> findByCodeIn(List<String> codes);

    List<CatalogViewDto> findByGroupCode(String groupCode);

    List<CatalogViewDto> findByGroupCodeIn(List<String> groupCodes);
}
