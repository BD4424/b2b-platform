package com.b2b.b2b_platform.product.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record ProductRequest(
    @NotBlank @Size(max = 200) String name,
    @NotBlank @Size(max = 80) String sku,
    @Size(max = 50) String unit,
    @NotNull @PositiveOrZero BigDecimal sellingPrice,
    @PositiveOrZero BigDecimal costPrice,
    @NotNull @PositiveOrZero Integer stockQuantity,
    @Size(max = 1000) String salesNotes,
    @NotNull Long categoryId,
    @NotNull Long brandId
) {}
