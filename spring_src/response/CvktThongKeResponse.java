package com.example.demo.response;

import java.util.List;

public class CvktThongKeResponse {
    // 4 Thẻ số liệu
    private long tongSoDon;
    private long daXuLy;      // Số đơn đã xong
    private long chuaXuLy;    // Số đơn đang chờ
    private double tyLeHoanThanh; // Dạng phần trăm (VD: 80.5)

    // Dữ liệu biểu đồ
    private List<ThongKeMonHocDto> bieudo;

    public CvktThongKeResponse(long tongSoDon, long daXuLy, long chuaXuLy, double tyLeHoanThanh, List<ThongKeMonHocDto> bieudo) {
        this.tongSoDon = tongSoDon;
        this.daXuLy = daXuLy;
        this.chuaXuLy = chuaXuLy;
        this.tyLeHoanThanh = tyLeHoanThanh;
        this.bieudo = bieudo;
    }
    
    // Getter & Setter...
    public long getTongSoDon() { return tongSoDon; }
    public long getDaXuLy() { return daXuLy; }
    public long getChuaXuLy() { return chuaXuLy; }
    public double getTyLeHoanThanh() { return tyLeHoanThanh; }
    public List<ThongKeMonHocDto> getBieudo() { return bieudo; }
}