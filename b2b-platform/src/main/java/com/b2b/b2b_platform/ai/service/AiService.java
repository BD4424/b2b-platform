package com.b2b.b2b_platform.ai.service;

import com.b2b.b2b_platform.ai.dto.AiChatRequest;
import com.b2b.b2b_platform.ai.dto.AiChatResponse;
import com.b2b.b2b_platform.ai.tool.*;

import com.openai.client.OpenAIClient;
import com.openai.models.responses.*;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiService {

    private final OpenAIClient openAIClient;
    private final AiToolService aiToolService;

    @Value("${openai.model}")
    private String model;


    public AiChatResponse chat(
            AiChatRequest request
    ) {

        if (
                request.message() == null ||
                        request.message().isBlank()
        ) {
            throw new IllegalArgumentException(
                    "Message is required"
            );
        }

        List<ResponseInputItem> inputs =
                new ArrayList<>();

        inputs.add(
                ResponseInputItem.ofMessage(
                        ResponseInputItem.Message.builder()
                                .addInputTextContent(
                                        request.message().trim()
                                )
                                .role(
                                        ResponseInputItem.Message.Role.USER
                                )
                                .build()
                )
        );


        ResponseCreateParams.Builder builder =
                ResponseCreateParams.builder()

                        .model(model)

                        .instructions("""
                    You are SupplyDesk AI,
                    the business assistant inside the
                    SupplyDesk B2B sales platform.

                    You help authenticated users understand
                    their SupplyDesk business data.

                    IMPORTANT RULES:

                    1. Never invent business data.

                    2. When a question requires SupplyDesk data,
                       use the available tools.

                    3. Never claim that you checked a database
                       directly.

                    4. Only use data returned by SupplyDesk tools.

                    5. Never expose passwords, password hashes,
                       authentication tokens, API keys,
                       database credentials or internal security data.

                    6. Do not perform write operations.
                       The currently available tools are READ ONLY.

                    7. If a requested operation is not available,
                       clearly explain that the operation is not
                       currently supported.

                    8. Keep responses concise and useful.

                    9. For Indian currency, use ₹ where appropriate.

                    10. Do not make up customers, products,
                        orders or leads.
                    """)

                        .addTool(SearchProductsTool.class)
                        .addTool(SearchCustomersTool.class)
                        .addTool(GetCustomerTool.class)
                        .addTool(SearchOrdersTool.class)
                        .addTool(GetOrderTool.class)
                        .addTool(SearchLeadsTool.class)

                        .input(
                                ResponseCreateParams.Input
                                        .ofResponse(inputs)
                        );


        for (int iteration = 0; iteration < 5; iteration++) {

            Response response =
                    openAIClient
                            .responses()
                            .create(
                                    builder.build()
                            );


            boolean hasToolCall = false;


            for (var output : response.output()) {

                if (!output.isFunctionCall()) {
                    continue;
                }

                hasToolCall = true;

                ResponseFunctionToolCall functionCall =
                        output.asFunctionCall();


                Object result =
                        executeTool(functionCall);


                inputs.add(
                        ResponseInputItem
                                .ofFunctionCall(functionCall)
                );


                inputs.add(
                        ResponseInputItem
                                .ofFunctionCallOutput(
                                        ResponseInputItem
                                                .FunctionCallOutput
                                                .builder()
                                                .callId(
                                                        functionCall.callId()
                                                )
                                                .outputAsJson(result)
                                                .build()
                                )
                );
            }


            if (!hasToolCall) {

                String outputText = response.output().stream()
                        .flatMap(item -> item.message().stream())
                        .flatMap(message -> message.content().stream())
                        .flatMap(content -> content.outputText().stream())
                        .map(ResponseOutputText::text)
                        .collect(Collectors.joining());

                return new AiChatResponse(outputText);
            }


            builder.input(
                    ResponseCreateParams.Input
                            .ofResponse(inputs)
            );
        }


        throw new IllegalStateException(
                "AI tool execution exceeded the maximum number of steps"
        );
    }


    private Object executeTool(
            ResponseFunctionToolCall functionCall
    ) {

        return switch (functionCall.name()) {

            case "SearchProductsTool" ->
                    aiToolService.searchProducts(
                            functionCall
                                    .arguments(SearchProductsTool.class)
                                    .query
                    );

            case "SearchCustomersTool" ->
                    aiToolService.searchCustomers(
                            functionCall
                                    .arguments(SearchCustomersTool.class)
                                    .query
                    );

            case "GetCustomerTool" ->
                    aiToolService.getCustomer(
                            functionCall
                                    .arguments(GetCustomerTool.class)
                                    .customerId
                    );

            case "SearchOrdersTool" ->
                    aiToolService.searchOrders(
                            functionCall
                                    .arguments(SearchOrdersTool.class)
                                    .query
                    );

            case "GetOrderTool" ->
                    aiToolService.getOrder(
                            functionCall
                                    .arguments(GetOrderTool.class)
                                    .orderId
                    );

            case "SearchLeadsTool" ->
                    aiToolService.searchLeads(
                            functionCall
                                    .arguments(SearchLeadsTool.class)
                                    .query
                    );

            default ->
                    throw new IllegalArgumentException(
                            "Unknown AI tool: "
                                    + functionCall.name()
                    );
        };
    }
}