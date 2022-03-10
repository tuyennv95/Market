package com.td.simple.service;

import com.td.simple.model.account.CurrentUser;
import com.td.simple.model_dto.ApiResult;
import com.td.simple.model_dto.catalog.CatalogGroupViewDto;
import com.td.simple.model_info.catalog.CatalogGroupAddInfo;
import com.td.simple.model_info.catalog.CatalogGroupPageableInfo;
import com.td.simple.model_info.catalog.CatalogGroupUpdateInfo;

import java.util.List;

public interface CatalogGroupService {

    List<CatalogGroupViewDto> search(CatalogGroupPageableInfo model);

    ApiResult<Long> count(CatalogGroupPageableInfo model);

    ApiResult<CatalogGroupViewDto> create(CatalogGroupAddInfo model, CurrentUser currentUser);

    ApiResult<CatalogGroupViewDto> update(CatalogGroupUpdateInfo model, CurrentUser currentUser);

    ApiResult<CatalogGroupViewDto> delete(String code, CurrentUser currentUser);

    ApiResult<CatalogGroupViewDto> findByCode(String code);

    List<CatalogGroupViewDto> findByCodeIn(List<String> codes);
}
