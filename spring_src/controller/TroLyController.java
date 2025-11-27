package com.example.demo.controller;

import com.example.demo.request.NhapDiemRequest;
import com.example.demo.request.NhapPhachRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.TroLyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tro-ly")
public class TroLyController {

    @Autowired
    private TroLyService troLyService;

    // ========================================================================
    // GIAI ĐOẠN 1: NHẬP PHÁCH (Số túi / Số phách)
    // ========================================================================

    // 1. Lấy danh sách sinh viên để nhập phách
    // GET: /api/tro-ly/nhap-phach/su-kien/{id}
    @GetMapping("/nhap-phach/su-kien/{id}")
    public ResponseEntity<?> getListNhapPhach(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(troLyService.getDanhSachNhapPhach(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 2. Lưu Số túi & Số phách (Nút "Lưu")
    // POST: /api/tro-ly/nhap-phach/save
    @PostMapping("/nhap-phach/save")
    public ResponseEntity<?> savePhach(@RequestBody NhapPhachRequest req) {
        try {
            troLyService.luuPhach(req);
            return ResponseEntity.ok(new MessageResponse("Đã lưu thông tin phách thành công!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 3. Xác nhận chuyển sang giai đoạn Nhập điểm (Nút "Xác nhận / Hoàn thành phách")
    // POST: /api/tro-ly/nhap-phach/confirm/{id}
    @PostMapping("/nhap-phach/confirm/{id}")
    public ResponseEntity<?> confirmChuyenNhapDiem(@PathVariable Long id) {
        try {
            troLyService.xacNhanChuyenSangNhapDiem(id);
            return ResponseEntity.ok(new MessageResponse("Đã khóa phách và chuyển sang bước nhập điểm!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // ========================================================================
    // GIAI ĐOẠN 2: NHẬP ĐIỂM (Điểm phúc khảo)
    // ========================================================================

    // 4. Lấy danh sách để nhập điểm
    // GET: /api/tro-ly/nhap-diem/su-kien/{id}
    @GetMapping("/nhap-diem/su-kien/{id}")
    public ResponseEntity<?> getListNhapDiem(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(troLyService.getDanhSachNhapDiem(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 5. Lưu điểm tạm (Nút "Lưu")
    // POST: /api/tro-ly/nhap-diem/save
    @PostMapping("/nhap-diem/save")
    public ResponseEntity<?> saveDiem(@RequestBody NhapDiemRequest req) {
        try {
            troLyService.luuDiemTam(req);
            return ResponseEntity.ok(new MessageResponse("Đã lưu điểm nháp thành công!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 6. Xác nhận hoàn thành & Gửi CVKT (Nút "Gửi kết quả")
    // POST: /api/tro-ly/nhap-diem/confirm/{id}
    @PostMapping("/nhap-diem/confirm/{id}")
    public ResponseEntity<?> confirmHoanThanh(@PathVariable Long id) {
        try {
            troLyService.xacNhanHoanThanh(id);
            return ResponseEntity.ok(new MessageResponse("Đã gửi kết quả chấm phúc khảo cho CVKT!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // ========================================================================
    // GIAI ĐOẠN 3: XEM LẠI / ĐÃ HOÀN THÀNH
    // ========================================================================

    // 7. Xem chi tiết sự kiện đã hoàn thành
    // GET: /api/tro-ly/hoan-thanh/su-kien/{id}
    @GetMapping("/hoan-thanh/su-kien/{id}")
    public ResponseEntity<?> getListHoanThanh(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(troLyService.getDanhSachHoanThanh(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}