package com.example.demo.controller;

import com.example.demo.response.MessageResponse;
import com.example.demo.service.ThongBaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sinh-vien/thong-bao")
public class SinhVienThongBaoController {

    @Autowired
    private ThongBaoService thongBaoService;

    // --- SINH VIÊN KHÔNG CÓ API "/send" ---

    // 1. Chỉ được xem thông báo của mình
    @GetMapping("/mine/{userId}")
    public ResponseEntity<?> getMyList(@PathVariable Long userId) {
        return ResponseEntity.ok(thongBaoService.getMyNotifications(userId));
    }

    // 2. Đọc chi tiết
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getDetail(@PathVariable Long id, @RequestParam Long userId) {
        try {
            return ResponseEntity.ok(thongBaoService.docChiTiet(id, userId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}