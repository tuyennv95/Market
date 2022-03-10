package com.td.simple.model.product;

import com.td.simple.model.BaseEntity;
import com.td.simple.utils.StringUtils;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "product_products")
public class Product extends BaseEntity<String> {

    @Id
    private String id;

    // Ảnh đại diện
    private String image;

    // Ảnh chi tiết
    private List<ImageDetail> imageDetails;

    private String code;

    private String name;

    private String nameDisplay;

    // Từ cao -> thấp
    private int orderNo;

    // mã danh mục sản phẩm
    private String categoryCode;

    private int quantity;

    // Sản phẩm đang sale
    private boolean isSale;

    // mã thương hiệu
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

    private int quantityBuy;

    /**
     * Tạo textsearch
     */
    public void makeTextSearch() {
        String textSearch = this.code +
                " " +
                this.name +
                " " +
                this.nameDisplay +
                " " +
                this.categoryCode +
                " " +
                this.brandCode;

        textSearch = textSearch.toLowerCase();
        textSearch = StringUtils.unAccent(textSearch);

        this.setTextSearch(textSearch);
    }
}
