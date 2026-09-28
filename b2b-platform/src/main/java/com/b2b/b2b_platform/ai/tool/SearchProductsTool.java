package com.b2b.b2b_platform.ai.tool;

import com.fasterxml.jackson.annotation.JsonClassDescription;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;

@JsonClassDescription(
    "Search the SupplyDesk product catalog by product name or SKU."
)
public class SearchProductsTool {

    @JsonPropertyDescription(
        "Product name or SKU to search for. Use a short search phrase."
    )
    public String query;
}