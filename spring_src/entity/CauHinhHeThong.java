/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.entity;



import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "cau_hinh_he_thong")

public class CauHinhHeThong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chi_phi_mac_dinh")
    private BigDecimal chiPhiMacDinh;

    @Column(name = "ten_tk")
    private String tenTk; // Tên chủ tài khoản ngân hàng

    @Column(name = "so_tk")
    private String soTk;

    @Column(name = "ngan_hang")
    private String nganHang;

    @Column(name = "qr_code")
    private String qrCode;
    
    @Transient 
    private String qrCodeUrl;

    // Các mốc thời gian quy định (ngày)
    private Integer tgSvNopDon;
    private Integer tgSvChoKq;

    public String getQrCodeUrl() {
        return qrCodeUrl;
    }

    public void setQrCodeUrl(String qrCodeUrl) {
        this.qrCodeUrl = qrCodeUrl;
    }
    private Integer tgCvktDuyetDon;
    private Integer tgCvktKiemTraTroly;
    private Integer tgTrolyTimHoSo;
    private Integer tgTrolyNhapDiem;
    private Integer tgTrolyCapNhat;

    @Enumerated(EnumType.STRING)
    private TrangThaiBatTat thongBaoQuaHan;

    @Enumerated(EnumType.STRING)
    private TrangThaiBatTat hienTbHoanThanh;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getChiPhiMacDinh() {
        return chiPhiMacDinh;
    }

    public void setChiPhiMacDinh(BigDecimal chiPhiMacDinh) {
        this.chiPhiMacDinh = chiPhiMacDinh;
    }

    public String getTenTk() {
        return tenTk;
    }

    public void setTenTk(String tenTk) {
        this.tenTk = tenTk;
    }

    public String getSoTk() {
        return soTk;
    }

    public void setSoTk(String soTk) {
        this.soTk = soTk;
    }

    public String getNganHang() {
        return nganHang;
    }

    public void setNganHang(String nganHang) {
        this.nganHang = nganHang;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public Integer getTgSvNopDon() {
        return tgSvNopDon;
    }

    public void setTgSvNopDon(Integer tgSvNopDon) {
        this.tgSvNopDon = tgSvNopDon;
    }

    public Integer getTgSvChoKq() {
        return tgSvChoKq;
    }

    public void setTgSvChoKq(Integer tgSvChoKq) {
        this.tgSvChoKq = tgSvChoKq;
    }

    public Integer getTgCvktDuyetDon() {
        return tgCvktDuyetDon;
    }

    public void setTgCvktDuyetDon(Integer tgCvktDuyetDon) {
        this.tgCvktDuyetDon = tgCvktDuyetDon;
    }

    public Integer getTgCvktKiemTraTroly() {
        return tgCvktKiemTraTroly;
    }

    public void setTgCvktKiemTraTroly(Integer tgCvktKiemTraTroly) {
        this.tgCvktKiemTraTroly = tgCvktKiemTraTroly;
    }

    public Integer getTgTrolyTimHoSo() {
        return tgTrolyTimHoSo;
    }

    public void setTgTrolyTimHoSo(Integer tgTrolyTimHoSo) {
        this.tgTrolyTimHoSo = tgTrolyTimHoSo;
    }

    public Integer getTgTrolyNhapDiem() {
        return tgTrolyNhapDiem;
    }

    public void setTgTrolyNhapDiem(Integer tgTrolyNhapDiem) {
        this.tgTrolyNhapDiem = tgTrolyNhapDiem;
    }

    public Integer getTgTrolyCapNhat() {
        return tgTrolyCapNhat;
    }

    public void setTgTrolyCapNhat(Integer tgTrolyCapNhat) {
        this.tgTrolyCapNhat = tgTrolyCapNhat;
    }

    public TrangThaiBatTat getThongBaoQuaHan() {
        return thongBaoQuaHan;
    }

    public void setThongBaoQuaHan(TrangThaiBatTat thongBaoQuaHan) {
        this.thongBaoQuaHan = thongBaoQuaHan;
    }

    public TrangThaiBatTat getHienTbHoanThanh() {
        return hienTbHoanThanh;
    }

    public void setHienTbHoanThanh(TrangThaiBatTat hienTbHoanThanh) {
        this.hienTbHoanThanh = hienTbHoanThanh;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
}
