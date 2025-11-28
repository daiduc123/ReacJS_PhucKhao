package com.example.demo.request;

import java.util.List;

public class NhapPhachRequest {
    private Long suKienConId; // ID sự kiện đang làm việc
    private List<ChiTietPhach> danhSachPhach; // Danh sách nhập liệu

    // Class con để hứng dữ liệu từng dòng
    public static class ChiTietPhach {
        private Long donId;
        private String soTui;
        private String soPhach;

        // Getter Setter
        public Long getDonId() { return donId; }
        public void setDonId(Long donId) { this.donId = donId; }
        public String getSoTui() { return soTui; }
        public void setSoTui(String soTui) { this.soTui = soTui; }
        public String getSoPhach() { return soPhach; }
        public void setSoPhach(String soPhach) { this.soPhach = soPhach; }
    }

    // Getter Setter cha
    public Long getSuKienConId() { return suKienConId; }
    public void setSuKienConId(Long suKienConId) { this.suKienConId = suKienConId; }
    public List<ChiTietPhach> getDanhSachPhach() { return danhSachPhach; }
    public void setDanhSachPhach(List<ChiTietPhach> danhSachPhach) { this.danhSachPhach = danhSachPhach; }
}