package com.b2b.b2b_platform.auth.config;

import com.b2b.b2b_platform.auth.entity.Role;
import com.b2b.b2b_platform.auth.entity.User;
import com.b2b.b2b_platform.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AuthDataInitializer {

    @Bean
    CommandLineRunner createDefaultAdmin(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
    ) {
        return args -> {

            String email = "admin@b2b.local";

            if (userRepository.existsByEmailIgnoreCase(email)) {
                return;
            }

            User admin = new User();

            admin.setName("B D Prabhutosh");
            admin.setEmail(email);
            admin.setPhone("");
            admin.setPasswordHash(
                passwordEncoder.encode("Admin@123")
            );
            admin.setRole(Role.ADMIN);
            admin.setEnabled(true);

            userRepository.save(admin);
        };
    }
}