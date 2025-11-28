package com.example.demo.request;

public class HocPhanRequest {
    private String maHp;
    private String tenHp;
    private Integer soTinChi;
    private String loaiHp;      // "Cơ sở", "Chuyên ngành"
    private Long khoaId;        // ID Khoa
    private Long nguoiPhuTrachId; // ID của Vai trò phụ trách (Giảng viên)
    private String trangThai;   // "HOAT_DONG", "TAM_DUNG"

    public HocPhanRequest() {}

    // --- GETTER & SETTER ---
    public String getMaHp() { return maHp; }
    public void setMaHp(String maHp) { this.maHp = maHp; }

    public String getTenHp() { return tenHp; }
    public void setTenHp(String tenHp) { this.tenHp = tenHp; }

    public Integer getSoTinChi() { return soTinChi; }
    public void setSoTinChi(Integer soTinChi) { this.soTinChi = soTinChi; }

    public String getLoaiHp() { return loaiHp; }
    public void setLoaiHp(String loaiHp) { this.loaiHp = loaiHp; }

    public Long getKhoaId() { return khoaId; }
    public void setKhoaId(Long khoaId) { this.khoaId = khoaId; }

    public Long getNguoiPhuTrachId() { return nguoiPhuTrachId; }
    public void setNguoiPhuTrachId(Long nguoiPhuTrachId) { this.nguoiPhuTrachId = nguoiPhuTrachId; }

    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
}