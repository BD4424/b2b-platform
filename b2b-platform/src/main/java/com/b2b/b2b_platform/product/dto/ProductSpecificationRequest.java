package com.b2b.b2b_platform.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProductSpecificationRequest(
        @NotBlank
        @Size(max = 100)
        String specificationName,

        @NotBlank
        @Size(max = 100)
        String specificationValue) {
}
