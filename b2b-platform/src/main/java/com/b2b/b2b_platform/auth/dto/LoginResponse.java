package com.b2b.b2b_platform.auth.dto;

public record LoginResponse(
    String token,
    UserResponse user
) {
}