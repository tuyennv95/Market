package com.td.simple.model.order;

import com.td.simple.model.product.Price;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderProduct {

    private String image;

    private String code;

    private String name;

    private String nameDisplay;

    // Số lượng mua
    private int quantity;

    // Giá mua
    private BigDecimal price;

    // Tổng tiền
    private BigDecimal amount;

    private String unit;

    // Giá khi lên đơn
    private Price privatePrice;
}
