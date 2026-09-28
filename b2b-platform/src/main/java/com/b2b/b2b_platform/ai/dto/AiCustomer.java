package com.b2b.b2b_platform.ai.dto;

import java.math.BigDecimal;

public record AiCustomer(
    Long id,
    String name,
    String customerType,
    String city,
    String state,
    BigDecimal creditLimit,
    BigDecimal outstandingAmount
) {
}