package com.b2b.b2b_platform.sales.order.controller;

import com.b2b.b2b_platform.sales.order.dto.CustomerCreditResponse;
import com.b2b.b2b_platform.sales.order.dto.OrderRequest;
import com.b2b.b2b_platform.sales.order.dto.OrderResponse;
import com.b2b.b2b_platform.sales.order.dto.OrderStatusRequest;
import com.b2b.b2b_platform.sales.order.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public Page<OrderResponse> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search
    ) {
        return orderService.getOrders(page,size,search);
    }

    @GetMapping("/{id}")
    public OrderResponse getOrder(
            @PathVariable Long id
    ) {
        return orderService.getOrder(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(
            @Valid @RequestBody OrderRequest request
    ) {
        return orderService.createOrder(request);
    }

    @PutMapping("/{id}")
    public OrderResponse updateOrder(
            @PathVariable Long id,
            @Valid @RequestBody OrderRequest request
    ) {
        return orderService.updateOrder(id,request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(
            @PathVariable Long id
    ) {
        orderService.deleteOrder(id);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderStatusRequest request
    ) {
        return ResponseEntity.ok(
                orderService.updateStatus(id, request.status())
        );
    }

    @GetMapping("/credit")
    public CustomerCreditResponse getCustomerCredit(
            @RequestParam Long customerId,
            @RequestParam(defaultValue = "0") BigDecimal orderAmount
    ) {
        return orderService.getCustomerCredit(customerId,orderAmount);
    }
}