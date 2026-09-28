package com.b2b.b2b_platform.payment.repository;

import com.b2b.b2b_platform.payment.entiy.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    @Query("""
        SELECT COALESCE(SUM(p.amount), 0)
        FROM Payment p
        WHERE p.customer.id = :customerId
    """)
    BigDecimal getTotalPaidByCustomer(
            @Param("customerId") Long customerId
    );

    @Query("""
        SELECT COALESCE(SUM(p.amount), 0)
        FROM Payment p
        WHERE p.order.id = :orderId
    """)
    BigDecimal getTotalPaidByOrder(
            @Param("orderId") Long orderId
    );
}