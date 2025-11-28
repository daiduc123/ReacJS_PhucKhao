package com.example.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "su_kien_phuc_khao")
public class SuKienPhucKhao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_su_kien")
    private String tenSuKien;

    @Column(name = "hoc_ky")
    private String hocKy;       

    // --- CỘT VỪA THÊM ---
    @Column(name = "nam_hoc")
    private String namHoc;      

    @Column(name = "ngay_bat_dau")
    private LocalDate ngayBatDau; 

    @Column(name = "ngay_ket_thuc")
    private LocalDate ngayKetThuc; 

    @Column(name = "le_phi")
    private BigDecimal lePhi;   

    @Column(name = "trang_thai")
    private String trangThai;   

    public SuKienPhucKhao() {}

    // --- GETTER & SETTER ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTenSuKien() { return tenSuKien; }
    public void setTenSuKien(String tenSuKien) { this.tenSuKien = tenSuKien; }

    public String getHocKy() { return hocKy; }
    public void setHocKy(String hocKy) { this.hocKy = hocKy; }

    public String getNamHoc() { return namHoc; }
    public void setNamHoc(String namHoc) { this.namHoc = namHoc; }

    public LocalDate getNgayBatDau() { return ngayBatDau; }
    public void setNgayBatDau(LocalDate ngayBatDau) { this.ngayBatDau = ngayBatDau; }

    public LocalDate getNgayKetThuc() { return ngayKetThuc; }
    public void setNgayKetThuc(LocalDate ngayKetThuc) { this.ngayKetThuc = ngayKetThuc; }

    public BigDecimal getLePhi() { return lePhi; }
    public void setLePhi(BigDecimal lePhi) { this.lePhi = lePhi; }

    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
}