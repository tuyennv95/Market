package com.td.simple.model.customer;

import com.td.simple.model.BaseEntity;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "crm_customers_address")
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerAddress extends BaseEntity<String> {

    private String id;

    // Mã khách hàng
    private String customerCode;

    // Sử dụng làm mặc định
    private boolean useDefault;

    // Địa chỉ
//    private List<Address> address;
    private String address;

    // Tên người nhận
    private String name;
    // sđt người nhận
    private String phone;
    // sđt người nhận
    private String phone2;

    // Ghi chú thêm về địa chỉ.
    private String note;

    // người mua
    private String buyerName;
    // sđt người mua
    private String buyerPhone;
}
