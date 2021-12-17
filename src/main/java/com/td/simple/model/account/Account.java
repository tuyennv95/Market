package com.td.simple.model.account;

import com.td.simple.model.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import javax.validation.constraints.NotEmpty;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
public class Account extends BaseEntity<String> {

    @Id
    private transient String id;

    // Là sđt nếu như là customer
    @Indexed(unique = true)
    @NotEmpty
    private String username;

    @NotEmpty
    private String password;

    private boolean isCustomer;

    private boolean enabled = false;

    private boolean expired = false;

    private boolean locked = false;

    private boolean credentialsExpired = false;

    private Set<String> roles;

    // Tên hiển thị
    @NotEmpty
    private String fullName;

    private String email;

    //Dùng field này để định danh khách hàng
    @NotEmpty
    private String phone;

    private String avatar;
}
