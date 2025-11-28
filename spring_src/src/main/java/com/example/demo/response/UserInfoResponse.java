package com.example.demo.response;

public class UserInfoResponse {
    private Long id;
    private String username;
    private String fullName;
    private String role;
    private String redirectUrl; // <--- MỚI THÊM: Địa chỉ chuyển hướng

    public UserInfoResponse() {
    }

    public UserInfoResponse(Long id, String username, String fullName, String role, String redirectUrl) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.role = role;
        this.redirectUrl = redirectUrl;
    }

    // --- GETTER & SETTER ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getRedirectUrl() { return redirectUrl; } // <--- Getter mới
    public void setRedirectUrl(String redirectUrl) { this.redirectUrl = redirectUrl; } // <--- Setter mới
}