package com.example.demo.controller;

import com.example.demo.entity.CauHinhHeThong;
import com.example.demo.repository.CauHinhRepository;
import com.example.demo.request.SubmitAppealRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.SinhVienService;
import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/appeal")
public class AppealController {

    @Autowired
    private SinhVienService sinhVienService;
    @Autowired 
    private CauHinhRepository configRepo;

    // API Nộp đơn
    // POST: http://localhost:8081/api/student/appeal/submit
    
    // GET: /api/student/appeal/payment-info?amount=90000&studentCode=SV001
    @GetMapping("/payment-info")
    public ResponseEntity<?> getPaymentQr(@RequestParam BigDecimal amount, @RequestParam String studentCode) {
        // 1. Lấy cấu hình ngân hàng từ Admin
        CauHinhHeThong config = configRepo.findById(1L).orElseThrow();
        
        if (config.getNganHang() == null || config.getSoTk() == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Admin chưa cấu hình tài khoản ngân hàng!"));
        }

        // 2. Tạo nội dung chuyển khoản: "SV001 NOP PHUC KHAO"
        String noiDung = studentCode + " NOP PHUC KHAO";
        
        // 3. Tạo link QR VietQR (Cấu trúc: https://img.vietqr.io/image/<BANK>-<ACC>-compact.png?amount=<AMT>&addInfo=<MSG>)
        // Lưu ý: Tên ngân hàng cần đúng mã (VD: MB, VCB, ACB...) - Admin phải nhập đúng mã này
        String qrUrl = String.format("https://img.vietqr.io/image/%s-%s-compact.png?amount=%s&addInfo=%s",
                config.getNganHang(), // VD: MB
                config.getSoTk(),     // VD: 0987654321
                amount.toString(),
                noiDung.replace(" ", "%20") // Mã hóa khoảng trắng
        );

        // Trả về link ảnh QR để Frontend hiển thị
        return ResponseEntity.ok(new MessageResponse(qrUrl));
    }
    
    @PostMapping("/submit")
    public ResponseEntity<?> submitAppeal(@RequestBody SubmitAppealRequest req) {
        try {
            sinhVienService.submitAppeal(req);
            return ResponseEntity.ok(new MessageResponse("Nộp đơn và thanh toán thành công!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Lỗi hệ thống: " + e.getMessage()));
        }
    }
    
    @GetMapping("/history-dashboard")
    public ResponseEntity<?> getHistoryDashboard(
            @RequestParam Long studentId,
            @RequestParam(required = false) String hocKy,
            @RequestParam(required = false) String namHoc,
            @RequestParam(required = false) String trangThai
    ) {
        try {
            // Nếu Frontend gửi chuỗi rỗng "" thì chuyển thành null để Query chạy đúng
            if (hocKy != null && hocKy.isEmpty()) hocKy = null;
            if (namHoc != null && namHoc.isEmpty()) namHoc = null;
            if (trangThai != null && trangThai.isEmpty()) trangThai = null;

            return ResponseEntity.ok(sinhVienService.getHistoryDashboard(studentId, hocKy, namHoc, trangThai));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}