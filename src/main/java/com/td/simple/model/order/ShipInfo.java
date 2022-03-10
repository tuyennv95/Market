package com.td.simple.model.order;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShipInfo {

    // Tên shipper
    private String shipperName;

    // Đối tác
    private String partner;
}
