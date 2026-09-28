package com.b2b.b2b_platform.auth.dto;

public record UserResponse(
    Long id,
    String name,
    String email,
    String phone,
    String role
) {
}