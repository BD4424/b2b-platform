package com.b2b.b2b_platform.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "product_specifications",
    indexes = {
        @Index(name = "idx_product_specifications_product_id", columnList = "product_id")
    }
)
@Getter
@Setter
@NoArgsConstructor
public class ProductSpecification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "specification_name", nullable = false, length = 100)
    private String specificationName;

    @Column(name = "specification_value", nullable = false, length = 500)
    private String specificationValue;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

}