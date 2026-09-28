package com.b2b.b2b_platform.product.repository;

import com.b2b.b2b_platform.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySkuIgnoreCase(String sku);

    @Query("""
        select p from Product p
        where (:search = '' or lower(p.name) like lower(concat('%', :search, '%'))
               or lower(p.sku) like lower(concat('%', :search, '%')))
          and (:categoryId is null or p.category.id = :categoryId)
          and (:brandId is null or p.brand.id = :brandId)
        """)
    Page<Product> search(@Param("search") String search,
                         @Param("categoryId") Long categoryId,
                         @Param("brandId") Long brandId,
                         Pageable pageable);
}
