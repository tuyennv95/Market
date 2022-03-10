package com.td.simple.model_dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.td.simple.common.CustomerBase;
import com.td.simple.model.customer.CustomerAddress;
import com.td.simple.model.order.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderViewDto implements Serializable {

    private String code;

    private String image;

    private OrderStatus status;

    // Kinh doanh ghi chú
    private String saleNote;

    // Khách hàng ghi chú
    private String customerNote;

    private CustomerBase customer;

    // Địa chỉ nhận hàng
//    private CustomerAddress address;
    private String address;

    private String receiverPhone;

    private String receiverPhone2;

    private String receiverName;

    private List<OrderProduct> products;

    private List<OrderStatusHistory> orderStatusHistories;

    private ShipInfo shipInfo;

    // Số lượng sản phẩm
    private long totalProduct;

    // Tổng tiền hàng
    private BigDecimal amountProduct;

    // Loại giảm giá (%, Money)
//    private TypeDiscount typeDiscount;

    // Giá trị giảm giá theo loại (%, Money)
//    private Integer valueDiscount;

    // Giá trị triết khấu.
//    private BigDecimal amountDiscount;

    // Thu khác
    private BigDecimal otherAmount;

    // Tổng giá trị khách cần trả
    private BigDecimal amount;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime createdDate;

    private String createdBy;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime lastModifiedDate;

    private String lastModifiedBy;
}
