package com.td.simple.utils;

import com.td.simple.model_info.BasePageableInfo;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;

import java.time.LocalDateTime;

public class QueryUtils {

    public static void getQuerySortAndPageable(Query query, BasePageableInfo model) {
        // Thêm điều kiện sort
        if (!StringUtils.isNullOrEmpty(model.getFieldSorted()) && !StringUtils.isNullOrEmpty(model.getTypeSorted())) {
            query.with(Sort.by(
                    Sort.Direction.valueOf(model.getTypeSorted().toUpperCase()),
                    model.getFieldSorted()));
        } else {
            query.with(Sort.by(Sort.Direction.DESC, "createdDate"));
        }

        // Lấy theo page
        if (model.getCurrentPage() > 0 && model.getRecordPerPage() > 0) {
            Pageable pageable = PageRequest.of(model.getCurrentPage() - 1, model.getRecordPerPage());
            query.with(pageable);
        }
    }

    public static void getQuerySearchText(Query query, BasePageableInfo model) {
        if (!StringUtils.isNullOrEmpty(model.getKeyword())) {
            model.setKeyword(model.getKeyword().trim());

            if (model.getKeywordType() == null ||
                    model.getKeywordType().equals("all") ||
                    model.getKeywordType().equals("")) {
                query.addCriteria(TextCriteria.forDefaultLanguage().matchingAny(model.getKeyword()));
            } else {
                // Tìm kiếm theo field
                query.addCriteria(Criteria.where(model.getKeywordType()).is(model.getKeyword()));
            }
        }
    }

    public static Criteria getRangeCriteriaLocalDateTime(
            LocalDateTime beginDate, LocalDateTime endDate, String fieldName, int timeZone
    ) {
        Criteria criteria = null;

        if (beginDate != null) {
            LocalDateTime startDateTime = beginDate.plusHours(-timeZone);
            criteria = Criteria.where(fieldName).gte(startDateTime);
        }

        if (endDate != null) {
            LocalDateTime endDateTime = endDate.plusHours(-timeZone);
            if (criteria == null) {
                criteria = Criteria.where(fieldName).lte(endDateTime);
            } else {
                criteria.lte(endDateTime);
            }
        }

        return criteria;
    }


    private void StringUtils() {
        throw new IllegalStateException("QueryUtils class");
    }
}
