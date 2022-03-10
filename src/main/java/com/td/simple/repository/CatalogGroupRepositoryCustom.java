package com.td.simple.repository;

import com.td.simple.model.catalog.CatalogGroup;
import com.td.simple.model_info.catalog.CatalogGroupPageableInfo;

import java.util.List;

public interface CatalogGroupRepositoryCustom {

    List<CatalogGroup> search(CatalogGroupPageableInfo info);

    Long count(CatalogGroupPageableInfo info);
}
