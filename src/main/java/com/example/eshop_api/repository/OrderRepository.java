package com.example.eshop_api.repository;

import com.example.eshop_api.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByPaymentSessionId(Long paymentSessionId);
}
