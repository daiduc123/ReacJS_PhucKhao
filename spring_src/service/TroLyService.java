package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.request.NhapDiemRequest;
import com.example.demo.request.NhapPhachRequest;
import com.example.demo.response.TroLyDonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TroLyService {

    @Autowired private SuKienPhucKhaoHocPhanRepository suKienConRepo;
    @Autowired private DonPhucKhaoRepository donRepo;

    // ========================================================================
    // GIAI ĐOẠN 1: NHẬP PHÁCH (Khi CVKT vừa chuyển sang)
    // Trạng thái sự kiện: DA_CHUYEN_TRO_LY
    // ========================================================================

    // 1.1. LẤY DANH SÁCH ĐỂ NHẬP PHÁCH
    public List<TroLyDonResponse> getDanhSachNhapPhach(Long suKienConId) {
        SuKienPhucKhaoHocPhan sk = suKienConRepo.findById(suKienConId).orElseThrow();

        if (!"DA_CHUYEN_TRO_LY".equals(sk.getTrangThai())) {
            throw new RuntimeException("Sự kiện này không ở trạng thái nhập phách!");
        }

        return mapToDto(sk);
    }

    // 1.2. LƯU SỐ TÚI / SỐ PHÁCH (Nút "Lưu")
    @Transactional
    public void luuPhach(NhapPhachRequest req) {
        for (NhapPhachRequest.ChiTietPhach item : req.getDanhSachPhach()) {
            DonPhucKhao don = donRepo.findById(item.getDonId())
                    .orElseThrow(() -> new RuntimeException("Đơn không tồn tại ID: " + item.getDonId()));

            don.setSoTui(item.getSoTui());
            don.setSoPhach(item.getSoPhach());

            // LOGIC: Nếu đã nhập đủ Túi & Phách -> Đổi trạng thái đơn thành "ĐÃ TÌM THẤY" (Màu xanh)
            if (item.getSoTui() != null && !item.getSoTui().isEmpty() &&
                item.getSoPhach() != null && !item.getSoPhach().isEmpty()) {
                don.setTrangThai(TrangThaiDon.DA_TIM_THAY);
            }

            donRepo.save(don);
        }
    }

    // 1.3. XÁC NHẬN CHUYỂN SANG NHẬP ĐIỂM (Nút "Xác nhận")
    // Hành động: Khóa nhập phách, chuyển sang màn hình nhập điểm
    @Transactional
    public void xacNhanChuyenSangNhapDiem(Long suKienConId) {
        SuKienPhucKhaoHocPhan sk = suKienConRepo.findById(suKienConId).orElseThrow();
        
        // Chuyển trạng thái sự kiện -> CHO_NHAP_DIEM
        sk.setTrangThai("CHO_NHAP_DIEM");
        suKienConRepo.save(sk);
    }

    // ========================================================================
    // GIAI ĐOẠN 2: CHẤM ĐIỂM (Sau khi đã làm phách xong)
    // Trạng thái sự kiện: CHO_NHAP_DIEM
    // ========================================================================

    // 2.1. LẤY DANH SÁCH ĐỂ NHẬP ĐIỂM
    public List<TroLyDonResponse> getDanhSachNhapDiem(Long suKienConId) {
        SuKienPhucKhaoHocPhan sk = suKienConRepo.findById(suKienConId).orElseThrow();

        if (!"CHO_NHAP_DIEM".equals(sk.getTrangThai())) {
            throw new RuntimeException("Sự kiện này chưa đến bước nhập điểm!");
        }

        return mapToDto(sk);
    }

    // 2.2. LƯU ĐIỂM TẠM (Nút "Lưu điểm")
    // Hành động: Chỉ lưu dữ liệu, không đổi trạng thái
    @Transactional
    public void luuDiemTam(NhapDiemRequest req) {
        for (NhapDiemRequest.ChiTietDiem item : req.getDanhSachDiem()) {
            DonPhucKhao don = donRepo.findById(item.getDonId()).orElseThrow();

            // Validate điểm (0 - 10)
            if (item.getDiemMoi() != null) {
                double d = item.getDiemMoi().doubleValue();
                if (d < 0 || d > 10) throw new RuntimeException("Điểm không hợp lệ: " + d);
            }

            don.setDiemMoi(item.getDiemMoi());
            donRepo.save(don);
        }
    }

    // 2.3. XÁC NHẬN HOÀN THÀNH & GỬI CVKT (Nút "Gửi kết quả")
    // Hành động: Kiểm tra đủ điểm -> Chuyển sang CHỜ DUYỆT
    @Transactional
    public void xacNhanHoanThanh(Long suKienConId) {
        SuKienPhucKhaoHocPhan sk = suKienConRepo.findById(suKienConId).orElseThrow();
        
        // 1. Lấy tất cả đơn
        List<DonPhucKhao> listDon = donRepo.findBySuKienIdAndHocPhanId(
                sk.getSuKienTong().getId(), sk.getHocPhan().getId());

        if (listDon.isEmpty()) throw new RuntimeException("Danh sách trống!");

        // 2. KIỂM TRA BẮT BUỘC: Phải nhập đủ điểm mới cho tất cả
        for (DonPhucKhao don : listDon) {
            if (don.getDiemMoi() == null) {
                throw new RuntimeException("Sinh viên (Phách: " + don.getSoPhach() + ") chưa có điểm mới. Vui lòng nhập đủ!");
            }
        }

        // 3. Chuyển trạng thái từng đơn -> CHO_DUYET_KET_QUA
        for (DonPhucKhao don : listDon) {
            don.setTrangThai(TrangThaiDon.CHO_DUYET_KET_QUA);
            donRepo.save(don);
        }

        // 4. Chuyển trạng thái sự kiện -> CHO_DUYET_KET_QUA (CVKT sẽ thấy)
        sk.setTrangThai("CHO_DUYET_KET_QUA");
        suKienConRepo.save(sk);
    }

    // ========================================================================
    // GIAI ĐOẠN 3: XEM LẠI / ĐÃ HOÀN THÀNH
    // Trạng thái sự kiện: CHO_DUYET_KET_QUA hoặc HOAN_THANH
    // ========================================================================
    
    public List<TroLyDonResponse> getDanhSachHoanThanh(Long suKienConId) {
        SuKienPhucKhaoHocPhan sk = suKienConRepo.findById(suKienConId).orElseThrow();

        // Chỉ cho phép xem khi đã gửi kết quả đi
        if (!"CHO_DUYET_KET_QUA".equals(sk.getTrangThai()) && 
            !"HOAN_THANH".equals(sk.getTrangThai())) {
            throw new RuntimeException("Sự kiện này chưa hoàn thành để xem lịch sử!");
        }

        return mapToDto(sk);
    }

    // ========================================================================
    // HÀM PHỤ TRỢ: MAP DỮ LIỆU SANG DTO
    // Dùng chung cho cả 3 giai đoạn để đảm bảo dữ liệu hiển thị nhất quán
    // ========================================================================
    private List<TroLyDonResponse> mapToDto(SuKienPhucKhaoHocPhan sk) {
        List<DonPhucKhao> listDon = donRepo.findBySuKienIdAndHocPhanId(
                sk.getSuKienTong().getId(), sk.getHocPhan().getId());

        return listDon.stream().map(don -> new TroLyDonResponse(
                don.getId(),
                don.getSinhVien().getUsername(),  // Mã SV
                don.getSinhVien().getFullName(),  // Tên SV
                
                // Ngày sinh: BỎ (Theo yêu cầu của bạn)
                // don.getSinhVien().getDob(),    
                
                // Lớp (Nếu User có field lop thì thay vào đây, tạm thời fix cứng demo)
                "D21CQCN01",                      
                
                don.getHocPhan().getTenHp(),      // Tên môn
                don.getNgayNop(),                 // Ngày nộp đơn
                
                // --- THÔNG TIN THI (Lấy từ Đơn) ---
                don.getNgayThi(),                 // Ngày thi
                don.getPhongThi(),                // Phòng thi
                // --------------------------------
                
                don.getDiemCu(),                  // Điểm cũ
                don.getDiemMoi(),                 // Điểm mới (Giai đoạn 2, 3 sẽ có)
                don.getSoTui(),                   // Số túi
                don.getSoPhach(),                 // Số phách
                
                don.getTrangThai().toString()     // Trạng thái
        )).collect(Collectors.toList());
    }
}