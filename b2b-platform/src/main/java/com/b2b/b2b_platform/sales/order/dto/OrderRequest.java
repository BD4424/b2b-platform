package com.b2b.b2b_platform.sales.order.dto;

import com.b2b.b2b_platform.sales.order.util.OrderDiscountType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record OrderRequest(

        @NotNull
        Long customerId,

        @NotNull
        LocalDate orderDate,

        @NotNull
        OrderDiscountType discountType,

        @NotNull
        @DecimalMin(value = "0.00")
        BigDecimal discountValue,

        @Size(max = 1000)
        String notes,

        @Valid
        @Size(min = 1, message = "Order must contain at least one item")
        List<OrderItemRequest> items
) {
}