package com.b2b.b2b_platform.sales.leads.dto;

import com.b2b.b2b_platform.sales.leads.entity.LeadSource;
import com.b2b.b2b_platform.sales.leads.entity.LeadStatus;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record LeadRequest(

        @NotBlank
        @Size(max = 150)
        String name,

        @Size(max = 150)
        String company,

        @Size(max = 30)
        String phone,

        @Email
        @Size(max = 150)
        String email,

        LeadStatus status,

        LeadSource source,

        @DecimalMin(value = "0.0")
        BigDecimal expectedValue,

        LocalDate expectedCloseDate,

        @Size(max = 1000)
        String notes

) {
}