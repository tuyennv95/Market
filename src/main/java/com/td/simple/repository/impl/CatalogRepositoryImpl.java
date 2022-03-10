package com.td.simple.repository.impl;

import com.td.simple.model.catalog.Catalog;
import com.td.simple.model_info.catalog.CatalogPageableInfo;
import com.td.simple.repository.CatalogRepositoryCustom;
import com.td.simple.utils.QueryUtils;
import com.td.simple.utils.StringUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;

public class CatalogRepositoryImpl implements CatalogRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    public CatalogRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Catalog> search(CatalogPageableInfo info) {
        return mongoTemplate.find(buildSearchQuery(info, false), Catalog.class);
    }

    @Override
    public Long count(CatalogPageableInfo info) {
        return mongoTemplate.count(buildSearchQuery(info, true), Catalog.class);
    }

    @Override
    public void updateUseDefaultFalse(String catalogGroup) {
        Update update = new Update();

        update.set("useDefault", false);

        mongoTemplate.updateMulti(Query.query(Criteria.where("groupCode").is(catalogGroup)), update, Catalog.class);
    }

    private Query buildSearchQuery(CatalogPageableInfo model, boolean countable) {
        Query query = new Query();

        // Có từ khóa tìm kiếm
        QueryUtils.getQuerySearchText(query, model);

        if (!StringUtils.isNullOrEmpty(model.getGroupCode())) {
            query.addCriteria(Criteria.where("groupCode").is(model.getGroupCode()));
        }

        if (!countable) {
            QueryUtils.getQuerySortAndPageable(query, model);
        }

        return query;
    }
}
