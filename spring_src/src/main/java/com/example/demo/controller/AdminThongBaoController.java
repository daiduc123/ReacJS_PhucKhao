package com.example.demo.controller;

import com.example.demo.request.CreateThongBaoRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.ThongBaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/thong-bao")
public class AdminThongBaoController {

    @Autowired
    private ThongBaoService thongBaoService;

    // 1. Gửi thông báo (Admin gửi cho ai cũng được)
    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody CreateThongBaoRequest req) {
        try {
            // Service đã có logic check role, nhưng Admin luôn qua được
            thongBaoService.guiThongBao(req);
            return ResponseEntity.ok(new MessageResponse("Admin gửi thông báo thành công!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 2. Xem thông báo của Admin
    @GetMapping("/mine/{userId}")
    public ResponseEntity<?> getMyList(@PathVariable Long userId) {
        return ResponseEntity.ok(thongBaoService.getMyNotifications(userId));
    }
}