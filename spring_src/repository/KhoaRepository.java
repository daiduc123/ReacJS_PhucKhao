package com.example.demo.repository;

import com.example.demo.entity.Khoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KhoaRepository extends JpaRepository<Khoa, Long> {
    // JpaRepository đã có sẵn hàm findById để Service gọi rồi.
    // Không cần viết thêm gì trừ khi muốn tìm theo mã khoa
    boolean existsByMaKhoa(String maKhoa); // Ví dụ thêm hàm check trùng mã khoa
}