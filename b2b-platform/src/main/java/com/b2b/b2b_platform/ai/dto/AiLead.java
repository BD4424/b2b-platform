package com.b2b.b2b_platform.ai.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record AiLead(
    Long id,
    String name,
    String company,
    String status,
    String source,
    BigDecimal expectedValue,
    LocalDate expectedCloseDate
) {
}