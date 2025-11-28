package com.example.demo.controller;

import com.example.demo.request.HocPhanRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.HocPhanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/hoc-phan")
public class HocPhanController {

    @Autowired
    private HocPhanService hocPhanService;

    // 1. Tìm kiếm & Lọc
    @GetMapping
    public ResponseEntity<?> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long khoaId,
            @RequestParam(required = false) String loaiHp,
            @RequestParam(required = false) String trangThai
    ) {
        return ResponseEntity.ok(hocPhanService.search(keyword, khoaId, loaiHp, trangThai));
    }

    // 2. Xem chi tiết (để hiển thị lên form sửa)
    @GetMapping("/{id}")
    public ResponseEntity<?> getDetail(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(hocPhanService.getDetail(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 3. Thêm mới
    @PostMapping
    public ResponseEntity<?> create(@RequestBody HocPhanRequest req) {
        try {
            hocPhanService.create(req);
            return ResponseEntity.ok(new MessageResponse("Thêm học phần thành công!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 4. Cập nhật
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody HocPhanRequest req) {
        try {
            hocPhanService.update(id, req);
            return ResponseEntity.ok(new MessageResponse("Cập nhật thành công!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    // 5. Xóa
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            hocPhanService.delete(id);
            return ResponseEntity.ok(new MessageResponse("Đã xóa học phần!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}