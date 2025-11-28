package com.example.demo.response;

import java.util.List;

public class AppealDashboardResponse {
    // Phần 1: Thống kê (4 ô trên cùng)
    private long tongSoDon;
    private long dangXuLy;   // Gồm: Đã nộp, Đang chấm...
    private long hoanThanh;  // Gồm: Đã có kết quả
    private long biTuChoi;   // Gồm: Từ chối, Hủy

    // Phần 2: Danh sách đơn (Bảng bên dưới)
    private List<AppealHistoryResponse> danhSachDon;

    public AppealDashboardResponse(long tongSoDon, long dangXuLy, long hoanThanh, long biTuChoi, List<AppealHistoryResponse> danhSachDon) {
        this.tongSoDon = tongSoDon;
        this.dangXuLy = dangXuLy;
        this.hoanThanh = hoanThanh;
        this.biTuChoi = biTuChoi;
        this.danhSachDon = danhSachDon;
    }

    // Getter Setter...
    public long getTongSoDon() { return tongSoDon; }
    public long getDangXuLy() { return dangXuLy; }
    public long getHoanThanh() { return hoanThanh; }
    public long getBiTuChoi() { return biTuChoi; }
    public List<AppealHistoryResponse> getDanhSachDon() { return danhSachDon; }
}