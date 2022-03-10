package com.td.simple.repository;

import com.td.simple.model.product.Product;
import com.td.simple.model_info.product.ProductPageableInfo;

import java.util.List;

public interface ProductRepositoryCustom {

    List<Product> search(ProductPageableInfo info, List<String> categoryCodes);

    Long count(ProductPageableInfo info, List<String> categoryCodes);

    List<Product> suggestion(String keyword, String keywordType, int top);

    List<Product> searchTopBuy(int page, int top);

    void updateQuantity(String code, int quantity);

    void updateQuantityBuy(String code, int quantity);
}
