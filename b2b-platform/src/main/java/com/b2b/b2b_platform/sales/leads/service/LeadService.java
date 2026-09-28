package com.b2b.b2b_platform.sales.leads.service;

import com.b2b.b2b_platform.sales.leads.dto.LeadRequest;
import com.b2b.b2b_platform.sales.leads.dto.LeadResponse;
import com.b2b.b2b_platform.sales.leads.entity.Lead;
import com.b2b.b2b_platform.sales.leads.entity.LeadStatus;
import com.b2b.b2b_platform.sales.leads.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;


    public Page<LeadResponse> getLeads(
            String search,
            LeadStatus status,
            Pageable pageable
    ) {

        Page<Lead> leads;

        if (status != null) {

            leads = leadRepository
                    .findByStatusOrderByCreatedAtDesc(
                            status,
                            pageable
                    );

        } else if (search != null && !search.isBlank()) {

            String value = search.trim();

            leads = leadRepository
                    .findByNameContainingIgnoreCaseOrCompanyContainingIgnoreCaseOrderByCreatedAtDesc(
                            value,
                            value,
                            pageable
                    );

        } else {

            leads = leadRepository
                    .findAllByOrderByCreatedAtDesc(pageable);
        }

        return leads.map(this::toResponse);
    }


    public LeadResponse getLead(Long id) {

        return toResponse(
                findLead(id)
        );
    }


    public LeadResponse createLead(
            LeadRequest request
    ) {

        Lead lead = new Lead();

        applyRequest(
                lead,
                request
        );

        if (lead.getStatus() == null) {
            lead.setStatus(LeadStatus.NEW);
        }

        Lead saved =
                leadRepository.save(lead);

        return toResponse(saved);
    }


    public LeadResponse updateLead(
            Long id,
            LeadRequest request
    ) {

        Lead lead =
                findLead(id);

        applyRequest(
                lead,
                request
        );

        Lead saved =
                leadRepository.save(lead);

        return toResponse(saved);
    }


    public void deleteLead(Long id) {

        Lead lead =
                findLead(id);

        leadRepository.delete(lead);
    }


    private void applyRequest(
            Lead lead,
            LeadRequest request
    ) {

        lead.setName(
                request.name().trim()
        );

        lead.setCompany(
                clean(request.company())
        );

        lead.setPhone(
                clean(request.phone())
        );

        lead.setEmail(
                clean(request.email())
        );

        if (request.status() != null) {
            lead.setStatus(
                    request.status()
            );
        }

        lead.setSource(
                request.source()
        );

        lead.setExpectedValue(
                request.expectedValue() != null
                        ? request.expectedValue()
                        : java.math.BigDecimal.ZERO
        );

        lead.setExpectedCloseDate(
                request.expectedCloseDate()
        );

        lead.setNotes(
                clean(request.notes())
        );
    }


    private Lead findLead(Long id) {

        return leadRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Lead not found: " + id
                        )
                );
    }


    private LeadResponse toResponse(
            Lead lead
    ) {

        return new LeadResponse(

                lead.getId(),
                lead.getName(),
                lead.getCompany(),
                lead.getPhone(),
                lead.getEmail(),
                lead.getStatus(),
                lead.getSource(),
                lead.getExpectedValue(),
                lead.getExpectedCloseDate(),
                lead.getNotes(),
                lead.getCreatedAt(),
                lead.getUpdatedAt()
        );
    }


    private String clean(String value) {

        if (value == null) {
            return null;
        }

        String trimmed = value.trim();

        return trimmed.isEmpty()
                ? null
                : trimmed;
    }
}