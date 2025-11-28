package com.example.demo.response;

import java.time.LocalDate;

public class CvktSuKienResponse {
    private Long id;
    
    // --- CÁC TRƯỜNG THÔNG TIN MỚI ---
    private String maMonHoc;     // Mã môn (VD: INT101)
    private String tenMonHoc;    // Tên môn
    private String tenGiangVien; // Tên GV
    private String nhomLop;      // Nhóm lớp
    private Integer soLuongDon;  // SL đơn
    private String trangThai;    // Trạng thái (DANG_NHAN_DON...)
    private LocalDate thoiHanXuLy; // Lấy từ ngày kết thúc sự kiện tổng

    public CvktSuKienResponse(Long id, String maMonHoc, String tenMonHoc, String tenGiangVien, 
                              String nhomLop, Integer soLuongDon, String trangThai, LocalDate thoiHanXuLy) {
        this.id = id;
        this.maMonHoc = maMonHoc;
        this.tenMonHoc = tenMonHoc;
        this.tenGiangVien = tenGiangVien;
        this.nhomLop = nhomLop;
        this.soLuongDon = soLuongDon;
        this.trangThai = trangThai;
        this.thoiHanXuLy = thoiHanXuLy;
    }

    // --- GETTER & SETTER ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMaMonHoc() { return maMonHoc; }
    public void setMaMonHoc(String maMonHoc) { this.maMonHoc = maMonHoc; }
    public String getTenMonHoc() { return tenMonHoc; }
    public void setTenMonHoc(String tenMonHoc) { this.tenMonHoc = tenMonHoc; }
    public String getTenGiangVien() { return tenGiangVien; }
    public void setTenGiangVien(String tenGiangVien) { this.tenGiangVien = tenGiangVien; }
    public String getNhomLop() { return nhomLop; }
    public void setNhomLop(String nhomLop) { this.nhomLop = nhomLop; }
    public Integer getSoLuongDon() { return soLuongDon; }
    public void setSoLuongDon(Integer soLuongDon) { this.soLuongDon = soLuongDon; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
    public LocalDate getThoiHanXuLy() { return thoiHanXuLy; }
    public void setThoiHanXuLy(LocalDate thoiHanXuLy) { this.thoiHanXuLy = thoiHanXuLy; }
}