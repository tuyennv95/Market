package com.td.simple.model_dto.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.td.simple.model.product.ImageDetail;
import com.td.simple.model.product.Price;
import com.td.simple.model.product.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductViewDto implements Serializable {

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

    // id thương hiệu
    private String brandCode;

    // Bảng giá của sản phẩm
    private Price price;

    private int quantity;

    // Sản phẩm đang sale
    private boolean isSale;

    // Đơn vị
    private String unit;

    // Xuất xứ
    private String origin;

    // Trạng thái sản phẩm.
    private ProductStatus status;

    // Danh sách tag cho sản phẩm
    private Set<String> tags;

    private String note;

    private int quantityBuy;

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
