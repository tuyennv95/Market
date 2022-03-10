package com.td.simple.repository;

import com.td.simple.model.catalog.Catalog;
import com.td.simple.model_info.catalog.CatalogPageableInfo;

import java.util.List;

public interface CatalogRepositoryCustom {

    List<Catalog> search(CatalogPageableInfo info);

    Long count(CatalogPageableInfo info);

    void updateUseDefaultFalse(String catalogGroup);
}
