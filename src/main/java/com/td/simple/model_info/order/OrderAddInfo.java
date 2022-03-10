package com.td.simple.model_info.order;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderAddInfo implements Serializable {

    // Kinh doanh ghi chú
//    private String saleNote;

    // Khách hàng ghi chú
    private String customerNote;

    // Địa chỉ nhận hàng
    private String address;

    private String receiverPhone;

    private String receiverPhone2;

    private String receiverName;

    private List<OrderProductAddInfo> products;

    // Loại giảm giá (%, Money)
//    private TypeDiscount typeDiscount;

    // Giá trị giảm giá theo loại (%, Money)
//    private Integer valueDiscount;

//    private BigDecimal otherAmount;
}
