package com.b2b.b2b_platform.ai.tool;

import com.fasterxml.jackson.annotation.JsonClassDescription;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;

@JsonClassDescription(
    "Search SupplyDesk sales leads by lead name or company."
)
public class SearchLeadsTool {

    @JsonPropertyDescription(
        "Lead name or company name to search for."
    )
    public String query;
}