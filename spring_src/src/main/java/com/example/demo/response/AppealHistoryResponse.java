package com.example.demo.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AppealHistoryResponse {
    private Long id;            // ID đơn (để khi bấm vào sẽ gọi API chi tiết)
    private String tenHocPhan;  // Tên môn học
    private String hocKy;       // Học kỳ (Lấy từ Sự kiện)
    private String namHoc;      // Năm học (Lấy từ Sự kiện)
    private LocalDateTime ngayNop; 
    private String trangThai;   // Trạng thái (Đã nộp, Đang chấm...)
    private String ketQua;      // Kết quả (Tăng điểm, Giảm điểm, Chưa có...)
    
    private BigDecimal diemCu;  // Điểm gốc
    private BigDecimal diemMoi; // Điểm sau phúc khảo (có thể null)

    public AppealHistoryResponse() {}

    // Constructor đầy đủ (Dùng để new trong Service)
    public AppealHistoryResponse(Long id, String tenHocPhan, String hocKy, String namHoc, 
                                 LocalDateTime ngayNop, String trangThai, String ketQua, 
                                 BigDecimal diemCu, BigDecimal diemMoi) {
        this.id = id;
        this.tenHocPhan = tenHocPhan;
        this.hocKy = hocKy;
        this.namHoc = namHoc;
        this.ngayNop = ngayNop;
        this.trangThai = trangThai;
        this.ketQua = ketQua;
        this.diemCu = diemCu;
        this.diemMoi = diemMoi;
    }

    // --- GETTER & SETTER ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTenHocPhan() { return tenHocPhan; }
    public void setTenHocPhan(String tenHocPhan) { this.tenHocPhan = tenHocPhan; }

    public String getHocKy() { return hocKy; }
    public void setHocKy(String hocKy) { this.hocKy = hocKy; }

    public String getNamHoc() { return namHoc; }
    public void setNamHoc(String namHoc) { this.namHoc = namHoc; }

    public LocalDateTime getNgayNop() { return ngayNop; }
    public void setNgayNop(LocalDateTime ngayNop) { this.ngayNop = ngayNop; }

    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }

    public String getKetQua() { return ketQua; }
    public void setKetQua(String ketQua) { this.ketQua = ketQua; }

    public BigDecimal getDiemCu() { return diemCu; }
    public void setDiemCu(BigDecimal diemCu) { this.diemCu = diemCu; }

    public BigDecimal getDiemMoi() { return diemMoi; }
    public void setDiemMoi(BigDecimal diemMoi) { this.diemMoi = diemMoi; }
}