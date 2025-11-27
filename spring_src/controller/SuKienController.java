package com.example.demo.controller;

import com.example.demo.request.CreateSuKienRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.SuKienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/su-kien")
public class SuKienController {

    @Autowired
    private SuKienService suKienService;

    // 1. API Tạo sự kiện phúc khảo mới
    // URL: POST http://localhost:8081/api/admin/su-kien
    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateSuKienRequest req) {
        try {
            // Gọi service để xử lý (Tạo cha -> Lấy phí -> Tạo con)
            suKienService.createSuKien(req);
            
            return ResponseEntity.ok(new MessageResponse("Tạo đợt phúc khảo thành công! Đã phân bổ về các học phần."));
        } catch (RuntimeException e) {
            // Bắt lỗi nếu có (ví dụ: lỗi convert Enum, lỗi DB...)
            return ResponseEntity.badRequest().body(new MessageResponse("Lỗi: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Lỗi hệ thống: " + e.getMessage()));
        }
    }
}