package com.b2b.b2b_platform.sales.order.dto;

import com.b2b.b2b_platform.sales.order.util.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record OrderStatusRequest(
        @NotNull
        OrderStatus status
) {
}