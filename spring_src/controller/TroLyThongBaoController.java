package com.example.demo.controller;

import com.example.demo.request.CreateThongBaoRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.ThongBaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tro-ly/thong-bao")
public class TroLyThongBaoController {

    @Autowired
    private ThongBaoService thongBaoService;

    // 1. Gửi thông báo (Chỉ được gửi cho Sinh viên hoặc CVKT)
    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody CreateThongBaoRequest req) {
        try {
            // Service sẽ check: Nếu gửi cho Admin -> Báo lỗi
            thongBaoService.guiThongBao(req);
            return ResponseEntity.ok(new MessageResponse("Trợ lý gửi thông báo thành công!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 2. Xem thông báo của Trợ lý
    @GetMapping("/mine/{userId}")
    public ResponseEntity<?> getMyList(@PathVariable Long userId) {
        return ResponseEntity.ok(thongBaoService.getMyNotifications(userId));
    }
}