package com.td.simple.repository;

import com.td.simple.model.category.Category;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends BaseRepository<Category, String>, CategoryRepositoryCustom {

    boolean existsByCode(String code);

    Optional<Category> findFirstByCode(String code);

    List<Category> findAllByCodeIn(Collection<String> codes);

    boolean existsByCodeAndAncestorsCodesIn(String code, String ancestorsCode);

    List<Category> findAllByAncestorsCodesIn(String code);
}
