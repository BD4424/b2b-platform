package com.b2b.b2b_platform.product.repository;

import com.b2b.b2b_platform.product.entity.ProductSpecification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductSpecificationRepository
        extends JpaRepository<ProductSpecification, Long> {

    List<ProductSpecification> findByProductId(Long productId);
}