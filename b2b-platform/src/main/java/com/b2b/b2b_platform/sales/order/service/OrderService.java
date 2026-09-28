package com.b2b.b2b_platform.sales.order.service;

import com.b2b.b2b_platform.customer.entiy.Customer;
import com.b2b.b2b_platform.customer.repository.CustomerRepository;
import com.b2b.b2b_platform.customer.service.CustomerService;
import com.b2b.b2b_platform.product.entity.Product;
import com.b2b.b2b_platform.product.repository.ProductRepository;
import com.b2b.b2b_platform.sales.order.entity.Order;
import com.b2b.b2b_platform.sales.order.entity.OrderItem;
import com.b2b.b2b_platform.sales.order.dto.*;
import com.b2b.b2b_platform.sales.order.util.OrderDiscountType;
import com.b2b.b2b_platform.sales.order.util.OrderStatus;
import com.b2b.b2b_platform.sales.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final CustomerService customerService;

    @Transactional(readOnly = true)
    public Page<OrderResponse> getOrders(
            int page,
            int size,
            String search
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(
                        Sort.Direction.DESC,
                        "orderDate"
                )
        );

        Page<Order> orders;

        if (search == null || search.isBlank()) {
            orders = orderRepository.findAllByOrderByCreatedAtDesc(pageable);
        } else {
            orders = orderRepository
                    .findByOrderNumberContainingIgnoreCaseOrderByCreatedAtDesc(
                            search.trim(),
                            pageable
                    );
        }

        return orders.map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrder(Long id) {
        return toResponse(findOrder(id));
    }

    public OrderResponse createOrder(OrderRequest request) {

        Customer customer = customerRepository.findById(request.customerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Order order = new Order();

        order.setOrderNumber(generateOrderNumber());
        order.setCustomer(customer);
        order.setOrderDate(request.orderDate());
        order.setStatus(OrderStatus.PENDING);

        order.setDiscountType(request.discountType());
        order.setDiscountValue(request.discountValue());
        order.setNotes(request.notes());

        List<OrderItem> items = buildItems(order, request.items());

        order.setItems(items);

        calculateTotals(order);

        Order saved = orderRepository.save(order);

        customer.setOutstandingAmount(customerService.calculateOutstanding(request.customerId()));
        try {
            customerRepository.save(customer);
        } catch (Exception e) {
            throw new RuntimeException("Unable to update customer details");
        }


        return toResponse(saved);
    }

    public OrderResponse updateOrder(
            Long id,
            OrderRequest request
    ) {
        Order order = findOrder(id);

        if (order.getStatus() != OrderStatus.PENDING) {
            throw  new IllegalStateException(
                    "Only pending orders can be edited."
            );
        }

        Customer customer = customerRepository
                .findById(request.customerId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer not found: "
                                        + request.customerId()
                        )
                );

        order.setCustomer(customer);
        order.setOrderDate(request.orderDate());

        order.setDiscountType(request.discountType());
        order.setDiscountValue(request.discountValue());

        order.setNotes(request.notes());

        order.getItems().clear();

        List<OrderItem> items = buildItems(order, request.items());
        order.getItems().addAll(items);

        calculateTotals(order);

        CustomerCreditResponse credit =
                getCustomerCredit(
                        customer.getId(),
                        order.getTotalAmount()
                );

        Order saved = orderRepository.save(order);

        customer.setOutstandingAmount(customerService.calculateOutstanding(credit.customerId()));
        customerRepository.save(customer);

        return toResponse(saved, credit);
    }

    public OrderResponse updateStatus(Long id, OrderStatus newStatus) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderStatus currentStatus = order.getStatus();

        if (currentStatus == newStatus) {
            return toResponse(order);
        }

        boolean validTransition = switch (currentStatus) {

            case PENDING ->
                    newStatus == OrderStatus.CONFIRMED
                            || newStatus == OrderStatus.CANCELLED;

            case CONFIRMED ->
                    newStatus == OrderStatus.COMPLETED
                            || newStatus == OrderStatus.CANCELLED;

            case COMPLETED, CANCELLED ->
                    false;
        };

        if (!validTransition) {
            throw new IllegalStateException(
                    "Cannot change order status from "
                            + currentStatus
                            + " to "
                            + newStatus
            );
        }

        order.setStatus(newStatus);

        Order saved = orderRepository.save(order);

        if (newStatus == OrderStatus.COMPLETED) {

            List<Product> productsToUpdate =
                    saved.getItems()
                            .stream()
                            .map(orderItem -> {

                                Product product =
                                        orderItem.getProduct();

                                BigDecimal orderQuantity =
                                        orderItem.getQuantity();

                                // Product inventory is stored as Integer,
                                // so completed orders must use whole quantities.
                                if (orderQuantity.stripTrailingZeros().scale() > 0) {
                                    throw new RuntimeException(
                                            "Product quantity must be a whole number for: "
                                                    + product.getName()
                                    );
                                }

                                int quantity =
                                        orderQuantity.intValueExact();

                                int currentStock =
                                        product.getStockQuantity() != null
                                                ? product.getStockQuantity()
                                                : 0;

                                int remainingStock =
                                        currentStock - quantity;

                                if (remainingStock < 0) {
                                    throw new RuntimeException(
                                            "Insufficient stock for product: "
                                                    + product.getName()
                                                    + ". Available: "
                                                    + currentStock
                                                    + ", required: "
                                                    + quantity
                                    );
                                }

                                product.setStockQuantity(
                                        remainingStock
                                );

                                return product;
                            })
                            .toList();

            productRepository.saveAll(productsToUpdate);
        }

        return toResponse(saved);
    }

    public void deleteOrder(Long id) {

        Order order = findOrder(id);

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException(
                    "Only pending orders can be deleted."
            );
        }

        orderRepository.delete(order);
    }

    private Order findOrder(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found: " + id
                        )
                );
    }

    private String generateOrderNumber() {

        String orderNumber;

        do {
            orderNumber =
                    "ORD-" +
                    LocalDate.now()
                            .toString()
                            .replace("-", "") +
                    "-" +
                    String.format(
                            "%04d",
                            (int) (
                                    Math.random() * 10000
                            )
                    );

        } while (
                orderRepository.existsByOrderNumber(
                        orderNumber
                )
        );

        return orderNumber;
    }

    private OrderResponse toResponse(Order order) {

        CustomerCreditResponse credit =
                getCustomerCredit(
                        order.getCustomer().getId(),
                        BigDecimal.ZERO
                );

        return toResponse(order, credit);
    }

    private OrderResponse toResponse(
            Order order,
            CustomerCreditResponse credit
    ) {

        List<OrderItemResponse> items =
                order.getItems()
                        .stream()
                        .map(item -> new OrderItemResponse(
                                item.getId(),
                                item.getProduct().getId(),
                                item.getProduct().getName(),
                                item.getProduct().getSku(),
                                item.getQuantity(),
                                item.getUnitPrice(),
                                item.getLineTotal()
                        ))
                        .toList();

        return new OrderResponse(

                order.getId(),
                order.getOrderNumber(),

                order.getCustomer().getId(),
                order.getCustomer().getName(),

                order.getOrderDate(),
                order.getStatus(),

                order.getSubtotal(),

                order.getDiscountType(),
                order.getDiscountValue(),
                order.getDiscountAmount(),

                order.getTotalAmount(),

                // Payment fields
                BigDecimal.ZERO,

                // Credit
                credit.creditLimit(),
                credit.availableCredit(),

                credit.creditExceeded(),
                credit.creditLow(),

                order.getTotalAmount(),

                order.getNotes(),

                items
        );
    }

    public CustomerCreditResponse getCustomerCredit(
            Long customerId,
            BigDecimal orderAmount
    ) {

        Customer customer = customerRepository
                .findById(customerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer not found: " + customerId
                        )
                );

        BigDecimal creditLimit =
                customer.getCreditLimit() != null
                        ? customer.getCreditLimit()
                        : BigDecimal.ZERO;

        BigDecimal currentOutstanding = customerService.calculateOutstanding(customerId);

        BigDecimal availableCredit =
                creditLimit.subtract(currentOutstanding);

        BigDecimal amount =
                orderAmount != null
                        ? orderAmount
                        : BigDecimal.ZERO;

        BigDecimal availableAfterOrder =
                availableCredit.subtract(amount);

        boolean creditExceeded =
                availableAfterOrder.compareTo(BigDecimal.ZERO) < 0;

        /*
         * Low credit means less than 10% of the credit
         * limit remains after considering the order.
         */
        BigDecimal tenPercent =
                creditLimit
                        .multiply(BigDecimal.valueOf(10))
                        .divide(
                                BigDecimal.valueOf(100),
                                2,
                                RoundingMode.HALF_UP
                        );

        boolean creditLow =
                !creditExceeded
                        && availableAfterOrder.compareTo(tenPercent) < 0;

        return new CustomerCreditResponse(
                customer.getId(),
                creditLimit,
                currentOutstanding,
                availableCredit,
                amount,
                availableAfterOrder,
                creditExceeded,
                creditLow
        );
    }

    private void calculateTotals(Order order) {

        BigDecimal subtotal = order.getItems()
                .stream()
                .map(OrderItem::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setSubtotal(subtotal);

        BigDecimal discountValue = order.getDiscountValue();

        if (discountValue == null || discountValue.compareTo(BigDecimal.ZERO) < 0) {
            discountValue = BigDecimal.ZERO;
        }

        OrderDiscountType discountType = order.getDiscountType();

        if (discountType == null) {
            discountType = OrderDiscountType.AMOUNT;
            order.setDiscountType(discountType);
        }

        BigDecimal discountAmount;

        if (discountType == OrderDiscountType.PERCENTAGE) {

            if (discountValue.compareTo(BigDecimal.valueOf(100)) > 0) {
                discountValue = BigDecimal.valueOf(100);
                order.setDiscountValue(discountValue);
            }

            discountAmount = subtotal
                    .multiply(discountValue)
                    .divide(
                            BigDecimal.valueOf(100),
                            2,
                            RoundingMode.HALF_UP
                    );

        } else {

            discountAmount = discountValue;
        }

        // Discount can never exceed subtotal
        if (discountAmount.compareTo(subtotal) > 0) {
            discountAmount = subtotal;
        }

        order.setDiscountAmount(discountAmount);

        BigDecimal total = subtotal.subtract(discountAmount);

        if (total.compareTo(BigDecimal.ZERO) < 0) {
            total = BigDecimal.ZERO;
        }

        order.setTotalAmount(total);
    }

    private List<OrderItem> buildItems(
            Order order,
            List<OrderItemRequest> itemRequests
    ) {
        return itemRequests.stream()
                .map(request -> {

                    Product product = productRepository.findById(request.productId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Product not found: " + request.productId()
                                    )
                            );

                    BigDecimal quantity = request.quantity();
                    BigDecimal unitPrice = request.unitPrice();

                    BigDecimal lineTotal = quantity.multiply(unitPrice);

                    OrderItem item = new OrderItem();

                    item.setOrder(order);
                    item.setProduct(product);
                    item.setQuantity(quantity);
                    item.setUnitPrice(unitPrice);
                    item.setLineTotal(lineTotal);

                    return item;
                })
                .toList();
    }
}