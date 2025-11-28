package com.example.demo.repository;

import com.example.demo.entity.KetQuaHocTap;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KetQuaHocTapRepository extends JpaRepository<KetQuaHocTap, Long> {
    // Tìm điểm của sinh viên theo môn học
    KetQuaHocTap findBySinhVienIdAndHocPhanId(Long sinhVienId, Long hocPhanId);
    
    // 1. Lấy tất cả điểm của 1 sinh viên (Để hiện danh sách chọn môn)
    List<KetQuaHocTap> findBySinhVienId(Long sinhVienId);

}