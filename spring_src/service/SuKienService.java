package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.request.CreateSuKienRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class SuKienService {

    @Autowired
    private SuKienPhucKhaoRepository suKienRepo; 

    @Autowired
    private SuKienPhucKhaoHocPhanRepository suKienConRepo; 

    @Autowired
    private LopHocPhanRepository lopHocPhanRepo; 

    @Autowired
    private CauHinhRepository configRepo; 

    @Transactional 
    public void createSuKien(CreateSuKienRequest req) {
        
        // --- BỔ SUNG 1: CHECK TRÙNG SỰ KIỆN ---
        if (suKienRepo.existsByHocKyAndNamHoc(req.getHocKy(), req.getNamHoc())) {
            throw new RuntimeException("Sự kiện phúc khảo cho " + req.getHocKy() + " năm " + req.getNamHoc() + " đã tồn tại!");
        }

        // 1. LẤY CHI PHÍ
        CauHinhHeThong config = configRepo.findById(1L).orElse(null);
        BigDecimal lePhiMacDinh = (config != null && config.getChiPhiMacDinh() != null) 
                                  ? config.getChiPhiMacDinh() 
                                  : new BigDecimal("30000");

        // 2. TẠO SỰ KIỆN CHA
        SuKienPhucKhao suKienCha = new SuKienPhucKhao();
        suKienCha.setTenSuKien(req.getTenSuKien());
        suKienCha.setHocKy(req.getHocKy()); 
        suKienCha.setNamHoc(req.getNamHoc());
        suKienCha.setNgayBatDau(req.getNgayBatDau());
        suKienCha.setNgayKetThuc(req.getNgayKetThuc());
        suKienCha.setLePhi(lePhiMacDinh);
        suKienCha.setTrangThai("DANG_MO");

        suKienRepo.save(suKienCha);

        // 3. TẠO SỰ KIỆN CON (TỰ ĐỘNG TỪ THỜI KHÓA BIỂU)
        List<LopHocPhan> listLop = lopHocPhanRepo.findByHocKyAndNamHoc(req.getHocKy(), req.getNamHoc());

        // Kiểm tra nếu không có lớp nào mở -> Báo lỗi để Admin biết
        if (listLop.isEmpty()) {
            throw new RuntimeException("Không tìm thấy lớp học phần nào trong " + req.getHocKy() + " - " + req.getNamHoc());
        }

        for (LopHocPhan lhp : listLop) {
            
            SuKienPhucKhaoHocPhan suKienCon = new SuKienPhucKhaoHocPhan();
            
            suKienCon.setSuKienTong(suKienCha);
            
            // --- COPY DỮ LIỆU CHÍNH ---
            suKienCon.setHocPhan(lhp.getHocPhan()); // Copy Môn
            suKienCon.setNhomLop(lhp.getNhomLop()); // Copy Nhóm (01, 02...)
            
            // --- TỰ ĐỘNG GÁN GIẢNG VIÊN ---
            // Nếu Lớp học phần đã có GV dạy -> Gán luôn làm người chấm
            if (lhp.getGiangVien() != null) {
                suKienCon.setGiangVien(lhp.getGiangVien());
            }
            
            // --- CÁC THÔNG SỐ KHÁC ---
            suKienCon.setTrangThai("DANG_NHAN_DON");
            suKienCon.setLePhi(lePhiMacDinh);
            suKienCon.setSoLuongDon(0);
            suKienCon.setNamHoc(req.getNamHoc());

            // --- BỔ SUNG 2: XỬ LÝ LỖI ENUM ---
            try {
                suKienCon.setHocKy(HocKy.valueOf(req.getHocKy())); 
            } catch (IllegalArgumentException e) {
                System.err.println("Lỗi tên học kỳ: " + req.getHocKy() + ". Vui lòng kiểm tra lại Enum.");
                // Có thể gán mặc định nếu muốn: suKienCon.setHocKy(HocKy.KY_1);
            }

            suKienConRepo.save(suKienCon);
        }
    }
}