package com.td.simple.repository;

import com.td.simple.model.product.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends BaseRepository<Product, String>, ProductRepositoryCustom {
}
