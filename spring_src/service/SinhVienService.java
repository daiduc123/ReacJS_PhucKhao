package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.request.SubmitAppealRequest;
import com.example.demo.response.AppealDashboardResponse;
import com.example.demo.response.AppealHistoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SinhVienService {

    @Autowired private UserRepository userRepo;
    @Autowired private DonPhucKhaoRepository donRepo;
    @Autowired private SuKienPhucKhaoHocPhanRepository suKienConRepo;
    @Autowired private KetQuaHocTapRepository ketQuaRepo;
    @Autowired private HocPhanRepository hocPhanRepo;
    
    // --- 1. THÊM REPO THÔNG BÁO ---
    @Autowired private ThongBaoRepository thongBaoRepo; 

    @Transactional
    public void submitAppeal(SubmitAppealRequest req) {
        // 1. Kiểm tra Sinh viên
        User sv = userRepo.findById(req.getSinhVienId())
                .orElseThrow(() -> new RuntimeException("Sinh viên không tồn tại!"));

        if (req.getListHocPhanId() == null || req.getListHocPhanId().isEmpty()) {
            throw new RuntimeException("Vui lòng chọn ít nhất một môn học!");
        }

        // --- 2. KHỞI TẠO BIẾN ĐỂ TÍNH TOÁN CHO THÔNG BÁO ---
        BigDecimal tongTien = BigDecimal.ZERO;
        List<String> tenCacMon = new ArrayList<>(); 

        // 3. Duyệt qua từng môn học được tích chọn
        for (Long hpId : req.getListHocPhanId()) {
            
            // --- BƯỚC A: LẤY DỮ LIỆU TỪ DATABASE ---
            
            SuKienPhucKhaoHocPhan skCon = suKienConRepo.findBySuKienTongIdAndHocPhanId(req.getSuKienId(), hpId)
                    .orElseThrow(() -> new RuntimeException("Môn học này không có trong đợt phúc khảo!"));

            KetQuaHocTap kq = ketQuaRepo.findBySinhVienIdAndHocPhanId(req.getSinhVienId(), hpId);
            if (kq == null) {
                throw new RuntimeException("Không tìm thấy điểm thi của môn này!");
            }

            if (donRepo.existsBySinhVienIdAndSuKienIdAndHocPhanId(req.getSinhVienId(), req.getSuKienId(), hpId)) {
                throw new RuntimeException("Bạn đã nộp đơn môn " + skCon.getHocPhan().getTenHp() + " rồi!");
            }

            // --- BƯỚC B: TỰ ĐỘNG TẠO ĐƠN ---
            
            DonPhucKhao don = new DonPhucKhao();
            don.setSinhVien(sv);
            don.setSuKien(skCon.getSuKienTong()); 
            don.setHocPhan(skCon.getHocPhan());   
            
            don.setDiemCu(kq.getDiemTongKet());     
            don.setLePhi(skCon.getLePhi());         
            don.setNgayNop(LocalDateTime.now());    
            don.setTrangThai(TrangThaiDon.DA_NOP);  

            donRepo.save(don);

            // --- BƯỚC C: CẬP NHẬT SỐ LƯỢNG ĐƠN (+1) ---
            if (skCon.getSoLuongDon() == null) skCon.setSoLuongDon(0);
            skCon.setSoLuongDon(skCon.getSoLuongDon() + 1);
            suKienConRepo.save(skCon);

            // --- BƯỚC D: CỘNG DỒN THÔNG TIN CHO THÔNG BÁO ---
            tongTien = tongTien.add(skCon.getLePhi());
            tenCacMon.add(skCon.getHocPhan().getTenHp());
        }

        // --- 4. GỬI THÔNG BÁO SAU KHI LƯU THÀNH CÔNG ---

        // A. Gửi cho Sinh viên (Xác nhận)
        String noiDungSv = "Bạn đã nộp đơn thành công cho các môn: " + String.join(", ", tenCacMon) + 
                           ". Tổng tiền đã thanh toán: " + tongTien + " VNĐ.";
        createThongBaoSystem(sv, "Nộp đơn phúc khảo thành công", noiDungSv, Role.SINHVIEN);

        // B. Gửi cho CVKT/Admin (Báo cáo)
        String noiDungAdmin = "Sinh viên " + sv.getFullName() + " (" + sv.getUsername() + ") vừa nộp " + 
                              req.getListHocPhanId().size() + " đơn phúc khảo. Tổng tiền: " + tongTien;
        createThongBaoSystem(null, "Có đơn phúc khảo mới", noiDungAdmin, Role.CVKT);
    }

    // --- 5. HÀM PHỤ TẠO THÔNG BÁO ---
    private void createThongBaoSystem(User nguoiNhanCuThe, String tieuDe, String noiDung, Role roleNhan) {
        ThongBao tb = new ThongBao();
        tb.setTieuDe(tieuDe);
        tb.setNoiDung(noiDung);
        tb.setThoiGian(LocalDateTime.now());
        
        // Mặc định là thông báo hệ thống
        tb.setLoaiThongBao(LoaiThongBao.HE_THONG); 

        // Set Role người nhận
        tb.setNguoiNhanRole(roleNhan);

        // Người gửi là Hệ thống (Lấy Admin ID=1 làm đại diện)
        // Nếu không tìm thấy thì để null (tùy DB của bạn có cho phép null không)
        User admin = userRepo.findById(1L).orElse(null); 
        tb.setNguoiGui(admin);

        thongBaoRepo.save(tb);
    }
    
    // API LẤY DASHBOARD (Thống kê + Danh sách ban đầu)
    public AppealDashboardResponse getHistoryDashboard(Long svId, String hocKy, String namHoc, String trangThai) {
        
        // --- 1. TÍNH TOÁN THỐNG KÊ (4 Ô TRÊN CÙNG) ---
        long tong = donRepo.countBySinhVienId(svId);

        // Quy ước nhóm trạng thái (Tùy enum của bạn)
        long dangXuLy = donRepo.countBySinhVienIdAndTrangThaiIn(svId, 
                List.of("DA_NOP", "CHO_THANH_TOAN", "DANG_CHAM", "DANG_XL"));
        
        long hoanThanh = donRepo.countBySinhVienIdAndTrangThaiIn(svId, 
                List.of("DA_CO_KET_QUA", "HOAN_THANH"));
        
        long tuChoi = donRepo.countBySinhVienIdAndTrangThaiIn(svId, 
                List.of("TU_CHOI", "DA_HUY"));

        // --- 2. LẤY DANH SÁCH THEO BỘ LỌC ---
        // Nếu không chọn gì thì hocKy, namHoc, trangThai sẽ là null -> Lấy hết
        List<DonPhucKhao> listDon = donRepo.searchDonPhucKhao(svId, hocKy, namHoc, trangThai);

        // Map sang DTO
        List<AppealHistoryResponse> listDto = listDon.stream().map(don -> {
             // Logic xác định kết quả (Tăng/Giảm/Giữ nguyên) như bài trước
             String txtKetQua = "Chưa có";
             if (don.getDiemMoi() != null) {
                 int ss = don.getDiemMoi().compareTo(don.getDiemCu());
                 if (ss > 0) txtKetQua = "Tăng điểm";
                 else if (ss < 0) txtKetQua = "Giảm điểm";
                 else txtKetQua = "Giữ nguyên";
             } else if ("TU_CHOI".equals(don.getTrangThai())) {
                 txtKetQua = "Bị từ chối";
             }

             return new AppealHistoryResponse(
                 don.getId(),
                 don.getHocPhan().getTenHp(),
                 (don.getSuKien() != null) ? don.getSuKien().getHocKy() : "",
                 (don.getSuKien() != null) ? don.getSuKien().getNamHoc() : "",
                 don.getNgayNop(),
                 don.getTrangThai().toString(),
                 txtKetQua,
                 don.getDiemCu(),
                 don.getDiemMoi()
             );
        }).collect(Collectors.toList());

        return new AppealDashboardResponse(tong, dangXuLy, hoanThanh, tuChoi, listDto);
    }
}