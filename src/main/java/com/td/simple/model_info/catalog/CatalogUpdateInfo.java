package com.td.simple.model_info.catalog;

import lombok.*;

import java.io.Serializable;
import java.util.Map;

@Data
public class CatalogUpdateInfo implements Serializable {

    // Mã danh mục
    private String code;

    // Tên danh mục
    private String name;

    // Được chọn mặc định tại các ô option hay không
    private boolean useDefault;

    // Là danh mục của hệ thống(Không thể xóa)
    private boolean system;

    // Ưu tiên sắp xếp.
    private int orderNo;

    // Mô tả danh mục.
    private String description;

    // Lưu thêm các thông tin mở rộng khác.
    private Map<String, Object> data;
}
