package com.b2b.b2b_platform.product.dto;

import java.math.BigDecimal;

public record ProductResponse(
    Long id,
    String name,
    String sku,
    String unit,
    BigDecimal sellingPrice,
    BigDecimal costPrice,
    Integer stockQuantity,
    String salesNotes,
    Long categoryId,
    String categoryName,
    Long brandId,
    String brandName
) {}
