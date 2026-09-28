package com.b2b.b2b_platform.auth.service;

import com.b2b.b2b_platform.auth.dto.*;
import com.b2b.b2b_platform.auth.entity.User;
import com.b2b.b2b_platform.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {

        if (request.email() == null || request.email().isBlank()
            || request.password() == null || request.password().isBlank()) {

            throw new IllegalArgumentException("Email and password are required");
        }

        User user = userRepository
            .findByEmailIgnoreCase(request.email().trim())
            .orElseThrow(() ->
                new IllegalArgumentException("Invalid email or password")
            );

        if (!user.isEnabled()) {
            throw new IllegalArgumentException("Account is disabled");
        }

        if (!passwordEncoder.matches(
            request.password(),
            user.getPasswordHash()
        )) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(
            token,
            toResponse(user)
        );
    }

    public UserResponse getCurrentUser(String email) {

        User user = userRepository
            .findByEmailIgnoreCase(email)
            .orElseThrow(() ->
                new IllegalArgumentException("User not found")
            );

        return toResponse(user);
    }

    @Transactional
    public void changePassword(
        String email,
        ChangePasswordRequest request
    ) {

        User user = userRepository
            .findByEmailIgnoreCase(email)
            .orElseThrow(() ->
                new IllegalArgumentException("User not found")
            );

        if (!passwordEncoder.matches(
            request.currentPassword(),
            user.getPasswordHash()
        )) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        if (request.newPassword() == null
            || request.newPassword().length() < 8) {

            throw new IllegalArgumentException(
                "New password must contain at least 8 characters"
            );
        }

        user.setPasswordHash(
            passwordEncoder.encode(request.newPassword())
        );

        userRepository.save(user);
    }

    private UserResponse toResponse(User user) {

        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPhone(),
            user.getRole().name()
        );
    }
}