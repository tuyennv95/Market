package com.td.simple.repository.impl;


import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.employee.Employee;
import com.td.simple.model_info.employee.EmployeePageableInfo;
import com.td.simple.repository.EmployeeRepositoryCustom;
import com.td.simple.utils.QueryUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public class EmployeeRepositoryCustomImpl implements EmployeeRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    public EmployeeRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Employee> search(EmployeePageableInfo info, CurrentUser currentUser) {
        return mongoTemplate.find(buildSearchQuery(info, false), Employee.class);
    }

    @Override
    public Long count(EmployeePageableInfo info, CurrentUser currentUser) {
        return mongoTemplate.count(buildSearchQuery(info, true), Employee.class);
    }

    private Query buildSearchQuery(EmployeePageableInfo model, boolean countable) {
        Query query = new Query();

        // Có từ khóa tìm kiếm
        QueryUtils.getQuerySearchText(query, model);

        if (!countable) {
            QueryUtils.getQuerySortAndPageable(query, model);
        }

        return query;
    }
}
