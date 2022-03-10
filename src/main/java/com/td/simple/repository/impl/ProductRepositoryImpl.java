package com.td.simple.repository.impl;

import com.td.simple.model.product.Product;
import com.td.simple.model_info.product.ProductPageableInfo;
import com.td.simple.repository.ProductRepositoryCustom;
import com.td.simple.utils.QueryUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;

public class ProductRepositoryImpl implements ProductRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    public ProductRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Product> search(ProductPageableInfo info, List<String> categoryCodes) {
        return mongoTemplate.find(buildSearchQuery(info, categoryCodes, false), Product.class);
    }

    @Override
    public Long count(ProductPageableInfo info, List<String> categoryCodes) {
        return mongoTemplate.count(buildSearchQuery(info, categoryCodes, true), Product.class);
    }

    @Override
    public List<Product> suggestion(String keyword, String keywordType, int top) {
        Query query = new Query();

        if (!"".equals(keyword) && keyword != null) {
            query.addCriteria(TextCriteria.forDefaultLanguage().matchingAny(keyword));
        }

        query.limit(top).fields().include("code").include("name").include("nameDisplay");

        return mongoTemplate.find(query, Product.class);
    }

    @Override
    public List<Product> searchTopBuy(int page, int top) {
        Query query = new Query();

        query.addCriteria(Criteria.where("quantityBuy").gt(0));

        query.with(Sort.by(Sort.Direction.DESC, "quantityBuy"));

        Pageable pageable = PageRequest.of(page - 1, top);
        query.with(pageable);

        return mongoTemplate.find(query, Product.class);
    }

    @Override
    public void updateQuantity(String code, int quantity) {
        Update update = new Update();

        update.inc("quantity", quantity);

        mongoTemplate.findAndModify(Query.query(Criteria.where("code").is(code)), update, Product.class);
    }

    @Override
    public void updateQuantityBuy(String code, int quantity) {
        Update update = new Update();

        update.inc("quantityBuy", quantity);

        mongoTemplate.findAndModify(Query.query(Criteria.where("code").is(code)), update, Product.class);
    }

    private Query buildSearchQuery(ProductPageableInfo model, List<String> categoryCodes, boolean countable) {
        Query query = new Query();

        // Có từ khóa tìm kiếm
        QueryUtils.getQuerySearchText(query, model);

        if (categoryCodes != null) {
            query.addCriteria(Criteria.where("categoryCode").in(categoryCodes));
        }

        if (model.getIsSale() != null) {
            query.addCriteria(Criteria.where("isSale").is(model.getIsSale()));
        }

        if (!countable) {
            QueryUtils.getQuerySortAndPageable(query, model);
        }

        return query;
    }
}
