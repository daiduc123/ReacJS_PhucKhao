package com.example.demo.controller;

import com.example.demo.response.MessageResponse;
import com.example.demo.service.CvktService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.Map;

@RestController
@RequestMapping("/api/cvkt/quan-ly")
public class CvktController {

    @Autowired
    private CvktService cvktService;

    // =========================================================================
    // 1. LẤY DANH SÁCH SỰ KIỆN (Màn hình chính)
    // =========================================================================
    // URL: GET /api/cvkt/quan-ly/su-kien?namHoc=2024-2025&hocKy=KY_1
    @GetMapping("/su-kien")
    public ResponseEntity<?> getListSuKien(
            @RequestParam(required = false) String namHoc,
            @RequestParam(required = false) String hocKy
    ) {
        try {
            return ResponseEntity.ok(cvktService.getListSuKienHocPhan(namHoc, hocKy));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // =========================================================================
    // 2. XEM CHI TIẾT & TÌM KIẾM ĐƠN (Gộp chung logic)
    // =========================================================================
    // URL: GET /api/cvkt/quan-ly/su-kien/101/don-phuc-khao?keyword=abc&trangThai=DA_NOP
    @GetMapping("/su-kien/{suKienConId}/don-phuc-khao")
    public ResponseEntity<?> getListDon(
            @PathVariable Long suKienConId,
            @RequestParam(required = false) String keyword,   // Tìm theo Mã/Tên
            @RequestParam(required = false) String trangThai  // Lọc trạng thái
    ) {
        try {
            // Gọi hàm Service có hỗ trợ tìm kiếm
            return ResponseEntity.ok(cvktService.getListDonBySuKienCon(suKienConId, keyword, trangThai));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // =========================================================================
    // 3. CHUYỂN TRẠNG THÁI THỦ CÔNG (Nút "Chuyển Trợ lý")
    // =========================================================================
    // URL: PUT /api/cvkt/quan-ly/su-kien/101/status
    @PutMapping("/su-kien/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String newStatus = body.get("status");
            if (newStatus == null || newStatus.isEmpty()) {
                return ResponseEntity.badRequest().body(new MessageResponse("Trạng thái không được để trống!"));
            }

            cvktService.updateStatus(id, newStatus);
            return ResponseEntity.ok(new MessageResponse("Cập nhật trạng thái thành công!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // =========================================================================
    // 4. XÁC NHẬN HOÀN THÀNH (Chốt sổ - Bước cuối cùng)
    // =========================================================================
    // URL: PUT /api/cvkt/quan-ly/su-kien/101/confirm-finish
    @PutMapping("/su-kien/{id}/confirm-finish")
    public ResponseEntity<?> confirmFinish(@PathVariable Long id) {
        try {
            cvktService.xacNhanHoanThanhSuKien(id);
            return ResponseEntity.ok(new MessageResponse("Đã xác nhận hoàn thành đợt phúc khảo này!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // =========================================================================
    // 5. XUẤT FILE EXCEL
    // =========================================================================
    // URL: GET /api/cvkt/quan-ly/su-kien/101/export
    @GetMapping("/su-kien/{id}/export")
    public ResponseEntity<InputStreamResource> exportExcel(@PathVariable Long id) {
        try {
            ByteArrayInputStream in = cvktService.exportExcel(id);
            String filename = "phuc-khao-" + id + ".xlsx";

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=" + filename);

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(new InputStreamResource(in));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    // =========================================================================
    // 6. LẤY THỐNG KÊ DASHBOARD
    // =========================================================================
    // GET: /api/cvkt/quan-ly/thong-ke?namHoc=...&hocKy=...
    @GetMapping("/thong-ke")
    public ResponseEntity<?> getThongKe(
            @RequestParam String namHoc,
            @RequestParam String hocKy
    ) {
        try {
            return ResponseEntity.ok(cvktService.getThongKe(namHoc, hocKy));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // =========================================================================
    // 7. LẤY DANH SÁCH CHI TIẾT THỐNG KÊ
    // =========================================================================
    // GET: /api/cvkt/quan-ly/thong-ke/danh-sach?namHoc=...&tenMonHoc=...
    @GetMapping("/thong-ke/danh-sach")
    public ResponseEntity<?> getThongKeList(
            @RequestParam String namHoc,
            @RequestParam String hocKy,
            @RequestParam(required = false) String tenMonHoc
    ) {
        try {
            return ResponseEntity.ok(cvktService.getThongKeChiTiet(namHoc, hocKy, tenMonHoc));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}