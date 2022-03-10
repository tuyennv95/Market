package com.td.simple.common;

import lombok.Data;

import java.io.Serializable;

@Data
public class CustomerBase implements Serializable {

    // Tài khoản
    private String username;

    // Họ và tên.
    private String code;

    // Mã phòng ban
    private String fullName;

    // Giới tính
    private String gender;

    private String phone;
}
