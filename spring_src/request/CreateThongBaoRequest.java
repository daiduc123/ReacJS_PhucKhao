package com.example.demo.request;

import com.example.demo.entity.LoaiThongBao;
import com.example.demo.entity.Role;

public class CreateThongBaoRequest {
    private Long nguoiGuiId;
    private String tieuDe;
    private String noiDung;
    private Role nguoiNhanRole; // Gửi cho ai?
    private LoaiThongBao loaiThongBao;

    public CreateThongBaoRequest() {}
    // ... (Getter & Setter) ...
    public Long getNguoiGuiId() { return nguoiGuiId; }
    public void setNguoiGuiId(Long nguoiGuiId) { this.nguoiGuiId = nguoiGuiId; }
    public String getTieuDe() { return tieuDe; }
    public void setTieuDe(String tieuDe) { this.tieuDe = tieuDe; }
    public String getNoiDung() { return noiDung; }
    public void setNoiDung(String noiDung) { this.noiDung = noiDung; }
    public Role getNguoiNhanRole() { return nguoiNhanRole; }
    public void setNguoiNhanRole(Role nguoiNhanRole) { this.nguoiNhanRole = nguoiNhanRole; }
    public LoaiThongBao getLoaiThongBao() { return loaiThongBao; }
    public void setLoaiThongBao(LoaiThongBao loaiThongBao) { this.loaiThongBao = loaiThongBao; }
}