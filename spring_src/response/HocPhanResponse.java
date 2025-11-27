package com.example.demo.response;

public class HocPhanResponse {
    private Long id;
    private String maHp;
    private String tenHp;
    private String tenKhoa;
    private String loaiHp;
    private Integer soTinChi;
    private String tenNguoiPhuTrach;
    private String trangThai;

    public HocPhanResponse() {}

    public HocPhanResponse(Long id, String maHp, String tenHp, String tenKhoa, String loaiHp, Integer soTinChi, String tenNguoiPhuTrach, String trangThai) {
        this.id = id;
        this.maHp = maHp;
        this.tenHp = tenHp;
        this.tenKhoa = tenKhoa;
        this.loaiHp = loaiHp;
        this.soTinChi = soTinChi;
        this.tenNguoiPhuTrach = tenNguoiPhuTrach;
        this.trangThai = trangThai;
    }

    // --- GETTER & SETTER ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMaHp() { return maHp; }
    public void setMaHp(String maHp) { this.maHp = maHp; }
    public String getTenHp() { return tenHp; }
    public void setTenHp(String tenHp) { this.tenHp = tenHp; }
    public String getTenKhoa() { return tenKhoa; }
    public void setTenKhoa(String tenKhoa) { this.tenKhoa = tenKhoa; }
    public String getLoaiHp() { return loaiHp; }
    public void setLoaiHp(String loaiHp) { this.loaiHp = loaiHp; }
    public Integer getSoTinChi() { return soTinChi; }
    public void setSoTinChi(Integer soTinChi) { this.soTinChi = soTinChi; }
    public String getTenNguoiPhuTrach() { return tenNguoiPhuTrach; }
    public void setTenNguoiPhuTrach(String tenNguoiPhuTrach) { this.tenNguoiPhuTrach = tenNguoiPhuTrach; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
}