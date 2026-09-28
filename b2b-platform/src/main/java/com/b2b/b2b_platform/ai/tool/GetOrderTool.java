package com.b2b.b2b_platform.ai.tool;

import com.fasterxml.jackson.annotation.JsonClassDescription;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;

@JsonClassDescription(
    "Get detailed information about a specific SupplyDesk order."
)
public class GetOrderTool {

    @JsonPropertyDescription(
        "The numeric ID of the order."
    )
    public Long orderId;
}