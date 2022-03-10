package com.td.simple.model_info.category;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Data
@AllArgsConstructor
public class CategoryAddInfo implements Serializable {

    private String code;

    private String name;

    // Các loại của danh mục
    private Set<String> modes = new HashSet<>();

    // theo thứ tự ưu tiên giảm dần
    private long orderNo;

    // Danh mục cha
    private String parentCode;

    private Map<String, Object> data;

    private String note;
}
