package com.example.demo.repository;

import com.example.demo.entity.Role;
import com.example.demo.entity.ThongBao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongBaoRepository extends JpaRepository<ThongBao, Long> {

    // 1. Cách đơn giản: Tìm thông báo gửi đích danh cho Role này (Sắp xếp mới nhất trước)
    // Spring Boot tự động dịch tên hàm này thành câu lệnh SQL
    List<ThongBao> findByNguoiNhanRoleOrderByThoiGianDesc(Role nguoiNhanRole);

    // 2. (Nâng cao) Nếu sau này bạn có chức năng gửi cho "TẤT CẢ" (Role.TATCA)
    // Thì dùng hàm này để lấy cả thông báo riêng lẫn thông báo chung
    @Query("SELECT t FROM ThongBao t WHERE t.nguoiNhanRole = :role OR t.nguoiNhanRole = 'TATCA' ORDER BY t.thoiGian DESC")
    List<ThongBao> findByRoleOrAll(@Param("role") Role role);
}