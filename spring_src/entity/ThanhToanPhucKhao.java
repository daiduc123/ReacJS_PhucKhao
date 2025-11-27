/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.entity;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "thanh_toan_phuc_khao")
public class ThanhToanPhucKhao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal soTien;

    @Enumerated(EnumType.STRING)
    private PhuongThucThanhToan phuongThuc;

    private String maGiaoDich;
    private LocalDateTime ngayThanhToan;

    @Enumerated(EnumType.STRING)
    private TrangThaiThanhToan trangThai;

    @ManyToOne
    @JoinColumn(name = "id_sv")
    private User sinhVien;

    private BigDecimal tongSoTien;

    public ThanhToanPhucKhao() {}
    // Getters Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public BigDecimal getSoTien() { return soTien; }
    public void setSoTien(BigDecimal soTien) { this.soTien = soTien; }
    public PhuongThucThanhToan getPhuongThuc() { return phuongThuc; }
    public void setPhuongThuc(PhuongThucThanhToan phuongThuc) { this.phuongThuc = phuongThuc; }
    public String getMaGiaoDich() { return maGiaoDich; }
    public void setMaGiaoDich(String maGiaoDich) { this.maGiaoDich = maGiaoDich; }
    public LocalDateTime getNgayThanhToan() { return ngayThanhToan; }
    public void setNgayThanhToan(LocalDateTime ngayThanhToan) { this.ngayThanhToan = ngayThanhToan; }
    public TrangThaiThanhToan getTrangThai() { return trangThai; }
    public void setTrangThai(TrangThaiThanhToan trangThai) { this.trangThai = trangThai; }
    public User getSinhVien() { return sinhVien; }
    public void setSinhVien(User sinhVien) { this.sinhVien = sinhVien; }
    public BigDecimal getTongSoTien() { return tongSoTien; }
    public void setTongSoTien(BigDecimal tongSoTien) { this.tongSoTien = tongSoTien; }
}
