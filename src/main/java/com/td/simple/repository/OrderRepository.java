package com.td.simple.repository;

import com.td.simple.model.order.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends BaseRepository<Order, String>, OrderRepositoryCustom {

    boolean existsByCode(String code);

    Optional<Order> findFirstByCode(String code);

    List<Order> findAllByCodeIn(Collection<String> codes);

    List<Order> findAllByCustomerUsername(String username, Pageable pageable);
}
