package com.b2b.b2b_platform.sales.leads.controller;

import com.b2b.b2b_platform.sales.leads.dto.LeadRequest;
import com.b2b.b2b_platform.sales.leads.dto.LeadResponse;
import com.b2b.b2b_platform.sales.leads.entity.LeadStatus;
import com.b2b.b2b_platform.sales.leads.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;


    @GetMapping
    public Page<LeadResponse> getLeads(

            @RequestParam(defaultValue = "") String search,
            @RequestParam(required = false) LeadStatus status,
            Pageable pageable) {

        return leadService.getLeads(
                search,
                status,
                pageable
        );
    }


    @GetMapping("/{id}")
    public LeadResponse getLead(
            @PathVariable Long id
    ) {
        return leadService.getLead(id);
    }


    @PostMapping
    public LeadResponse createLead(
            @Valid @RequestBody LeadRequest request
    ) {
        return leadService.createLead(
                request
        );
    }


    @PutMapping("/{id}")
    public LeadResponse updateLead(
            @PathVariable Long id,
            @Valid @RequestBody LeadRequest request
    ) {
        return leadService.updateLead(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public void deleteLead(
            @PathVariable Long id
    ) {
        leadService.deleteLead(id);
    }
}