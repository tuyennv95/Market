package com.td.simple.repository.impl;

import com.td.simple.model.catalog.CatalogGroup;
import com.td.simple.model_info.catalog.CatalogGroupPageableInfo;
import com.td.simple.repository.CatalogGroupRepositoryCustom;
import com.td.simple.utils.QueryUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public class CatalogGroupRepositoryImpl implements CatalogGroupRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    public CatalogGroupRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<CatalogGroup> search(CatalogGroupPageableInfo info) {
        return mongoTemplate.find(buildSearchQuery(info, false), CatalogGroup.class);
    }

    @Override
    public Long count(CatalogGroupPageableInfo info) {
        return mongoTemplate.count(buildSearchQuery(info, true), CatalogGroup.class);
    }

    private Query buildSearchQuery(CatalogGroupPageableInfo model, boolean countable) {
        Query query = new Query();

        // Có từ khóa tìm kiếm
        QueryUtils.getQuerySearchText(query, model);

        if (!countable) {
            QueryUtils.getQuerySortAndPageable(query, model);
        }

        return query;
    }
}
