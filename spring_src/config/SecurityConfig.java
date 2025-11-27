package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // 1. Tạo Bean mã hóa mật khẩu BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. Cấu hình đường dẫn (Ai được vào đâu)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Tắt CSRF để test API cho dễ
            .authorizeHttpRequests(auth -> auth
                // Cho phép ai cũng được truy cập vào API đăng nhập
                .requestMatchers("/api/auth/**").permitAll()
                // Các link khác tạm thời cho qua hết để bạn test (sau này sẽ chặn sau)
                .anyRequest().permitAll() 
            );
        return http.build();
    }
}