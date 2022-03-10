package com.td.simple.model.product;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PriceCustom {

    // Giá >=
    private int quantity;

    private BigDecimal price;

    private BigDecimal priceSale;
}
