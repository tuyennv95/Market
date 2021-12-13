package com.td.simple.common;

import lombok.Data;

import java.io.Serializable;

@Data
public class BankAccount implements Serializable {

    // Mã định danh
    private String code;

    // === Thông tin ngân hàng ===
    // Tên ngân hàng
    private String bankName;

    // Chi nhánh ngân hàng
    private String branch;

    // Số tài khoản
    private String bankCode;

    // Chủ tài khoản
    private String accountHolder;

    // Ghi chú thêm
    private String note;
}
