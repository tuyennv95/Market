package com.td.simple.model.catalog;

import com.td.simple.model.BaseEntity;
import com.td.simple.utils.StringUtils;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "system_catalog_catalogs")
@Data
public class Catalog extends BaseEntity<String> {

    @Id
    private String id;

    // Mã danh mục
    private String code;

    // Tên danh mục
    private String name;

    // Được chọn mặc định tại các ô option hay không
    private boolean useDefault;

    // Mã nhóm catalog
    private String groupCode;

    // Là danh mục của hệ thống(Không thể xóa)
    private boolean system;

    // Ưu tiên sắp xếp.
    private int orderNo;

    // Mô tả danh mục.
    private String description;

    // Lưu thêm các thông tin mở rộng khác.
    private Map<String, Object> data;

    /**
     * Tạo textsearch
     */
    public void makeTextSearch() {
        String textSearch = this.code + " " + this.name;

        textSearch = textSearch.toLowerCase();
        textSearch = StringUtils.unAccent(textSearch);

        this.setTextSearch(textSearch);
    }
}
