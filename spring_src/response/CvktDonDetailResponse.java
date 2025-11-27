package com.example.demo.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CvktDonDetailResponse {
    private Long donId;
    private String maSinhVien;
    private String tenSinhVien;
    private LocalDateTime ngayNop;
    private BigDecimal diemCu;
    private BigDecimal diemMoi;
    private String trangThai;

    public CvktDonDetailResponse(Long donId, String maSinhVien, String tenSinhVien, LocalDateTime ngayNop, BigDecimal diemCu, BigDecimal diemMoi, String trangThai) {
        this.donId = donId;
        this.maSinhVien = maSinhVien;
        this.tenSinhVien = tenSinhVien;
        this.ngayNop = ngayNop;
        this.diemCu = diemCu;
        this.diemMoi = diemMoi;
        this.trangThai = trangThai;
    }
    // Getter & Setter...
    public Long getDonId() { return donId; }
    public String getMaSinhVien() { return maSinhVien; }
    public String getTenSinhVien() { return tenSinhVien; }
    public LocalDateTime getNgayNop() { return ngayNop; }
    public BigDecimal getDiemCu() { return diemCu; }
    public BigDecimal getDiemMoi() { return diemMoi; }
    public String getTrangThai() { return trangThai; }
}