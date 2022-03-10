package com.td.simple.model.category;

import com.td.simple.model.BaseEntity;
import com.td.simple.utils.StringUtils;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "product_categories")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category extends BaseEntity<String> {

    // Id bản ghi mongo
    @Id
    private String id;

    private String code;

    private String name;

    // Các loại của danh mục
    private Set<String> modes = new HashSet<>();

    // theo thứ tự ưu tiên giảm dần
    private long orderNo;

    // Cấp level của danh mục.
    private int level;

    // Danh mục cha
    private String parentCode;

    // Đường dẫn từ Root
    private String codePath;

    // Danh sách mã danh mục cha bên trên.
    private Set<String> ancestorsCodes = new HashSet<>();

    // Số danh mục con trực tiếp của phòng ban này.
    private long childrenNo;

    private Map<String, Object> data = new HashMap<>();

    private String note;

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
