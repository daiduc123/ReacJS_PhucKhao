package com.example.demo.request;

public class LoginRequest {
    private String username;
    private String password;

    // Constructor rỗng (Bắt buộc để Spring đọc JSON)
    public LoginRequest() {
    }

    // Constructor đầy đủ (Để dễ test)
    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // --- GETTER & SETTER ---
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}