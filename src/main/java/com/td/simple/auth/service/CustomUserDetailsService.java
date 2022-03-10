package com.td.simple.auth.service;

import com.td.simple.constants.Common;
import com.td.simple.model.customer.Customer;
import com.td.simple.model.employee.Employee;
import com.td.simple.repository.CustomerRepository;
import com.td.simple.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public CustomUserDetail loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomUserDetail customUser = null;

        if (username.startsWith("customer_")) {
            username = username.substring(9);

            Customer customer = customerRepository.findFirstByUsername(username).orElse(null);

            if (customer != null) {
                Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
                grantedAuthorities.add(new SimpleGrantedAuthority(Common.CUSTOMER_APP));

                customUser = new CustomUserDetail(customer.getUsername(), customer.getPassword(),
                        customer.isEnabled(), true, true, true, grantedAuthorities);

                customUser.setClientId("customer");
                customUser.setEmail(customer.getEmail());
                customUser.setPhone(customer.getPhone());
                customUser.setProductFavorite(customer.getProductFavorite());
            }
        } else {
            username = username.substring(9);

            Employee employee = employeeRepository.findFirstByUsername(username).orElse(null);

            if (employee != null) {
                Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
                grantedAuthorities.add(new SimpleGrantedAuthority(Common.EMPLOYEE_APP));

                customUser = new CustomUserDetail(employee.getUsername(), employee.getPassword(),
                        employee.isEnabled(), true, true, true, grantedAuthorities);

                customUser.setClientId("employee");
                customUser.setEmail(employee.getEmail());
                customUser.setPhone(employee.getPhone());
            }
        }

        return customUser;
    }

    public class CustomUserDetail extends User {
        private String clientId;
        private String email;
        private String phone;
        private List<String> productFavorite;

        public CustomUserDetail(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
            super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        }

        public String getClientId() {
            return clientId;
        }

        public void setClientId(String clientId) {
            this.clientId = clientId;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public List<String> getProductFavorite() {
            return productFavorite;
        }

        public void setProductFavorite(List<String> productFavorite) {
            this.productFavorite = productFavorite;
        }
    }
}
