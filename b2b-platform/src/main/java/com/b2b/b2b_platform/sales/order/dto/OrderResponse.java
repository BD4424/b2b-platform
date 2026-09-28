package com.b2b.b2b_platform.sales.order.dto;

import com.b2b.b2b_platform.sales.order.util.OrderDiscountType;
import com.b2b.b2b_platform.sales.order.util.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record OrderResponse(
        Long id,
        String orderNumber,

        Long customerId,
        String customerName,

        LocalDate orderDate,

        OrderStatus status,

        BigDecimal subtotal,

        OrderDiscountType discountType,
        BigDecimal discountValue,
        BigDecimal discountAmount,

        BigDecimal paidAmount,
        BigDecimal outstandingAmount,
        BigDecimal creditLimit,
        BigDecimal availableCredit,
        boolean creditExceeded,
        boolean creditLow,

        BigDecimal totalAmount,

        String notes,

        List<OrderItemResponse> items
) {
}