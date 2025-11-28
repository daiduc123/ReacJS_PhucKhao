package com.example.demo.controller;

import com.example.demo.entity.CauHinhHeThong;
import com.example.demo.request.ConfigCostPaymentRequest;
import com.example.demo.request.ConfigTimeRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/admin/config")
public class ConfigController {

    @Autowired
    private ConfigService configService;

    // Lấy thông tin cấu hình (để hiển thị lên màn hình)
    @GetMapping
    public ResponseEntity<CauHinhHeThong> getConfig() {
        return ResponseEntity.ok(configService.getConfig());
    }

    // Cập nhật Chi phí & Thanh toán (Dùng Multipart để gửi cả Text và File)
    @PutMapping(value = "/cost-payment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateCostAndPayment(
            @RequestParam(value = "chiPhiMacDinh", required = false) BigDecimal chiPhiMacDinh,
            @RequestParam(value = "tenTk", required = false) String tenTk,
            @RequestParam(value = "soTk", required = false) String soTk,
            @RequestParam(value = "nganHang", required = false) String nganHang,
            @RequestParam(value = "qrCodeFile", required = false) MultipartFile qrCodeFile
    ) {
        try {
            // Đóng gói dữ liệu text vào Request Object
            ConfigCostPaymentRequest req = new ConfigCostPaymentRequest();
            req.setChiPhiMacDinh(chiPhiMacDinh);
            req.setTenTk(tenTk);
            req.setSoTk(soTk);
            req.setNganHang(nganHang);

            // Gọi Service
            CauHinhHeThong result = configService.updateCostAndPayment(req, qrCodeFile);
            
            return ResponseEntity.ok(result);

        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Lỗi upload ảnh: " + e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
    
    // API: PUT /api/admin/config/time
    @PutMapping("/time")
    public ResponseEntity<?> updateTime(@RequestBody ConfigTimeRequest req) {
        try {
            configService.updateTime(req);
            return ResponseEntity.ok(new MessageResponse("Cập nhật thời gian thành công!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}