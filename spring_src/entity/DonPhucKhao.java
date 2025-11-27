/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.entity;



import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "don_phuc_khao")
public class DonPhucKhao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_sv", nullable = false)
    private User sinhVien;

    @ManyToOne
    @JoinColumn(name = "id_su_kien", nullable = false)
    private SuKienPhucKhao suKien;

    @ManyToOne
    @JoinColumn(name = "id_hoc_phan", nullable = false)
    private HocPhan hocPhan;

    @Column(name = "ngay_thi")
    private LocalDate ngayThi;

    @Column(name = "gio_thi")
    private LocalTime gioThi;

    @Column(name = "phong_thi")
    private String phongThi;

    @Column(name = "diem_cu")
    private BigDecimal diemCu;

    @Column(name = "diem_moi")
    private BigDecimal diemMoi;

    @Column(name = "le_phi")
    private BigDecimal lePhi;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiDon trangThai;

    @Column(name = "ngay_nop")
    private LocalDateTime ngayNop;
    
    @Column(name = "so_tui")
    private String soTui;    // Số túi

    @Column(name = "so_phach")
    private String soPhach;  // Số phách

    // Getter & Setter
    public String getSoTui() { return soTui; }
    public void setSoTui(String soTui) { this.soTui = soTui; }
    public String getSoPhach() { return soPhach; }
    public void setSoPhach(String soPhach) { this.soPhach = soPhach; }

    // --- Constructor Rỗng ---
    public DonPhucKhao() {
    }

    // --- Xử lý tự động khi tạo ---
    @PrePersist
    protected void onCreate() {
        this.ngayNop = LocalDateTime.now();
        if (this.trangThai == null) {
            this.trangThai = TrangThaiDon.DANGCHAM;
        }
    }

    // --- GETTER & SETTER (Dùng Alt + Insert để sinh đoạn này) ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getSinhVien() { return sinhVien; }
    public void setSinhVien(User sinhVien) { this.sinhVien = sinhVien; }

    public SuKienPhucKhao getSuKien() { return suKien; }
    public void setSuKien(SuKienPhucKhao suKien) { this.suKien = suKien; }

    public HocPhan getHocPhan() { return hocPhan; }
    public void setHocPhan(HocPhan hocPhan) { this.hocPhan = hocPhan; }

    public LocalDate getNgayThi() { return ngayThi; }
    public void setNgayThi(LocalDate ngayThi) { this.ngayThi = ngayThi; }

    public LocalTime getGioThi() { return gioThi; }
    public void setGioThi(LocalTime gioThi) { this.gioThi = gioThi; }

    public String getPhongThi() { return phongThi; }
    public void setPhongThi(String phongThi) { this.phongThi = phongThi; }

    public BigDecimal getDiemCu() { return diemCu; }
    public void setDiemCu(BigDecimal diemCu) { this.diemCu = diemCu; }

    public BigDecimal getDiemMoi() { return diemMoi; }
    public void setDiemMoi(BigDecimal diemMoi) { this.diemMoi = diemMoi; }

    public BigDecimal getLePhi() { return lePhi; }
    public void setLePhi(BigDecimal lePhi) { this.lePhi = lePhi; }

    public TrangThaiDon getTrangThai() { return trangThai; }
    public void setTrangThai(TrangThaiDon trangThai) { this.trangThai = trangThai; }

    public LocalDateTime getNgayNop() { return ngayNop; }
    public void setNgayNop(LocalDateTime ngayNop) { this.ngayNop = ngayNop; }
}
