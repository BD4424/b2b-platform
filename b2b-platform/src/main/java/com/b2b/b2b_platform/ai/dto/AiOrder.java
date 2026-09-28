package com.b2b.b2b_platform.ai.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record AiOrder(
    Long id,
    String orderNumber,
    String customerName,
    LocalDate orderDate,
    String status,
    BigDecimal subtotal,
    BigDecimal discountAmount,
    BigDecimal totalAmount
) {
}