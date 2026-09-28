package com.b2b.b2b_platform.product.service;

import com.b2b.b2b_platform.product.dto.ProductSpecificationResponse;
import com.b2b.b2b_platform.product.entity.ProductSpecification;
import com.b2b.b2b_platform.product.repository.ProductSpecificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductSpecificationService {

    private final ProductSpecificationRepository productSpecificationRepository;

    public List<ProductSpecificationResponse> getByProductId(Long productId) {
         return productSpecificationRepository.findByProductId(productId).stream()
                .map(spec-> new ProductSpecificationResponse(spec.getId(),spec.getSpecificationName(),spec.getSpecificationValue()))
                 .toList();
    }

    public ProductSpecification addSpecification(ProductSpecification specification) {
        return productSpecificationRepository.save(specification);
    }

    public void deleteSpecification(Long id) {
        productSpecificationRepository.deleteById(id);
    }
}