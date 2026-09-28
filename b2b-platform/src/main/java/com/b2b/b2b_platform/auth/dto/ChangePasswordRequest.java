package com.b2b.b2b_platform.auth.dto;

public record ChangePasswordRequest(
    String currentPassword,
    String newPassword
) {
}