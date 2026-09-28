package com.b2b.b2b_platform.customer.repository;

import com.b2b.b2b_platform.customer.entiy.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Page<Customer> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );
}