package com.b2b.b2b_platform.customer.entiy;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(
    name = "customers",
    indexes = {
        @Index(name = "idx_customers_name", columnList = "name"),
        @Index(name = "idx_customers_phone", columnList = "phone"),
        @Index(name = "idx_customers_email", columnList = "email")
    }
)
@Getter
@Setter
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(name = "customer_type", nullable = false, length = 50)
    private String customerType;

    @Column(length = 50)
    private String phone;

    @Column(length = 150)
    private String email;

    @Column(length = 500)
    private String address;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(name = "postal_code", length = 20)
    private String postalCode;

    @Column(name = "credit_limit", precision = 15, scale = 2, nullable = false)
    private BigDecimal creditLimit = BigDecimal.ZERO;

    @Column(name = "outstanding_amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal outstandingAmount = BigDecimal.ZERO;
}