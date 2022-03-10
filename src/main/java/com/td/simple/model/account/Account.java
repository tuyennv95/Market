package com.td.simple.model.account;

import com.td.simple.model.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.commons.text.WordUtils;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import javax.validation.constraints.NotEmpty;
import java.util.Arrays;
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

    // Họ
    private String firstName;
    // Tên
    private String lastName;
    // Họ đệm
    private String middleName;

    private String email;

    //Dùng field này để định danh khách hàng
    @NotEmpty
    private String phone;

    private String avatar;

    public void processName() {
        String name = this.getFullName();

        name = name.replace("  ", " ");
        name = name.trim();
        name = WordUtils.capitalize(name);

        String[] names = name.split(" ");

        // Lấy ra tên.
        this.setLastName(names[names.length - 1]);

        // Lấy ra họ
        if (names.length > 1) {
            this.setFirstName(names[0]);
        }

        // Lấy ra tên đệm
        if (names.length > 2) {
            this.setMiddleName(String.join(" ", Arrays.copyOfRange(names, 1, names.length - 1)));
        }
    }

    public void buildFullName() {
        String fullNameTemp = fullName.trim().replaceAll("\\s+", " ").toLowerCase();

        // Creating array of string length
        char[] ch = new char[fullNameTemp.length()];

        // Copy character by character into array
        for (int i = 0; i < fullNameTemp.length(); i++) {
            if (i == 0 || fullNameTemp.charAt(i - 1) == ' ') {
                ch[i] = Character.toUpperCase(fullNameTemp.charAt(i));
            } else {
                ch[i] = fullNameTemp.charAt(i);
            }
        }

        this.setFullName(String.valueOf(ch));
    }
}
