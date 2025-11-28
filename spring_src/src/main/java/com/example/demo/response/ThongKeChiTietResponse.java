package com.example.demo.response;

import java.time.LocalDateTime;

public class ThongKeChiTietResponse {
    private String maSinhVien;
    private String hoTen;
    private String lop;         // Cần lấy từ User hoặc SinhVien
    private String tenMonHoc;
    private LocalDateTime ngayNop;
    private String trangThai;   // Để tô màu (Chờ duyệt, Đã xong...)

    public ThongKeChiTietResponse(String maSinhVien, String hoTen, String lop, 
                                  String tenMonHoc, LocalDateTime ngayNop, String trangThai) {
        this.maSinhVien = maSinhVien;
        this.hoTen = hoTen;
        this.lop = lop;
        this.tenMonHoc = tenMonHoc;
        this.ngayNop = ngayNop;
        this.trangThai = trangThai;
    }

    // Getter & Setter...
    public String getMaSinhVien() { return maSinhVien; }
    public String getHoTen() { return hoTen; }
    public String getLop() { return lop; }
    public String getTenMonHoc() { return tenMonHoc; }
    public LocalDateTime getNgayNop() { return ngayNop; }
    public String getTrangThai() { return trangThai; }
}