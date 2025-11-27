package com.example.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "su_kien_phuc_khao_hoc_phan")
public class SuKienPhucKhaoHocPhan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Liên kết với Sự kiện tổng (Cha)
    @ManyToOne
    @JoinColumn(name = "id_su_kien_tong") 
    private SuKienPhucKhao suKienTong;

    // Liên kết với Học phần (Môn học)
    @ManyToOne
    @JoinColumn(name = "id_hoc_phan")
    private HocPhan hocPhan;

    // Liên kết với Giảng viên chấm phúc khảo (nếu có phân công)
    @ManyToOne
    @JoinColumn(name = "id_giang_vien")
    private GiangVien giangVien;

    // --- QUAN TRỌNG: Cột Lệ phí riêng cho từng môn ---
    @Column(name = "le_phi")
    private BigDecimal lePhi; 

    private String nhomLop;
    
    @Column(name = "so_luong_don")
    private Integer soLuongDon = 0; // Mặc định là 0 đơn
    
    private String trangThai; // "DANG_NHAN_DON", "DANG_CHAM", "HOAN_THANH"
    
    private LocalDate hanXuLy;
    
    private LocalDateTime ngayBatDau;
    
    private LocalDateTime ngayHoanThanh;
    
    @Enumerated(EnumType.STRING)
    private HocKy hocKy; // Đảm bảo bạn có Enum HocKy
    
    private String namHoc;

    public SuKienPhucKhaoHocPhan() {
    }

    // --- GETTER & SETTER ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public SuKienPhucKhao getSuKienTong() { return suKienTong; }
    public void setSuKienTong(SuKienPhucKhao suKienTong) { this.suKienTong = suKienTong; }

    public HocPhan getHocPhan() { return hocPhan; }
    public void setHocPhan(HocPhan hocPhan) { this.hocPhan = hocPhan; }

    public GiangVien getGiangVien() { return giangVien; }
    public void setGiangVien(GiangVien giangVien) { this.giangVien = giangVien; }

    public BigDecimal getLePhi() { return lePhi; }
    public void setLePhi(BigDecimal lePhi) { this.lePhi = lePhi; }

    public String getNhomLop() { return nhomLop; }
    public void setNhomLop(String nhomLop) { this.nhomLop = nhomLop; }

    public Integer getSoLuongDon() { return soLuongDon; }
    public void setSoLuongDon(Integer soLuongDon) { this.soLuongDon = soLuongDon; }

    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }

    public LocalDate getHanXuLy() { return hanXuLy; }
    public void setHanXuLy(LocalDate hanXuLy) { this.hanXuLy = hanXuLy; }

    public LocalDateTime getNgayBatDau() { return ngayBatDau; }
    public void setNgayBatDau(LocalDateTime ngayBatDau) { this.ngayBatDau = ngayBatDau; }

    public LocalDateTime getNgayHoanThanh() { return ngayHoanThanh; }
    public void setNgayHoanThanh(LocalDateTime ngayHoanThanh) { this.ngayHoanThanh = ngayHoanThanh; }

    public HocKy getHocKy() { return hocKy; }
    public void setHocKy(HocKy hocKy) { this.hocKy = hocKy; }

    public String getNamHoc() { return namHoc; }
    public void setNamHoc(String namHoc) { this.namHoc = namHoc; }
}