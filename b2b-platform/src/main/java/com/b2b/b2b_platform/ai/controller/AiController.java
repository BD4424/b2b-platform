package com.b2b.b2b_platform.ai.controller;

import com.b2b.b2b_platform.ai.dto.AiChatRequest;
import com.b2b.b2b_platform.ai.dto.AiChatResponse;
import com.b2b.b2b_platform.ai.service.AiService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    public AiChatResponse chat(
        Authentication authentication,
        @RequestBody AiChatRequest request
    ) {

        return aiService.chat(request);
    }
}