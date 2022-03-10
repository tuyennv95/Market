package com.td.simple.model.order;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TypeDiscount {
    //Chiết khấu theo phần trăm
    PERCENT("PERCENT", "Phần trăm"),
    //Chiết khấu thẳng vào tiền mặt
    VND("VND", "Tiền mặt");

    private final String value;
    private final String reasonPhrase;
}
