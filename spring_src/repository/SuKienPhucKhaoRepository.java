package com.example.demo.repository;

import com.example.demo.entity.SuKienPhucKhao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SuKienPhucKhaoRepository extends JpaRepository<SuKienPhucKhao, Long> {

    // 1. Kiểm tra trùng tên sự kiện (để tránh tạo trùng)
    boolean existsByTenSuKien(String tenSuKien);

    // 2. Tìm kiếm nâng cao (Dùng cho trang danh sách)
    // - keyword: Tìm theo tên sự kiện
    // - trangThai: Lọc theo trạng thái (DANG_MO, DA_DONG...)
    // - namHoc: Lọc theo năm học
    // - hocKy: Lọc theo học kỳ
    @Query("SELECT s FROM SuKienPhucKhao s WHERE " +
           "(:keyword IS NULL OR s.tenSuKien LIKE %:keyword%) AND " +
           "(:trangThai IS NULL OR s.trangThai = :trangThai) AND " +
           "(:namHoc IS NULL OR s.namHoc = :namHoc) AND " +
           "(:hocKy IS NULL OR s.hocKy = :hocKy) " +
           "ORDER BY s.ngayBatDau DESC")
    List<SuKienPhucKhao> searchSuKien(
            @Param("keyword") String keyword,
            @Param("trangThai") String trangThai,
            @Param("namHoc") String namHoc,
            @Param("hocKy") String hocKy
    );
    
    boolean existsByHocKyAndNamHoc(String hocKy, String namHoc);
}
