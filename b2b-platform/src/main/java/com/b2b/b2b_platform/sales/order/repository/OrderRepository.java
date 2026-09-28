package com.b2b.b2b_platform.sales.order.repository;

import com.b2b.b2b_platform.sales.order.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

    Page<Order> findByOrderNumberContainingIgnoreCaseOrderByCreatedAtDesc(
            String orderNumber,
            Pageable pageable
    );

    boolean existsByOrderNumber(String orderNumber);

    Page<Order> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("""
    SELECT COALESCE(SUM(o.totalAmount), 0)
    FROM Order o
    WHERE o.customer.id = :customerId
      AND o.status <> com.b2b.b2b_platform.sales.order.util.OrderStatus.CANCELLED
""")
    BigDecimal getTotalOrderAmountByCustomer(
            @Param("customerId") Long customerId
    );
}