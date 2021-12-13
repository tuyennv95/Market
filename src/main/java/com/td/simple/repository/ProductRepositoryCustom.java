package com.td.simple.repository;

import com.td.simple.model.product.Product;
import com.td.simple.model_info.product.ProductPageableInfo;

import java.util.List;

public interface ProductRepositoryCustom {
    List<Product> search(ProductPageableInfo info);

    Long count(ProductPageableInfo info);
}
