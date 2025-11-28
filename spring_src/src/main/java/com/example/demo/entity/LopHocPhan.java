package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lop_hoc_phan")
public class LopHocPhan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_lop_hp")
    private String maLopHp;

    @Column(name = "nhom_lop")
    private String nhomLop;

    // Liên kết với bảng Học Phần
    @ManyToOne
    @JoinColumn(name = "id_hoc_phan")
    private HocPhan hocPhan;

    // Liên kết với bảng Giảng Viên (Người dạy & sẽ chấm phúc khảo)
    @ManyToOne
    @JoinColumn(name = "id_giang_vien")
    private GiangVien giangVien;

    @Column(name = "hoc_ky")
    private String hocKy;       // Lưu dạng String cho đơn giản: "KY_1", "KY_2"

    @Column(name = "nam_hoc")
    private String namHoc;

    public LopHocPhan() {}

    // --- GETTER & SETTER ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMaLopHp() { return maLopHp; }
    public void setMaLopHp(String maLopHp) { this.maLopHp = maLopHp; }

    public String getNhomLop() { return nhomLop; }
    public void setNhomLop(String nhomLop) { this.nhomLop = nhomLop; }

    public HocPhan getHocPhan() { return hocPhan; }
    public void setHocPhan(HocPhan hocPhan) { this.hocPhan = hocPhan; }

    public GiangVien getGiangVien() { return giangVien; }
    public void setGiangVien(GiangVien giangVien) { this.giangVien = giangVien; }

    public String getHocKy() { return hocKy; }
    public void setHocKy(String hocKy) { this.hocKy = hocKy; }

    public String getNamHoc() { return namHoc; }
    public void setNamHoc(String namHoc) { this.namHoc = namHoc; }
}