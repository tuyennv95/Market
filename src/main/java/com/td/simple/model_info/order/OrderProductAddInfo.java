package com.td.simple.model_info.order;

import lombok.Data;

@Data
public class OrderProductAddInfo {

    private String code;

    // Số lượng mua
    private int quantity;
}
