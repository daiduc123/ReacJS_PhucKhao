package com.example.demo.request;

import com.example.demo.entity.Role;

public class UserRequest {
    private String username;        // Mã đăng nhập
    private String fullName;        // Họ và tên
    private String email;           // Email
    private String phone;           // Số điện thoại
    private String password;        // Mật khẩu
    private String confirmPassword; // Xác nhận mật khẩu (MỚI THÊM)
    private Role role;              // Vai trò

    // (Biến active không cần nhập ở form này, mặc định là True)
    private Boolean active; 

    public UserRequest() {}

    // --- GETTER & SETTER ---
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}