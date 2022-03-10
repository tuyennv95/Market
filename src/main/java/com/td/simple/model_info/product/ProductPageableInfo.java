package com.td.simple.model_info.product;

import com.td.simple.model_info.BasePageableInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ProductPageableInfo extends BasePageableInfo {

    private String categoryCode;

    // Sản phẩm đang sale
    private Boolean isSale;
}
