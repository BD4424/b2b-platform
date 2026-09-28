package com.b2b.b2b_platform.sales.leads.dto;

import com.b2b.b2b_platform.sales.leads.entity.LeadSource;
import com.b2b.b2b_platform.sales.leads.entity.LeadStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record LeadResponse(

        Long id,

        String name,

        String company,

        String phone,

        String email,

        LeadStatus status,

        LeadSource source,

        BigDecimal expectedValue,

        LocalDate expectedCloseDate,

        String notes,

        LocalDateTime createdAt,

        LocalDateTime updatedAt

) {
}