package com.example.demo.service;

import com.example.demo.request.ChangePasswordRequest;
import com.example.demo.request.LoginRequest;
import com.example.demo.response.UserInfoResponse;

import com.example.demo.repository.UserRepository;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- Xử lý Đăng Nhập (Trả về User gốc để Controller tự kiểm tra) ---
    // Lưu ý: Hàm này chỉ kiểm tra đúng/sai mật khẩu thôi
    public User authenticate(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Tài khoản không tồn tại!");
        }
        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Mật khẩu không đúng!");
        }
        return user;
    }

    // --- Hàm hỗ trợ lấy đường dẫn theo Role ---
    public String getRedirectUrlByRole(Role role) {
        switch (role) {
            case ADMIN:
                return "/admin/dashboard"; // Trang quản trị
            case CVKT:
                return "/khao-thi/quan-ly-dot"; // Trang chuyên viên
            case TROLY:
                return "/tro-ly/nhap-diem"; // Trang trợ lý
            case SINHVIEN:
                return "/sinh-vien/tra-cuu"; // Trang sinh viên
            default:
                return "/home";
        }
    }

    // ... (Giữ nguyên các hàm changePassword, getProfile cũ) ...
    public void changePassword(ChangePasswordRequest request) {
        // ... (Code cũ giữ nguyên) ...
         if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Xác nhận mật khẩu mới không khớp!");
        }
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại!"));
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Mật khẩu cũ không đúng!");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
    
    public UserInfoResponse getProfile(Long userId) {
         // ... (Code cũ giữ nguyên) ...
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));
        // Mặc định profile lấy url theo role
        String url = getRedirectUrlByRole(user.getRole());
        return new UserInfoResponse(user.getId(), user.getUsername(), user.getFullName(), user.getRole().toString(), url);
    }
}