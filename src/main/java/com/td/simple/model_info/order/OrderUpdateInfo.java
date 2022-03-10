package com.td.simple.model_info.order;

import com.td.simple.model.order.OrderStatus;
import com.td.simple.model.order.ShipInfo;
import lombok.Data;

import java.io.Serializable;

@Data
public class OrderUpdateInfo implements Serializable {

    private String code;

    private OrderStatus status;

    private String note;

    private ShipInfo shipInfo;
}
