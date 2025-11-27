package com.example.demo.request;

import java.math.BigDecimal;

public class ConfigCostPaymentRequest {

    private BigDecimal chiPhiMacDinh; // Số tiền
    private String tenTk;             // Tên chủ TK
    private String soTk;              // Số TK
    private String nganHang;          // Tên ngân hàng

    public ConfigCostPaymentRequest() {}

    // --- GETTER & SETTER ---
    public BigDecimal getChiPhiMacDinh() { return chiPhiMacDinh; }
    public void setChiPhiMacDinh(BigDecimal chiPhiMacDinh) { this.chiPhiMacDinh = chiPhiMacDinh; }

    public String getTenTk() { return tenTk; }
    public void setTenTk(String tenTk) { this.tenTk = tenTk; }

    public String getSoTk() { return soTk; }
    public void setSoTk(String soTk) { this.soTk = soTk; }

    public String getNganHang() { return nganHang; }
    public void setNganHang(String nganHang) { this.nganHang = nganHang; }
}