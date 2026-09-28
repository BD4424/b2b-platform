package com.b2b.b2b_platform.product.service;

import com.b2b.b2b_platform.product.dto.*;
import com.b2b.b2b_platform.product.entity.*;
import com.b2b.b2b_platform.product.repository.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository,
                          BrandRepository brandRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.brandRepository = brandRepository;
    }

    @Transactional(readOnly = true)
    public Page<ProductResponse> search(String search, Long categoryId, Long brandId, Pageable pageable) {
        return productRepository.search(search == null ? "" : search.trim(), categoryId, brandId, pageable)
            .map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public ProductResponse get(Long id) {
        return toResponse(findProduct(id));
    }

    public ProductResponse create(ProductRequest request) {
        if (productRepository.existsBySkuIgnoreCase(request.sku())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "SKU already exists");
        }
        Product product = new Product();
        apply(product, request);
        return toResponse(productRepository.save(product));
    }

    public ProductResponse update(Long id, ProductRequest request) {
        Product product = findProduct(id);
        if (!product.getSku().equalsIgnoreCase(request.sku())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "SKU Mismatch");
        }
        apply(product, request);
        return toResponse(productRepository.save(product));
    }

    public void delete(Long id) {
        productRepository.delete(findProduct(id));
    }

    @Transactional(readOnly = true)
    public java.util.List<LookupResponse> categories() {
        return categoryRepository.findAllByOrderByNameAsc().stream().map(c -> new LookupResponse(c.getId(), c.getName())).toList();
    }

    @Transactional(readOnly = true)
    public java.util.List<LookupResponse> brands() {
        return brandRepository.findAllByOrderByNameAsc().stream().map(b -> new LookupResponse(b.getId(), b.getName())).toList();
    }

    private void apply(Product product, ProductRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid category"));
        Brand brand = brandRepository.findById(request.brandId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid brand"));
        product.setName(request.name().trim());
        product.setSku(request.sku().trim().toUpperCase());
        product.setUnit(request.unit());
        product.setSellingPrice(request.sellingPrice());
        product.setCostPrice(request.costPrice());
        product.setStockQuantity(request.stockQuantity());
        product.setSalesNotes(request.salesNotes());
        product.setCategory(category);
        product.setBrand(brand);
    }

    private Product findProduct(Long id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    private ProductResponse toResponse(Product p) {
        return new ProductResponse(p.getId(), p.getName(), p.getSku(), p.getUnit(), p.getSellingPrice(),
            p.getCostPrice(), p.getStockQuantity(), p.getSalesNotes(), p.getCategory().getId(),
            p.getCategory().getName(), p.getBrand().getId(), p.getBrand().getName());
    }
}
