package com.td.simple.repository.impl;


import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.customer.Customer;
import com.td.simple.model_info.customer.CustomerPageableInfo;
import com.td.simple.repository.CustomerRepositoryCustom;
import com.td.simple.utils.QueryUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.Update;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class CustomerRepositoryCustomImpl implements CustomerRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    public CustomerRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Customer> search(CustomerPageableInfo info) {
        return mongoTemplate.find(buildSearchQuery(info, false), Customer.class);
    }

    @Override
    public Long count(CustomerPageableInfo info) {
        return mongoTemplate.count(buildSearchQuery(info, true), Customer.class);
    }

    @Override
    public List<Customer> suggestion(String keyword, String keywordType, int top) {
        Query query = new Query();

        if (!"".equals(keyword) && keyword != null) {
            query.addCriteria(TextCriteria.forDefaultLanguage().matchingAny(keyword));
        }

        query.limit(top).fields().include("avatar").include("code").include("username").include("fullName")
                .include("phone").include("email").include("node");

        return mongoTemplate.find(query, Customer.class);
    }

    @Override
    public void updatePassword(CurrentUser currentUser, String newPassword) {
        Query query = new Query(Criteria.where("username").is(currentUser.getUsername()));

        Update update = new Update();

        update.set("password", newPassword);
        update.set("lastModifiedDate", LocalDateTime.now());
        update.set("lastModifiedBy", currentUser.getUsername());

        mongoTemplate.updateFirst(query, update, Customer.class);
    }

    @Override
    public void favorite(Customer customer) {
        Query query = new Query(Criteria.where("username").is(customer.getUsername()));

        Update update = new Update();

        update.set("productFavorite", customer.getProductFavorite());

        mongoTemplate.updateFirst(query, update, Customer.class);
    }

    @Override
    public void updateMoneySpent(String username, BigDecimal value) {
        Update update = new Update();

        update.inc("moneySpent", value.doubleValue());

        mongoTemplate.findAndModify(Query.query(Criteria.where("username").is(username)), update, Customer.class);
    }

    private Query buildSearchQuery(CustomerPageableInfo model, boolean countable) {
        Query query = new Query();

        // Có từ khóa tìm kiếm
        QueryUtils.getQuerySearchText(query, model);

        query.addCriteria(Criteria.where("enabled").is(true));

        if (!countable) {
            QueryUtils.getQuerySortAndPageable(query, model);
        }

        return query;
    }
}
