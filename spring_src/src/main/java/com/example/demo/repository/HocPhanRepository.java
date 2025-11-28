package com.example.demo.repository;

import com.example.demo.entity.HocPhan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HocPhanRepository extends JpaRepository<HocPhan, Long> {
    
    // Kiểm tra trùng mã
    boolean existsByMaHp(String maHp);

    // Tìm kiếm kết hợp lọc
    @Query("SELECT h FROM HocPhan h WHERE " +
           "(:keyword IS NULL OR h.maHp LIKE %:keyword% OR h.tenHp LIKE %:keyword%) AND " +
           "(:khoaId IS NULL OR h.khoa.id = :khoaId) AND " +
           "(:loaiHp IS NULL OR h.loaiHp = :loaiHp) AND " +
           "(:trangThai IS NULL OR h.trangThai = :trangThai)")
    List<HocPhan> searchHocPhan(
            @Param("keyword") String keyword,
            @Param("khoaId") Long khoaId,
            @Param("loaiHp") String loaiHp,
            @Param("trangThai") String trangThai
    );
}