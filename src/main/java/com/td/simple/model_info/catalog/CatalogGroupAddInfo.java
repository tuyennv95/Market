package com.td.simple.model_info.catalog;

import com.td.simple.model.catalog.CatalogAttribute;
import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
public class CatalogGroupAddInfo implements Serializable {

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
}
