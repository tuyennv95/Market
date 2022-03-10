package com.td.simple.repository.impl;

import com.google.common.base.Strings;
import com.td.simple.model.account.CurrentUser;
import com.td.simple.model.order.Order;
import com.td.simple.model_info.order.OrderPageableInfo;
import com.td.simple.repository.OrderRepositoryCustom;
import com.td.simple.utils.QueryUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.awt.peer.PanelPeer;
import java.util.List;

public class OrderRepositoryImpl implements OrderRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    public OrderRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Order> search(OrderPageableInfo info, CurrentUser currentUser) {
        return mongoTemplate.find(buildSearchQuery(info, currentUser, false), Order.class);
    }

    @Override
    public Long count(OrderPageableInfo info, CurrentUser currentUser) {
        return mongoTemplate.count(buildSearchQuery(info, currentUser, true), Order.class);
    }

    private Query buildSearchQuery(OrderPageableInfo model, CurrentUser currentUser, boolean countable) {
        Query query = new Query();

        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (model.getStatus() != null) {
            query.addCriteria(Criteria.where("status").is(model.getStatus()));
        }

        // Tìm theo mã khách hàng
        if (!Strings.isNullOrEmpty(model.getUsernameCustomer())) {
            query.addCriteria(Criteria.where("customer.username").is(model.getUsernameCustomer()));
        }

        // Tìm theo ngày giờ
        if (model.getStatus() != null) {
            if (model.getBeginDate() != null && model.getEndDate() != null) {
                query.addCriteria(QueryUtils.getRangeCriteriaLocalDateTime(
                        model.getBeginDate(),
                        model.getEndDate(),
                        "lastModifiedDate",
                        Integer.parseInt(currentUser.getTimeZone())));
            } else {
                if (model.getBeginDate() != null) {
                    query.addCriteria(Criteria
                            .where("lastModifiedDate")
                            .gte(model.getBeginDate().plusHours(-Integer.parseInt(currentUser.getTimeZone()))));
                }

                if (model.getEndDate() != null) {
                    query.addCriteria(Criteria
                            .where("lastModifiedDate")
                            .lte(model.getEndDate().plusHours(-Integer.parseInt(currentUser.getTimeZone()))));
                }
            }
        } else {
            if (model.getBeginDate() != null && model.getEndDate() != null) {
                query.addCriteria(QueryUtils.getRangeCriteriaLocalDateTime(
                        model.getBeginDate(),
                        model.getEndDate(),
                        "createdDate",
                        Integer.parseInt(currentUser.getTimeZone())));
            } else {
                if (model.getBeginDate() != null) {
                    query.addCriteria(Criteria
                            .where("createdDate")
                            .gte(model.getBeginDate().plusHours(-Integer.parseInt(currentUser.getTimeZone()))));
                }

                if (model.getEndDate() != null) {
                    query.addCriteria(Criteria
                            .where("createdDate")
                            .lte(model.getEndDate().plusHours(-Integer.parseInt(currentUser.getTimeZone()))));
                }
            }
        }

        // Có từ khóa tìm kiếm
        QueryUtils.getQuerySearchText(query, model);

        if (!countable) {
            QueryUtils.getQuerySortAndPageable(query, model);
        }

        return query;
    }
}
