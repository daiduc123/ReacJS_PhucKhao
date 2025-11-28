package com.example.demo.controller;

import com.example.demo.entity.Role;
import com.example.demo.request.UserRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 1. Tìm kiếm và Lọc
    // GET: /api/admin/users?keyword=...&role=...&active=true
    @GetMapping
    public ResponseEntity<?> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Role role,
            @RequestParam(required = false) Boolean active
    ) {
        return ResponseEntity.ok(userService.search(keyword, role, active));
    }

    // 2. Xem chi tiết
    // GET: /api/admin/users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<?> getDetail(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.getDetail(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 3. Thêm mới User
    // POST: /api/admin/users
    @PostMapping
    public ResponseEntity<?> create(@RequestBody UserRequest req) {
        try {
            userService.createUser(req);
            return ResponseEntity.ok(new MessageResponse("Thêm người dùng thành công!"));
        } catch (RuntimeException e) {
            // Sẽ bắt lỗi "Mật khẩu xác nhận không khớp" ở đây
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 4. Cập nhật User
    // PUT: /api/admin/users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UserRequest req) {
        try {
            userService.updateUser(id, req);
            return ResponseEntity.ok(new MessageResponse("Cập nhật thành công!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 5. Khóa / Mở khóa nhanh
    // PUT: /api/admin/users/{id}/status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> toggleStatus(@PathVariable Long id) {
        try {
            userService.toggleUserStatus(id);
            return ResponseEntity.ok(new MessageResponse("Đã đổi trạng thái tài khoản!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 6. Reset mật khẩu
    // PUT: /api/admin/users/{id}/reset-password
    @PutMapping("/{id}/reset-password")
    public ResponseEntity<?> resetPassword(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String newPass = body.get("password");
            userService.resetPassword(id, newPass);
            return ResponseEntity.ok(new MessageResponse("Đã đặt lại mật khẩu!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 7. Xóa User
    // DELETE: /api/admin/users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(new MessageResponse("Đã xóa người dùng!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}