package com.example.demo.response;

public class ThongKeMonHocDto {
    private String tenMonHoc;
    private Long soLuongDon;

    public ThongKeMonHocDto(String tenMonHoc, Long soLuongDon) {
        this.tenMonHoc = tenMonHoc;
        this.soLuongDon = soLuongDon;
    }
    // Getter & Setter...
    public String getTenMonHoc() { return tenMonHoc; }
    public Long getSoLuongDon() { return soLuongDon; }
}