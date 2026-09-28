package com.b2b.b2b_platform.customer.service;

import com.b2b.b2b_platform.customer.entiy.Customer;
import com.b2b.b2b_platform.customer.repository.CustomerRepository;
import com.b2b.b2b_platform.customer.dto.CustomerRequest;
import com.b2b.b2b_platform.customer.dto.CustomerResponse;
import com.b2b.b2b_platform.payment.repository.PaymentRepository;
import com.b2b.b2b_platform.sales.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    @Transactional(readOnly = true)
    public Page<CustomerResponse> getCustomers(
            int page,
            int size,
            String search
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.ASC, "name")
        );

        Page<Customer> customers;

        if (search == null || search.isBlank()) {
            customers = customerRepository.findAll(pageable);
        } else {
            customers = customerRepository
                    .findByNameContainingIgnoreCase(
                            search.trim(),
                            pageable
                    );
        }

        return customers.map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public CustomerResponse getCustomer(Long id) {
        Customer customer = findCustomer(id);
        return toResponse(customer);
    }

    public CustomerResponse createCustomer(CustomerRequest request) {

        Customer customer = new Customer();

        applyRequest(customer, request);

        customer.setOutstandingAmount(BigDecimal.ZERO);

        return toResponse(
                customerRepository.save(customer)
        );
    }

    public BigDecimal calculateOutstanding(Long customerId) {

        BigDecimal totalOrders =
                orderRepository.getTotalOrderAmountByCustomer(customerId);

        BigDecimal totalPayments =
                paymentRepository.getTotalPaidByCustomer(customerId);

        return totalOrders
                .subtract(totalPayments)
                .max(BigDecimal.ZERO);
    }

    public CustomerResponse updateCustomer(
            Long id,
            CustomerRequest request
    ) {
        Customer customer = findCustomer(id);

        applyRequest(customer, request);

        // Outstanding amount is deliberately not changed here.
        // It will eventually be controlled by sales/payments.

        return toResponse(
                customerRepository.save(customer)
        );
    }

    public void deleteCustomer(Long id) {
        Customer customer = findCustomer(id);

        customerRepository.delete(customer);
    }

    private Customer findCustomer(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer not found: " + id
                        )
                );
    }

    private void applyRequest(
            Customer customer,
            CustomerRequest request
    ) {
        customer.setName(request.name());
        customer.setCustomerType(request.customerType());
        customer.setPhone(request.phone());
        customer.setEmail(request.email());
        customer.setAddress(request.address());
        customer.setCity(request.city());
        customer.setState(request.state());
        customer.setPostalCode(request.postalCode());
        customer.setCreditLimit(
                request.creditLimit() != null
                        ? request.creditLimit()
                        : BigDecimal.ZERO
        );
    }

    private CustomerResponse toResponse(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getCustomerType(),
                customer.getPhone(),
                customer.getEmail(),
                customer.getAddress(),
                customer.getCity(),
                customer.getState(),
                customer.getPostalCode(),
                customer.getCreditLimit(),
                customer.getOutstandingAmount()
        );
    }
}