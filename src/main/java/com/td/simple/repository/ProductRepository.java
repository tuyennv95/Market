package com.td.simple.repository;

import com.td.simple.model.product.Product;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends BaseRepository<Product, String>, ProductRepositoryCustom {

    boolean existsByCode(String code);

    Optional<Product> findFirstByCode(String code);

    List<Product> findAllByCodeIn(Collection<String> codes);

    long countByCategoryCode(String categoryCode);
}
