package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "hoc_phan")
public class HocPhan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_hp", unique = true, nullable = false)
    private String maHp;

    @Column(name = "ten_hp", nullable = false)
    private String tenHp;

    @Column(name = "so_tin_chi")
    private Integer soTinChi;

    @Column(name = "loai_hp")
    private String loaiHp; // Ví dụ: "Cơ sở", "Chuyên ngành", "GDĐC"

    @Column(name = "trang_thai")
    private String trangThai; // Ví dụ: "HOAT_DONG", "TAM_DUNG", "DA_XOA"

    // --- CÁC MỐI QUAN HỆ (RELATIONSHIPS) ---

    // 1. Liên kết với bảng KHOA
    @ManyToOne
    @JoinColumn(name = "id_khoa")
    private Khoa khoa;

    // 2. Liên kết với bảng VAI_TRO_PHU_TRACH (Để lấy tên Giảng viên trưởng khoa/phụ trách)
    @ManyToOne
    @JoinColumn(name = "id_nguoi_phu_trach") 
    private VaiTroPhuTrach nguoiPhuTrach;

    // --- CONSTRUCTOR ---
    public HocPhan() {
    }

    // --- GETTER & SETTER ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaHp() {
        return maHp;
    }

    public void setMaHp(String maHp) {
        this.maHp = maHp;
    }

    public String getTenHp() {
        return tenHp;
    }

    public void setTenHp(String tenHp) {
        this.tenHp = tenHp;
    }

    public Integer getSoTinChi() {
        return soTinChi;
    }

    public void setSoTinChi(Integer soTinChi) {
        this.soTinChi = soTinChi;
    }

    public String getLoaiHp() {
        return loaiHp;
    }

    public void setLoaiHp(String loaiHp) {
        this.loaiHp = loaiHp;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public Khoa getKhoa() {
        return khoa;
    }

    public void setKhoa(Khoa khoa) {
        this.khoa = khoa;
    }

    public VaiTroPhuTrach getNguoiPhuTrach() {
        return nguoiPhuTrach;
    }

    public void setNguoiPhuTrach(VaiTroPhuTrach nguoiPhuTrach) {
        this.nguoiPhuTrach = nguoiPhuTrach;
    }
}