package com.td.simple.model.catalog;

import com.td.simple.model.BaseEntity;
import com.td.simple.utils.StringUtils;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "system_catalog_groups")
@Data
public class CatalogGroup extends BaseEntity<String> {

    //Id bản ghi mongo
    @Id
    private String id;

    // Mã nhóm
    private String code;

    // Tên danh mục
    private String name;

    // Là nhóm danh mục của hệ thống(Không thể xóa)
    private boolean system;

    // Ưu tiên sắp xếp. to > nhỏ
    private int orderNo;

    // Mô tả danh mục.
    private String description;

    // Lưu thêm các thông tin mở rộng khác.
    private Map<String, Object> data;

    // Danh sách các thuộc tính cho Catalog
    private List<CatalogAttribute> attributes;

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
