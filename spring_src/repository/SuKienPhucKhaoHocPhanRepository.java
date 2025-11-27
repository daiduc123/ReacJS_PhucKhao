package com.example.demo.repository;

import com.example.demo.entity.HocKy;
import com.example.demo.entity.SuKienPhucKhaoHocPhan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface SuKienPhucKhaoHocPhanRepository extends JpaRepository<SuKienPhucKhaoHocPhan, Long> {
    
    // 1. Lấy danh sách môn học của 1 sự kiện (Để hiển thị ra bảng - Phần 2)
    List<SuKienPhucKhaoHocPhan> findBySuKienTongId(Long suKienId);

    // 2. Tìm dòng cụ thể theo Sự kiện + Học phần (Để cập nhật giảng viên - Phần 1)
    Optional<SuKienPhucKhaoHocPhan> findBySuKienTongIdAndHocPhanId(Long suKienId, Long hocPhanId);
    
    @Query("SELECT s FROM SuKienPhucKhaoHocPhan s WHERE " +
           "(:namHoc IS NULL OR s.namHoc = :namHoc) AND " +
           "(:hocKy IS NULL OR s.hocKy = :hocKy)")
    List<SuKienPhucKhaoHocPhan> searchByNamHocAndHocKy(@Param("namHoc") String namHoc, @Param("hocKy") HocKy hocKy);
    
    
}