package com.example.demo.controller;

import com.example.demo.request.ChangePasswordRequest;
import com.example.demo.request.LoginRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.response.UserInfoResponse;
import com.example.demo.service.AuthService;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // ==========================================
    // 1. ĐĂNG NHẬP DÀNH RIÊNG CHO SINH VIÊN
    // ==========================================
    @PostMapping("/login-student")
    public ResponseEntity<?> loginStudent(@RequestBody LoginRequest loginRequest) {
        try {
            // 1. Xác thực tài khoản
            User user = authService.authenticate(loginRequest);

            // 2. CHẶN NẾU KHÔNG PHẢI SINH VIÊN
            if (user.getRole() != Role.SINHVIEN) {
                return ResponseEntity.badRequest().body(new MessageResponse("Cổng này chỉ dành cho Sinh viên!"));
            }

            // 3. Trả về kết quả kèm URL của sinh viên
            String url = authService.getRedirectUrlByRole(Role.SINHVIEN);
            
            return ResponseEntity.ok(new UserInfoResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getFullName(),
                    user.getRole().toString(),
                    url // -> "/sinh-vien/tra-cuu"
            ));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // ==========================================
    // 2. ĐĂNG NHẬP DÀNH CHO CÁN BỘ (ADMIN, CVKT, TRỢ LÝ)
    // ==========================================
    @PostMapping("/login-staff")
    public ResponseEntity<?> loginStaff(@RequestBody LoginRequest loginRequest) {
        try {
            // 1. Xác thực tài khoản
            User user = authService.authenticate(loginRequest);

            // 2. CHẶN NẾU LÀ SINH VIÊN
            if (user.getRole() == Role.SINHVIEN) {
                return ResponseEntity.badRequest().body(new MessageResponse("Sinh viên không được truy cập cổng Cán bộ!"));
            }

            // 3. Tự động lấy URL dựa trên chức vụ (Role)
            String url = authService.getRedirectUrlByRole(user.getRole());

            return ResponseEntity.ok(new UserInfoResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getFullName(),
                    user.getRole().toString(),
                    url // Sẽ trả về url khác nhau tùy theo là Admin hay Trợ lý
            ));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // --- 3. ĐỔI MẬT KHẨU (Dùng chung) ---
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            authService.changePassword(request);
            return ResponseEntity.ok(new MessageResponse("Đổi mật khẩu thành công!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // --- 4. XEM PROFILE ---
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(authService.getProfile(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}
