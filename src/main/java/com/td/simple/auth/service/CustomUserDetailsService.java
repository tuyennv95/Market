package com.td.simple.auth.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public CustomUserDetail loadUserByUsername(String username) throws UsernameNotFoundException {
        // Kiểm tra xem có dữ liệu nào phù hợp vs username này không?
        // pass: qqq123
        CustomUserDetail customUser = null;

        if ("tudinh".equals(username)) {
            customUser = new CustomUserDetail("tudinh", "$2a$10$lN4f9ApRO9EHIax2OBtaCeYu4lqRpsgyPLMN05ThxiNEOAyOSRbBC",
                    true, true, true, true, new ArrayList<>());
        }

        return customUser;
    }

    static final class CustomUserDetail extends User {

        private String email;
        private String phone;
        private String name;
        private transient Set<String> roles;

        public CustomUserDetail(String username, String password, Collection<? extends GrantedAuthority> authorities) {
            super(username, password, authorities);
        }

        public CustomUserDetail(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
            super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        }

        @Override
        public boolean equals(Object obj) {
            return super.equals(obj);
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Set<String> getRoles() {
            return roles;
        }

        public void setRoles(Set<String> roles) {
            this.roles = roles;
        }
    }
}
