package com.td.simple.repository.impl;

import com.td.simple.model.category.Category;
import com.td.simple.model_info.category.CategoryPageableInfo;
import com.td.simple.repository.CategoryRepositoryCustom;
import com.td.simple.utils.QueryUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;

public class CategoryRepositoryImpl implements CategoryRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    public CategoryRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Category> search(CategoryPageableInfo info) {
        return mongoTemplate.find(buildSearchQuery(info, false), Category.class);
    }

    @Override
    public Long count(CategoryPageableInfo info) {
        return mongoTemplate.count(buildSearchQuery(info, true), Category.class);
    }

    @Override
    public void updateChild(String categoryCode, int inc) {
        Update update = new Update();

        update.inc("childrenNo", inc);

        mongoTemplate.findAndModify(Query.query(Criteria.where("code").is(categoryCode)), update, Category.class);
    }

    private Query buildSearchQuery(CategoryPageableInfo model, boolean countable) {
        Query query = new Query();

        // Có từ khóa tìm kiếm
        QueryUtils.getQuerySearchText(query, model);

        if (!countable) {
            QueryUtils.getQuerySortAndPageable(query, model);
        }

        return query;
    }
}
