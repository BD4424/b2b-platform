package com.b2b.b2b_platform.sales.order.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record OrderItemRequest(

        @NotNull
        Long productId,

        @NotNull
        @DecimalMin(value = "0.001")
        BigDecimal quantity,

        @NotNull
        @DecimalMin(value = "0.00")
        BigDecimal unitPrice
) {
}