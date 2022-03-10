package com.td.simple.model.order;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum OrderStatus {
    NEW("NEW", "Mới"),
    PENDING("PENDING", "Chờ xác nhận"),
    CONFIRMED("CONFIRMED", "Đã xác nhận"),
    PREPARE("PREPARE", "Chuẩn bị hàng"),
    WAIT_FOR_PACKING("WAIT_FOR_PACKING", "Chờ lấy hàng"),
    DELIVERING("DELIVERING", "Đang giao hàng"),
    DELIVERED("DELIVERED", "Đã giao"),
    COMPLETED("COMPLETED", "Hoàn thành"),
    CANCELLED("CANCELLED", "Đã hủy"),
    LOST("LOST", "Thất lạc"),
    BACK_GOODS("BACK_GOODS", "Hoàn hàng");

    private final String value;
    private final String reasonPhrase;
}
