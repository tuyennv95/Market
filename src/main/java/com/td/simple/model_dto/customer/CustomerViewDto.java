package com.td.simple.model_dto.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.td.simple.common.BankAccount;
import com.td.simple.common.EmployeeBase;
import com.td.simple.model.customer.CustomerAddress;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerViewDto implements Serializable {

    private String avatar;

    private String username;

    private String fullName;
    // Họ
    private String firstName;
    // Tên
    private String lastName;
    // Họ đệm
    private String middleName;

    private String phone;

    private String email;

    // Giới tính (MALE, FEMALE)
    private String gender;

    // Nhóm khách hàng
    private String group;

    // Loại khách hàng
    private String type;

    // Chứa thông tin các ứng dụng (ZALO, FACEBOOK, SKYPE, WECHAT)
    private Map<String, String> other;

    // Ghi chú cho khách hàng.
    private String note;

    // Nhân viên Sale phụ trách
    private EmployeeBase sale;

    private List<BankAccount> bankAccounts;

    // Sinh nhật
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime birthDay;

    private boolean married;

    private BigDecimal moneySpent;

    @Builder.Default
    private List<CustomerAddress> address = new ArrayList<>();

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime createdDate;

    private String createdBy;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime lastModifiedDate;

    private String lastModifiedBy;

}
