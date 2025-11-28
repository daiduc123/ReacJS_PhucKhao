package com.example.demo.request;

public class PhanCongGiangVienRequest {
    private Long suKienId;   // ID sự kiện đang chọn
    private Long hocPhanId;  // ID môn học muốn phân công
    private Long giangVienId;// ID giảng viên được chọn

    // Getter & Setter
    public Long getSuKienId() { return suKienId; }
    public void setSuKienId(Long suKienId) { this.suKienId = suKienId; }
    public Long getHocPhanId() { return hocPhanId; }
    public void setHocPhanId(Long hocPhanId) { this.hocPhanId = hocPhanId; }
    public Long getGiangVienId() { return giangVienId; }
    public void setGiangVienId(Long giangVienId) { this.giangVienId = giangVienId; }
}