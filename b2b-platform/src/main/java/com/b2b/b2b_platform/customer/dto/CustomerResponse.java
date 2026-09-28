package com.b2b.b2b_platform.customer.dto;

import java.math.BigDecimal;

public record CustomerResponse(
        Long id,
        String name,
        String customerType,
        String phone,
        String email,
        String address,
        String city,
        String state,
        String postalCode,
        BigDecimal creditLimit,
        BigDecimal outstandingAmount
) {
}