package com.b2b.b2b_platform.auth.conroller;

import com.b2b.b2b_platform.auth.dto.*;
import com.b2b.b2b_platform.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(
        @RequestBody LoginRequest request
    ) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {

        return authService.getCurrentUser(
            authentication.getName()
        );
    }

    @PostMapping("/change-password")
    public void changePassword(
        Authentication authentication,
        @RequestBody ChangePasswordRequest request
    ) {

        authService.changePassword(
            authentication.getName(),
            request
        );
    }

    @PostMapping("/logout")
    public void logout() {
        /*
         * JWT is stateless.
         * The Angular client removes the token.
         */
    }
}