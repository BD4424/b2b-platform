package com.b2b.b2b_platform.sales.order.dto;

import java.math.BigDecimal;

public record CustomerCreditResponse(

        Long customerId,

        BigDecimal creditLimit,

        BigDecimal currentOutstanding,

        BigDecimal availableCredit,

        BigDecimal orderAmount,

        BigDecimal availableCreditAfterOrder,

        boolean creditExceeded,

        boolean creditLow

) {
}