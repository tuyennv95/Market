package com.td.simple.model.order;

import com.td.simple.common.CustomerBase;
import com.td.simple.model.BaseEntity;
import com.td.simple.utils.StringUtils;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "order_orders")
public class Order extends BaseEntity<String> {

    @Id
    private String id;

    private String code;

    private String image;

    private OrderStatus status;

    // Kinh doanh ghi chú
    private String saleNote;

    // Khách hàng ghi chú
    private String customerNote;

    private CustomerBase customer;

    // Địa chỉ nhận hàng
//    private CustomerAddress address;
    private String address;

    private String receiverPhone;

    private String receiverPhone2;

    private String receiverName;

    private List<OrderProduct> products;

    private List<OrderStatusHistory> orderStatusHistories;

    private ShipInfo shipInfo;

    // Số lượng sản phẩm
    private long totalProduct;

    // Tổng tiền hàng
    private BigDecimal amountProduct;

    // Loại giảm giá (%, Money)
    private TypeDiscount typeDiscount;

    // Giá trị giảm giá theo loại (%, Money)
    private int valueDiscount;

    // Giá trị triết khấu.
    private BigDecimal amountDiscount;

    // Thu khác
    private BigDecimal otherAmount;

    // Tổng giá trị khách cần trả
    private BigDecimal amount;

    private boolean isDeleted;

    public void makeTextSearch() {
        String textSearch = this.getCode() +
                " " + this.getCustomer().getFullName() +
                " " + this.getCustomer().getUsername() +
                " " + this.getCustomer().getCode();

        if (this.getCustomer().getPhone() != null) {
            textSearch += " " + this.getCustomer().getPhone();
        }

        textSearch = textSearch.toLowerCase();
        textSearch = StringUtils.unAccent(textSearch);

        this.setTextSearch(textSearch);
    }
}
