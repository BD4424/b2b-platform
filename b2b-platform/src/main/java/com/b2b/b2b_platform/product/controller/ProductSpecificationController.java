package com.b2b.b2b_platform.product.controller;

import com.b2b.b2b_platform.product.dto.ProductSpecificationRequest;
import com.b2b.b2b_platform.product.dto.ProductSpecificationResponse;
import com.b2b.b2b_platform.product.entity.Product;
import com.b2b.b2b_platform.product.entity.ProductSpecification;
import com.b2b.b2b_platform.product.repository.ProductRepository;
import com.b2b.b2b_platform.product.repository.ProductSpecificationRepository;
import com.b2b.b2b_platform.product.service.ProductSpecificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products-specification")
@RequiredArgsConstructor
public class ProductSpecificationController {

    private final ProductSpecificationService productSpecificationService;
    private final ProductRepository productRepository;

    @GetMapping("/{productId}/specifications")
    public List<ProductSpecificationResponse> getSpecifications(
            @PathVariable Long productId) {

        return productSpecificationService.getByProductId(productId);
    }

    @PostMapping("/{productId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductSpecificationResponse addSpecification(
            @PathVariable Long productId,
            @Valid @RequestBody ProductSpecificationRequest request) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found: " + productId));

        ProductSpecification specification = new ProductSpecification();

        specification.setSpecificationName(
                request.specificationName());

        specification.setSpecificationValue(
                request.specificationValue());

        specification.setProduct(product);

        return toResponse(
                productSpecificationService.addSpecification(specification));
    }

    @DeleteMapping("/{specificationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSpecification(
            @PathVariable Long specificationId) {

        productSpecificationService.deleteSpecification(specificationId);
    }

    private ProductSpecificationResponse toResponse(
            ProductSpecification specification) {

        return new ProductSpecificationResponse(
                specification.getId(),
                specification.getSpecificationName(),
                specification.getSpecificationValue());
    }

}