package com.td.simple.model_info;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasePageableInfo implements Serializable {

    // Tìm trong tất cả hoặc mã đơn
    private String keywordType;

    // Từ khóa tìm chung chung
    private String keyword;

    // Trang hiện tại.
    private int currentPage = 1;

    // Số bản ghi trên một trang.
    private int recordPerPage = 20;

    // Tên trường sắp xếp
    private String fieldSorted;

    // hướng sưaps xếp asc | desc
    private String typeSorted;
}
