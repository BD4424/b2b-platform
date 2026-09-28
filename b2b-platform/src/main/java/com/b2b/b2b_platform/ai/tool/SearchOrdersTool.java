package com.b2b.b2b_platform.ai.tool;

import com.fasterxml.jackson.annotation.JsonClassDescription;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;

@JsonClassDescription(
    "Search SupplyDesk orders by order number."
)
public class SearchOrdersTool {

    @JsonPropertyDescription(
        "Order number or part of the order number, for example ORD-20260928."
    )
    public String query;
}