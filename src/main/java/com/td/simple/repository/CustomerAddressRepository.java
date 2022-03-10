package com.td.simple.repository;

import com.td.simple.model.customer.CustomerAddress;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerAddressRepository extends BaseRepository<CustomerAddress, String> {

    Optional<CustomerAddress> findFirstById(String id);

    boolean existsById(String id);
}
