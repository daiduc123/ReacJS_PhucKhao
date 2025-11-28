package com.example.demo.request;

public class ConfigTimeRequest {
    // --- Sinh viên ---
    private Integer tgSvNopDon; // Thời gian nộp đơn
    private Integer tgSvChoKq;  // Thời gian chờ kết quả

    // --- Chuyên viên khảo thí ---
    private Integer tgCvktDuyetDon; // Duyệt đơn
    private Integer tgCvktKiemTraTroly; // Kiểm tra điểm (hoặc biến khác tùy DB bạn map)

    // --- Trợ lý đào tạo ---
    private Integer tgTrolyTimHoSo; // Tìm hồ sơ
    private Integer tgTrolyNhapDiem; // Nhập điểm
    private Integer tgTrolyCapNhat; // Cập nhật (nếu có trên giao diện)

    public ConfigTimeRequest() {}

    // --- GETTER & SETTER (Tự sinh bằng Alt+Insert) ---
    public Integer getTgSvNopDon() { return tgSvNopDon; }
    public void setTgSvNopDon(Integer tgSvNopDon) { this.tgSvNopDon = tgSvNopDon; }

    public Integer getTgSvChoKq() { return tgSvChoKq; }
    public void setTgSvChoKq(Integer tgSvChoKq) { this.tgSvChoKq = tgSvChoKq; }

    public Integer getTgCvktDuyetDon() { return tgCvktDuyetDon; }
    public void setTgCvktDuyetDon(Integer tgCvktDuyetDon) { this.tgCvktDuyetDon = tgCvktDuyetDon; }

    public Integer getTgCvktKiemTraTroly() { return tgCvktKiemTraTroly; }
    public void setTgCvktKiemTraTroly(Integer tgCvktKiemTraTroly) { this.tgCvktKiemTraTroly = tgCvktKiemTraTroly; }

    public Integer getTgTrolyTimHoSo() { return tgTrolyTimHoSo; }
    public void setTgTrolyTimHoSo(Integer tgTrolyTimHoSo) { this.tgTrolyTimHoSo = tgTrolyTimHoSo; }

    public Integer getTgTrolyNhapDiem() { return tgTrolyNhapDiem; }
    public void setTgTrolyNhapDiem(Integer tgTrolyNhapDiem) { this.tgTrolyNhapDiem = tgTrolyNhapDiem; }

    public Integer getTgTrolyCapNhat() { return tgTrolyCapNhat; }
    public void setTgTrolyCapNhat(Integer tgTrolyCapNhat) { this.tgTrolyCapNhat = tgTrolyCapNhat; }
}