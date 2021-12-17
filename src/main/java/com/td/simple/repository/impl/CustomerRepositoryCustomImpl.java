package com.td.simple.repository.impl;


import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.customer.Customer;
import com.td.simple.model_info.customer.CustomerPageableInfo;
import com.td.simple.repository.CustomerRepositoryCustom;
import com.td.simple.utils.QueryUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public class CustomerRepositoryCustomImpl implements CustomerRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    public CustomerRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Customer> search(CustomerPageableInfo info, CurrentUser currentUser) {
        return mongoTemplate.find(buildSearchQuery(info, false), Customer.class);
    }

    @Override
    public Long count(CustomerPageableInfo info, CurrentUser currentUser) {
        return mongoTemplate.count(buildSearchQuery(info, true), Customer.class);
    }

    private Query buildSearchQuery(CustomerPageableInfo model, boolean countable) {
        Query query = new Query();

        // Có từ khóa tìm kiếm
        QueryUtils.getQuerySearchText(query, model);

        if (!countable) {
            QueryUtils.getQuerySortAndPageable(query, model);
        }

        return query;
    }
}
