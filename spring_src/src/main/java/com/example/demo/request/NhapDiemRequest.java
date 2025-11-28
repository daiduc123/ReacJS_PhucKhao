package com.example.demo.request;

import java.math.BigDecimal;
import java.util.List;

public class NhapDiemRequest {
    private Long suKienConId;
    private List<ChiTietDiem> danhSachDiem;

    public static class ChiTietDiem {
        private Long donId;
        private BigDecimal diemMoi;
        private String ghiChu; // Ghi chú của người chấm

        // Getter Setter
        public Long getDonId() { return donId; }
        public void setDonId(Long donId) { this.donId = donId; }
        public BigDecimal getDiemMoi() { return diemMoi; }
        public void setDiemMoi(BigDecimal diemMoi) { this.diemMoi = diemMoi; }
        public String getGhiChu() { return ghiChu; }
        public void setGhiChu(String ghiChu) { this.ghiChu = ghiChu; }
    }

    // Getter Setter Cha
    public Long getSuKienConId() { return suKienConId; }
    public void setSuKienConId(Long suKienConId) { this.suKienConId = suKienConId; }
    public List<ChiTietDiem> getDanhSachDiem() { return danhSachDiem; }
    public void setDanhSachDiem(List<ChiTietDiem> danhSachDiem) { this.danhSachDiem = danhSachDiem; }
}