package com.example.demo.response;

import java.math.BigDecimal;

public class SuKienHocPhanResponse {
    private Long id;            // ID của dòng SuKienPhucKhaoHocPhan
    private String maHp;
    private String tenHp;
    private BigDecimal lePhi;
    private String tenGiangVien; // Tên giảng viên chấm (nếu có)
    private Long giangVienId;    // ID giảng viên (để frontend binding lại nếu cần sửa)

    public SuKienHocPhanResponse() {}

    public SuKienHocPhanResponse(Long id, String maHp, String tenHp, BigDecimal lePhi, String tenGiangVien, Long giangVienId) {
        this.id = id;
        this.maHp = maHp;
        this.tenHp = tenHp;
        this.lePhi = lePhi;
        this.tenGiangVien = tenGiangVien;
        this.giangVienId = giangVienId;
    }

    // Getter & Setter (Tự sinh)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMaHp() { return maHp; }
    public void setMaHp(String maHp) { this.maHp = maHp; }
    public String getTenHp() { return tenHp; }
    public void setTenHp(String tenHp) { this.tenHp = tenHp; }
    public BigDecimal getLePhi() { return lePhi; }
    public void setLePhi(BigDecimal lePhi) { this.lePhi = lePhi; }
    public String getTenGiangVien() { return tenGiangVien; }
    public void setTenGiangVien(String tenGiangVien) { this.tenGiangVien = tenGiangVien; }
    public Long getGiangVienId() { return giangVienId; }
    public void setGiangVienId(Long giangVienId) { this.giangVienId = giangVienId; }
}