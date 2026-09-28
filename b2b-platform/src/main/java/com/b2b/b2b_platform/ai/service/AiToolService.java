package com.b2b.b2b_platform.ai.service;

import com.b2b.b2b_platform.ai.dto.*;
import com.b2b.b2b_platform.customer.dto.CustomerResponse;
import com.b2b.b2b_platform.customer.service.CustomerService;
import com.b2b.b2b_platform.product.dto.ProductResponse;
import com.b2b.b2b_platform.product.service.ProductService;
import com.b2b.b2b_platform.sales.leads.dto.LeadResponse;
import com.b2b.b2b_platform.sales.leads.service.LeadService;
import com.b2b.b2b_platform.sales.order.dto.OrderResponse;
import com.b2b.b2b_platform.sales.order.service.OrderService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AiToolService {

    private final ProductService productService;
    private final CustomerService customerService;
    private final OrderService orderService;
    private final LeadService leadService;


    public List<AiProduct> searchProducts(String query) {

        String search =
            query == null ? "" : query.trim();

        var pageable = PageRequest.of(
            0,
            10,
            Sort.by(
                Sort.Direction.ASC,
                "name"
            )
        );

        List<ProductResponse> products =
            productService
                .search(
                    search,
                    null,
                    null,
                    pageable
                )
                .getContent();

        return products.stream()
            .map(product -> new AiProduct(
                product.id(),
                product.name(),
                product.sku(),
                product.unit(),
                product.sellingPrice(),
                product.stockQuantity(),
                product.categoryName(),
                product.brandName()
            ))
            .toList();
    }


    public List<AiCustomer> searchCustomers(String query) {

        String search =
            query == null ? "" : query.trim();

        var page =
            customerService.getCustomers(
                0,
                10,
                search
            );

        return page.getContent()
            .stream()
            .map(customer ->
                new AiCustomer(
                    customer.id(),
                    customer.name(),
                    customer.customerType(),
                    customer.city(),
                    customer.state(),
                    customer.creditLimit(),
                    customer.outstandingAmount()
                )
            )
            .toList();
    }


    public AiCustomer getCustomer(Long customerId) {

        CustomerResponse customer =
            customerService.getCustomer(customerId);

        return new AiCustomer(
            customer.id(),
            customer.name(),
            customer.customerType(),
            customer.city(),
            customer.state(),
            customer.creditLimit(),
            customer.outstandingAmount()
        );
    }


    public List<AiOrder> searchOrders(String query) {

        String search =
            query == null ? "" : query.trim();

        var page =
            orderService.getOrders(
                0,
                10,
                search
            );

        return page.getContent()
            .stream()
            .map(this::toAiOrder)
            .toList();
    }


    public AiOrder getOrder(Long orderId) {

        OrderResponse order =
            orderService.getOrder(orderId);

        return toAiOrder(order);
    }


    public List<AiLead> searchLeads(String query) {

        String search =
            query == null ? "" : query.trim();

        var pageable =
            PageRequest.of(
                0,
                10,
                Sort.by(
                    Sort.Direction.DESC,
                    "createdAt"
                )
            );

        List<LeadResponse> leads =
            leadService
                .getLeads(
                    search,
                    null,
                    pageable
                )
                .getContent();

        return leads.stream()
            .map(lead ->
                new AiLead(
                    lead.id(),
                    lead.name(),
                    lead.company(),
                    lead.status() != null
                        ? lead.status().name()
                        : null,
                    lead.source().name(),
                    lead.expectedValue(),
                    lead.expectedCloseDate()
                )
            )
            .toList();
    }


    private AiOrder toAiOrder(
        OrderResponse order
    ) {

        return new AiOrder(
            order.id(),
            order.orderNumber(),
            order.customerName(),
            order.orderDate(),
            order.status() != null
                ? order.status().name()
                : null,
            order.subtotal(),
            order.discountAmount(),
            order.totalAmount()
        );
    }
}