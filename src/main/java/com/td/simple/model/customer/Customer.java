package com.td.simple.model.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.td.simple.common.BankAccount;
import com.td.simple.model.account.Account;
import com.td.simple.common.EmployeeBase;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Document(collection = "crm_customers")
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Customer extends Account {

    // Họ
    private String firstName;
    // Tên
    private String lastName;
    // Họ đệm
    private String middleName;

    // Giới tính (MALE, FEMALE)
    private String gender;

    // Nhóm khách hàng: bán buôn, bán lẻ, mua nhiều lần, ..
    private String group;

    // Loại khách hàng: Vip1, Vip2
    private String type;

    // Chứa thông tin các ứng dụng (ZALO, FACEBOOK, SKYPE, WECHAT)
    private Map<String, String> other;

    // Ghi chú cho khách hàng.
    private String note;

    // Nhân viên Sale phụ trách
    private EmployeeBase sale;

    @Builder.Default
    private List<BankAccount> bankAccounts = new ArrayList<>();

    // Sinh nhật
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime birthDay;

    // Đã lấy vợ hay chồng hay chưa
    private boolean married;

    // Mã xác nhận tài khoản đổi mật khẩu
    private String reCapcha;

    // Số tiền hàng đã mua
    private BigDecimal moneySpent;

    private boolean createdByCustomer;
}
