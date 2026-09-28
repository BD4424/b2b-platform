package com.b2b.b2b_platform.auth.dto;

public record LoginRequest(
    String email,
    String password
) {
}