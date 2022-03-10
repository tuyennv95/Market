package com.td.simple.repository;

import com.td.simple.model.customer.Customer;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends BaseRepository<Customer, String>, CustomerRepositoryCustom {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    Optional<Customer> findFirstByUsername(String username);

    Optional<Customer> findFirstByCode(String code);

    List<Customer> findAllByUsernameIn(Collection<String> usernames);

    List<Customer> findAllByCodeIn(Collection<String> codes);
}
