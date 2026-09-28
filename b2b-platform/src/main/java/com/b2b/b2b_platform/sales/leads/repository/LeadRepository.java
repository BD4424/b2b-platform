package com.b2b.b2b_platform.sales.leads.repository;

import com.b2b.b2b_platform.sales.leads.entity.Lead;
import com.b2b.b2b_platform.sales.leads.entity.LeadStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository
        extends JpaRepository<Lead, Long> {

    Page<Lead> findByNameContainingIgnoreCaseOrCompanyContainingIgnoreCaseOrderByCreatedAtDesc(
            String name,
            String company,
            Pageable pageable
    );

    Page<Lead> findAllByOrderByCreatedAtDesc(
            Pageable pageable
    );

    Page<Lead> findByStatusOrderByCreatedAtDesc(
            LeadStatus status,
            Pageable pageable
    );
}