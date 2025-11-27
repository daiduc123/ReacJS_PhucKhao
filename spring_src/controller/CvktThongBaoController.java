package com.example.demo.controller;

import com.example.demo.request.CreateThongBaoRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.ThongBaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cvkt/thong-bao")
public class CvktThongBaoController {

    @Autowired
    private ThongBaoService thongBaoService;

    // 1. Gửi thông báo (Chỉ được gửi cho Admin hoặc Trợ lý)
    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody CreateThongBaoRequest req) {
        try {
            // Service sẽ check: Nếu gửi cho Sinh viên -> Báo lỗi ngay
            thongBaoService.guiThongBao(req);
            return ResponseEntity.ok(new MessageResponse("CVKT gửi thông báo thành công!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 2. Xem thông báo của CVKT
    @GetMapping("/mine/{userId}")
    public ResponseEntity<?> getMyList(@PathVariable Long userId) {
        return ResponseEntity.ok(thongBaoService.getMyNotifications(userId));
    }
}