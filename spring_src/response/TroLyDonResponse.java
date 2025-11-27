package com.example.demo.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class TroLyDonResponse {
    private Long id;
    private String maSinhVien;
    private String tenSinhVien;
    private String tenLop;
    private String tenMonHoc;
    private LocalDateTime ngayNop;
    
    // --- THÔNG TIN THI (Lấy từ Đơn) ---
    private LocalDate ngayThi;  // Ngày thi
    private String phongThi;    // Phòng thi

    // --- THÔNG TIN PHÁCH & ĐIỂM ---
    private String soTui;
    private String soPhach;
    private BigDecimal diemCu;
    private BigDecimal diemMoi;
    
    private String trangThai;

    public TroLyDonResponse() {}

    public TroLyDonResponse(Long id, String maSinhVien, String tenSinhVien, String tenLop, 
                            String tenMonHoc, LocalDateTime ngayNop, 
                            LocalDate ngayThi, String phongThi, // <--- Giữ lại Ngày thi, Phòng thi
                            BigDecimal diemCu, BigDecimal diemMoi, 
                            String soTui, String soPhach, String trangThai) {
        this.id = id;
        this.maSinhVien = maSinhVien;
        this.tenSinhVien = tenSinhVien;
        this.tenLop = tenLop;
        this.tenMonHoc = tenMonHoc;
        this.ngayNop = ngayNop;
        
        this.ngayThi = ngayThi;   
        this.phongThi = phongThi; 
        
        this.diemCu = diemCu;
        this.diemMoi = diemMoi;
        this.soTui = soTui;
        this.soPhach = soPhach;
        this.trangThai = trangThai;
    }

    // --- GETTER & SETTER ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMaSinhVien() { return maSinhVien; }
    public void setMaSinhVien(String maSinhVien) { this.maSinhVien = maSinhVien; }
    public String getTenSinhVien() { return tenSinhVien; }
    public void setTenSinhVien(String tenSinhVien) { this.tenSinhVien = tenSinhVien; }
    public String getTenLop() { return tenLop; }
    public void setTenLop(String tenLop) { this.tenLop = tenLop; }
    public String getTenMonHoc() { return tenMonHoc; }
    public void setTenMonHoc(String tenMonHoc) { this.tenMonHoc = tenMonHoc; }
    public LocalDateTime getNgayNop() { return ngayNop; }
    public void setNgayNop(LocalDateTime ngayNop) { this.ngayNop = ngayNop; }
    
    public LocalDate getNgayThi() { return ngayThi; }
    public void setNgayThi(LocalDate ngayThi) { this.ngayThi = ngayThi; }
    public String getPhongThi() { return phongThi; }
    public void setPhongThi(String phongThi) { this.phongThi = phongThi; }

    public BigDecimal getDiemCu() { return diemCu; }
    public void setDiemCu(BigDecimal diemCu) { this.diemCu = diemCu; }
    public BigDecimal getDiemMoi() { return diemMoi; }
    public void setDiemMoi(BigDecimal diemMoi) { this.diemMoi = diemMoi; }
    public String getSoTui() { return soTui; }
    public void setSoTui(String soTui) { this.soTui = soTui; }
    public String getSoPhach() { return soPhach; }
    public void setSoPhach(String soPhach) { this.soPhach = soPhach; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
}