package com.b2b.b2b_platform.ai.tool;

import com.fasterxml.jackson.annotation.JsonClassDescription;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;

@JsonClassDescription(
    "Get detailed business information about a specific SupplyDesk customer."
)
public class GetCustomerTool {

    @JsonPropertyDescription(
        "The numeric ID of the customer."
    )
    public Long customerId;
}