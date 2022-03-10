package com.td.simple.model.product;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ProductStatus {
    ON_SELLING("ON_SELLING", "Đang bán"),
    WAITING("WAITING", "Hàng đang về"),
    STOP_SELLING("STOP_SELLING", "Ngừng bán");

    private final String value;
    private final String reasonPhrase;
}

