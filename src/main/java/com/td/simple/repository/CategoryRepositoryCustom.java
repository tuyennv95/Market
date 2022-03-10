package com.td.simple.repository;

import com.td.simple.model.category.Category;
import com.td.simple.model_info.category.CategoryPageableInfo;

import java.util.List;

public interface CategoryRepositoryCustom {

    List<Category> search(CategoryPageableInfo info);

    Long count(CategoryPageableInfo info);

    void updateChild(String categoryCode, int inc);
}
