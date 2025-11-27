package com.example.demo.repository;

import com.example.demo.entity.DonPhucKhao;
import com.example.demo.entity.HocKy;
import com.example.demo.entity.TrangThaiDon;
import com.example.demo.response.ThongKeMonHocDto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DonPhucKhaoRepository extends JpaRepository<DonPhucKhao, Long> {
    // Kiểm tra xem sinh viên đã nộp đơn cho môn này trong sự kiện này chưa
    @Query("SELECT COUNT(d) > 0 FROM DonPhucKhao d WHERE d.sinhVien.id = :svId AND d.suKien.id = :skId AND d.hocPhan.id = :hpId")
    boolean existsBySinhVienIdAndSuKienIdAndHocPhanId(Long svId, Long skId, Long hpId);
    
    // 1. Hàm đếm tổng đơn
    long countBySinhVienId(Long svId);

    // 2. Hàm đếm theo trạng thái
    long countBySinhVienIdAndTrangThaiIn(Long svId, List<String> trangThais);

    // --- 3. ĐÂY LÀ ĐOẠN BẠN ĐANG THIẾU ---
    @Query("SELECT d FROM DonPhucKhao d WHERE " +
           "d.sinhVien.id = :svId AND " +
           "(:hocKy IS NULL OR d.suKien.hocKy = :hocKy) AND " +
           "(:namHoc IS NULL OR d.suKien.namHoc = :namHoc) AND " +
           "(:trangThai IS NULL OR d.trangThai = :trangThai) " +
           "ORDER BY d.ngayNop DESC")
    List<DonPhucKhao> searchDonPhucKhao(
            @Param("svId") Long svId,
            @Param("hocKy") String hocKy,
            @Param("namHoc") String namHoc,
            @Param("trangThai") String trangThai
    );
    
    List<DonPhucKhao> findBySuKienIdAndHocPhanId(Long suKienId, Long hocPhanId);
    
    // TÌM KIẾM ĐƠN TRONG 1 SỰ KIỆN CỤ THỂ
    @Query("SELECT d FROM DonPhucKhao d WHERE " +
           "d.suKien.id = :suKienId AND " +   // Thuộc đợt này
           "d.hocPhan.id = :hocPhanId AND " + // Thuộc môn này
           "(:keyword IS NULL OR LOWER(d.sinhVien.username) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.sinhVien.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(:trangThai IS NULL OR d.trangThai = :trangThai)")
    List<DonPhucKhao> searchDonInEvent(
            @Param("suKienId") Long suKienId,
            @Param("hocPhanId") Long hocPhanId,
            @Param("keyword") String keyword,       // Tìm theo Mã SV hoặc Tên SV
            @Param("trangThai") TrangThaiDon trangThai // Lọc trạng thái
    );
    
    // 1. Đếm tổng số đơn trong học kỳ/năm học
    @Query("SELECT COUNT(d) FROM DonPhucKhao d WHERE " +
           "d.suKien.namHoc = :namHoc AND d.suKien.hocKy = :hocKy")
    long countTotalByKy(@Param("namHoc") String namHoc, @Param("hocKy") HocKy hocKy);

    // 2. Đếm số đơn theo danh sách trạng thái (VD: Đếm những đơn đã HOAN_THANH)
    @Query("SELECT COUNT(d) FROM DonPhucKhao d WHERE " +
           "d.suKien.namHoc = :namHoc AND d.suKien.hocKy = :hocKy AND " +
           "d.trangThai IN :statuses")
    long countByStatusAndKy(
            @Param("namHoc") String namHoc, 
            @Param("hocKy") HocKy hocKy, 
            @Param("statuses") List<TrangThaiDon> statuses
    );

    // 3. Query Group By để lấy dữ liệu vẽ Biểu đồ (Môn này bao nhiêu đơn?)
    @Query("SELECT new com.example.demo.response.ThongKeMonHocDto(d.hocPhan.tenHp, COUNT(d)) " +
           "FROM DonPhucKhao d " +
           "WHERE d.suKien.namHoc = :namHoc AND d.suKien.hocKy = :hocKy " +
           "GROUP BY d.hocPhan.tenHp " +
           "ORDER BY COUNT(d) DESC")
    List<ThongKeMonHocDto> thongKeTheoMonHoc(@Param("namHoc") String namHoc, @Param("hocKy") HocKy hocKy);
    
    // Lấy danh sách chi tiết cho màn hình Thống kê
    // Có thể lọc theo Năm, Kỳ, và tên Môn học (nếu click vào biểu đồ)
    @Query("SELECT d FROM DonPhucKhao d WHERE " +
           "d.suKien.namHoc = :namHoc AND " +
           "d.suKien.hocKy = :hocKy AND " +
           "(:tenMon IS NULL OR d.hocPhan.tenHp = :tenMon) " +
           "ORDER BY d.ngayNop DESC")
    List<DonPhucKhao> getListThongKeChiTiet(
            @Param("namHoc") String namHoc, 
            @Param("hocKy") HocKy hocKy,
            @Param("tenMon") String tenMon
    );
}