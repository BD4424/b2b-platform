package com.b2b.b2b_platform.ai.dto;

import java.math.BigDecimal;

public record AiProduct(
    Long id,
    String name,
    String sku,
    String unit,
    BigDecimal sellingPrice,
    Integer stockQuantity,
    String category,
    String brand
) {
}