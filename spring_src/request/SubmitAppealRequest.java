package com.example.demo.request;

import java.util.List;

public class SubmitAppealRequest {
    private Long sinhVienId;          // ID sinh viên
    private Long suKienId;            // ID đợt phúc khảo hiện tại
    private List<Long> listHocPhanId; // Danh sách các môn đã tích chọn

    // Không cần gửi điểm, không cần gửi tiền, không cần gửi tên môn...
    
    public SubmitAppealRequest() {}

    // Getters Setters
    public Long getSinhVienId() { return sinhVienId; }
    public void setSinhVienId(Long sinhVienId) { this.sinhVienId = sinhVienId; }
    public Long getSuKienId() { return suKienId; }
    public void setSuKienId(Long suKienId) { this.suKienId = suKienId; }
    public List<Long> getListHocPhanId() { return listHocPhanId; }
    public void setListHocPhanId(List<Long> listHocPhanId) { this.listHocPhanId = listHocPhanId; }
}