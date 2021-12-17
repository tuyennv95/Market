package com.td.simple.repository.impl;

import com.td.simple.model.product.Product;
import com.td.simple.model_info.product.ProductPageableInfo;
import com.td.simple.repository.ProductRepositoryCustom;
import com.td.simple.utils.QueryUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public class ProductRepositoryImpl implements ProductRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    public ProductRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Product> search(ProductPageableInfo info) {
        return mongoTemplate.find(buildSearchQuery(info, false), Product.class);
    }

    @Override
    public Long count(ProductPageableInfo info) {
        return mongoTemplate.count(buildSearchQuery(info, true), Product.class);
    }

    private Query buildSearchQuery(ProductPageableInfo model, boolean countable) {
        Query query = new Query();

        // Có từ khóa tìm kiếm
        QueryUtils.getQuerySearchText(query, model);

        if (!countable) {
            QueryUtils.getQuerySortAndPageable(query, model);
        }

        return query;
    }
}
