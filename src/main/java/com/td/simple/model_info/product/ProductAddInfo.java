package com.td.simple.model_info.product;

import com.td.simple.model.product.ImageDetail;
import com.td.simple.model.product.Price;
import com.td.simple.model.product.ProductStatus;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Data
public class ProductAddInfo implements Serializable {

    // Ảnh đại diện
    private String image;

    // Ảnh chi tiết
    private List<ImageDetail> imageDetails;

    private String code;

    private String name;

    private String nameDisplay;

    // Từ cao -> thấp
    private int orderNo;

    // Id danh mục sản phẩm
    private String categoryCode;

    private int quantity;

    // Sản phẩm đang sale
    private boolean isSale;

    // id thương hiệu
    private String brandCode;

    // Bảng giá của sản phẩm
    private Price price;

    // Đơn vị
    private String unit;

    // Xuất xứ
    private String origin;

    // Trạng thái sản phẩm.
    private ProductStatus status;

    // Danh sách tag cho sản phẩm
    private Set<String> tags;

    private String note;
}
