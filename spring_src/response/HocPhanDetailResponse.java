package com.example.demo.response;

public class HocPhanDetailResponse {
    private Long id;
    private String maHp;
    private String tenHp;
    private Integer soTinChi;
    private String loaiHp;
    private String trangThai;
    
    // Thông tin ID để Frontend chọn đúng vào Dropdown
    private Long khoaId;
    private String tenKhoa;
    private Long nguoiPhuTrachId;
    private String tenNguoiPhuTrach;

    public HocPhanDetailResponse() {}

    public HocPhanDetailResponse(Long id, String maHp, String tenHp, Integer soTinChi, String loaiHp, String trangThai, Long khoaId, String tenKhoa, Long nguoiPhuTrachId, String tenNguoiPhuTrach) {
        this.id = id;
        this.maHp = maHp;
        this.tenHp = tenHp;
        this.soTinChi = soTinChi;
        this.loaiHp = loaiHp;
        this.trangThai = trangThai;
        this.khoaId = khoaId;
        this.tenKhoa = tenKhoa;
        this.nguoiPhuTrachId = nguoiPhuTrachId;
        this.tenNguoiPhuTrach = tenNguoiPhuTrach;
    }

    // --- GETTER & SETTER ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMaHp() { return maHp; }
    public void setMaHp(String maHp) { this.maHp = maHp; }
    public String getTenHp() { return tenHp; }
    public void setTenHp(String tenHp) { this.tenHp = tenHp; }
    public Integer getSoTinChi() { return soTinChi; }
    public void setSoTinChi(Integer soTinChi) { this.soTinChi = soTinChi; }
    public String getLoaiHp() { return loaiHp; }
    public void setLoaiHp(String loaiHp) { this.loaiHp = loaiHp; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
    public Long getKhoaId() { return khoaId; }
    public void setKhoaId(Long khoaId) { this.khoaId = khoaId; }
    public String getTenKhoa() { return tenKhoa; }
    public void setTenKhoa(String tenKhoa) { this.tenKhoa = tenKhoa; }
    public Long getNguoiPhuTrachId() { return nguoiPhuTrachId; }
    public void setNguoiPhuTrachId(Long nguoiPhuTrachId) { this.nguoiPhuTrachId = nguoiPhuTrachId; }
    public String getTenNguoiPhuTrach() { return tenNguoiPhuTrach; }
    public void setTenNguoiPhuTrach(String tenNguoiPhuTrach) { this.tenNguoiPhuTrach = tenNguoiPhuTrach; }
}