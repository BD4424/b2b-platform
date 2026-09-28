package com.b2b.b2b_platform.product.dto;

public record ProductSpecificationResponse(
        Long id,
        String specificationName,
        String specificationValue
) {
}