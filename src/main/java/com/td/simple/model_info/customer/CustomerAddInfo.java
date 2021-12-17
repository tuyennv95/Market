package com.td.simple.model_info.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.td.simple.common.BankAccount;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class CustomerAddInfo implements Serializable {

    @NotNull
    private String username;

    @NotNull
    private String fullName;

    private String password;

    @NotNull
    private String phone;

    private String email;

    // Mã nhóm khách hàng
    private String group;

    // Nhân viên phụ trách khách hàng.
    private String saleUsername;

    // Giới tính (MALE, FEMALE)
    private String gender;

    // Chứa thông tin các ứng dụng (ZALO, FACEBOOK, SKYPE, WECHAT)
    private Map<String, String> other;

    private List<BankAccount> bankAccounts;

    // Sinh nhật
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime birthDay;

    // Đã lấy vợ hay chồng hay chưa
    private boolean married;

    // Ghi chú cho khách hàng.
    private String note;
}
