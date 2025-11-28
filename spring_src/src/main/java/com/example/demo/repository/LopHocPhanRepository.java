package com.example.demo.repository;

import com.example.demo.entity.LopHocPhan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LopHocPhanRepository extends JpaRepository<LopHocPhan, Long> {
    
    // Tìm tất cả các lớp mở trong Học kỳ và Năm học cụ thể
    // Để tạo sự kiện phúc khảo cho đúng đợt đó
    List<LopHocPhan> findByHocKyAndNamHoc(String hocKy, String namHoc);
}