package com.b2b.b2b_platform.sales.order.repository;

import com.b2b.b2b_platform.sales.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Long> {
}