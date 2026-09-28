package com.b2b.b2b_platform.ai.tool;

import com.fasterxml.jackson.annotation.JsonClassDescription;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;

@JsonClassDescription(
    "Search SupplyDesk customers by customer name."
)
public class SearchCustomersTool {

    @JsonPropertyDescription(
        "Customer name or part of the customer name."
    )
    public String query;
}