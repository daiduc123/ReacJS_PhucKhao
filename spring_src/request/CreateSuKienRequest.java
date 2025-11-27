package com.example.demo.request;

import java.time.LocalDate;

public class CreateSuKienRequest {
    private String tenSuKien;
    private String hocKy;       // Ví dụ: "KY_1", "KY_2" (Khớp với tên Enum HocKy của bạn)
    private String namHoc;      // Ví dụ: "2024-2025"
    private LocalDate ngayBatDau;
    private LocalDate ngayKetThuc;

    public CreateSuKienRequest() {}

    // --- GETTER & SETTER ---
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
}