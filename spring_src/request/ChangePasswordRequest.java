package com.example.demo.request;

public class ChangePasswordRequest {
    private Long userId;        // ID người dùng
    private String oldPassword; // Mật khẩu cũ
    private String newPassword; // Mật khẩu mới
    private String confirmPassword; // Nhập lại mật khẩu mới (MỚI THÊM)

    public ChangePasswordRequest() {
    }

    // --- GETTER & SETTER ---
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getOldPassword() { return oldPassword; }
    public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    
    // Getter & Setter cho trường mới
    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
}