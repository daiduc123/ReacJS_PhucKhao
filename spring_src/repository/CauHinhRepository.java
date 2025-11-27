package com.example.demo.repository;

import com.example.demo.entity.CauHinhHeThong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CauHinhRepository extends JpaRepository<CauHinhHeThong, Long> {
    // Không cần viết thêm hàm gì ở đây cả.
    // JpaRepository đã cung cấp sẵn:
    // 1. findById(id) -> Để lấy cấu hình ra
    // 2. save(entity) -> Để lưu hoặc cập nhật cấu hình
}