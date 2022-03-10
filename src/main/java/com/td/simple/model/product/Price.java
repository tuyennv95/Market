package com.td.simple.model.product;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class Price {
    // Giá sản phẩm
    private BigDecimal price;

    // Giá khi sale
    private BigDecimal priceSale;

    // Giá mua nhiều
    private List<PriceCustom> priceCustoms;
}
