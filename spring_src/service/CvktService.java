package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.response.*; // Import các DTO

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook; // Import Excel
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CvktService {

    @Autowired private SuKienPhucKhaoHocPhanRepository suKienConRepo;
    @Autowired private DonPhucKhaoRepository donRepo;

    // =========================================================================
    // 1. HIỂN THỊ DANH SÁCH SỰ KIỆN HỌC PHẦN (Màn hình quản lý chung)
    // =========================================================================
    public List<CvktSuKienResponse> getListSuKienHocPhan(String namHoc, String hocKyStr) {
        HocKy hocKy = null;
        try {
            if (hocKyStr != null && !hocKyStr.isEmpty()) hocKy = HocKy.valueOf(hocKyStr);
        } catch (Exception e) {}

        List<SuKienPhucKhaoHocPhan> list = suKienConRepo.searchByNamHocAndHocKy(namHoc, hocKy);

        return list.stream().map(sk -> new CvktSuKienResponse(
                sk.getId(),
                sk.getHocPhan().getMaHp(),
                sk.getHocPhan().getTenHp(),
                (sk.getNhomLop() != null) ? sk.getNhomLop() : "",
                (sk.getGiangVien() != null) ? sk.getGiangVien().getHoTen() : "Chưa phân công",
                (sk.getSoLuongDon() != null) ? sk.getSoLuongDon() : 0,
                sk.getTrangThai(),
                (sk.getSuKienTong() != null) ? sk.getSuKienTong().getNgayKetThuc() : null
        )).collect(Collectors.toList());
    }

    // =========================================================================
    // 2. HIỂN THỊ CHI TIẾT ĐƠN (KÈM TÌM KIẾM & LỌC)
    // =========================================================================
    // Sửa lại hàm này nhận 3 tham số để khớp với Controller
    public List<CvktDonDetailResponse> getListDonBySuKienCon(Long suKienConId, String keyword, String trangThaiStr) {
        
        SuKienPhucKhaoHocPhan skCon = suKienConRepo.findById(suKienConId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sự kiện!"));

        // 1. Validation: Kiểm tra xem trạng thái này có được phép xem không
        List<String> trangThaiChoPhep = Arrays.asList(
                "DANG_NHAN_DON", "DA_CHUYEN_TRO_LY", "CHO_DUYET_KET_QUA", "HOAN_THANH"
        );
        if (!trangThaiChoPhep.contains(skCon.getTrangThai())) {
             throw new RuntimeException("Chưa thể xem chi tiết ở trạng thái: " + skCon.getTrangThai());
        }

        // 2. Xử lý tham số tìm kiếm (tránh null)
        if (keyword != null && keyword.trim().isEmpty()) {
            keyword = null;
        }
        
        // 3. Xử lý Enum trạng thái
        TrangThaiDon trangThaiEnum = null;
        try {
            if (trangThaiStr != null && !trangThaiStr.isEmpty()) {
                trangThaiEnum = TrangThaiDon.valueOf(trangThaiStr);
            }
        } catch (Exception e) {
            // Nếu tên trạng thái sai thì bỏ qua, không lọc
        }

        // 4. Gọi Repository (Hàm tìm kiếm nâng cao)
        // Lưu ý: Đảm bảo DonPhucKhaoRepository đã có hàm searchDonInEvent
        List<DonPhucKhao> listDon = donRepo.searchDonInEvent(
                skCon.getSuKienTong().getId(), 
                skCon.getHocPhan().getId(),
                keyword,
                trangThaiEnum
        );

        // 5. Map sang DTO hiển thị
        return listDon.stream().map(don -> new CvktDonDetailResponse(
                don.getId(),
                don.getSinhVien().getUsername(),
                don.getSinhVien().getFullName(),
                don.getNgayNop(),
                don.getDiemCu(),
                don.getDiemMoi(),
                don.getTrangThai().toString()
        )).collect(Collectors.toList());
    }
    // =========================================================================
    // 3. CHUYỂN TRẠNG THÁI SỰ KIỆN (Thủ công)
    // =========================================================================
    public void updateStatus(Long suKienConId, String newStatus) {
        SuKienPhucKhaoHocPhan sk = suKienConRepo.findById(suKienConId)
                .orElseThrow(() -> new RuntimeException("Sự kiện không tồn tại"));
        sk.setTrangThai(newStatus);
        suKienConRepo.save(sk);
    }

    // =========================================================================
    // [QUAN TRỌNG] 4. XÁC NHẬN HOÀN THÀNH (BẠN ĐANG THIẾU HÀM NÀY)
    // =========================================================================
    @Transactional
    public void xacNhanHoanThanhSuKien(Long suKienConId) {
        SuKienPhucKhaoHocPhan sk = suKienConRepo.findById(suKienConId)
                .orElseThrow(() -> new RuntimeException("Sự kiện không tồn tại"));

        // Chỉ xác nhận khi Trợ lý đã gửi kết quả lên
        if (!"CHO_DUYET_KET_QUA".equals(sk.getTrangThai())) {
            throw new RuntimeException("Chỉ xác nhận được khi đang chờ duyệt!");
        }

        // 1. Cập nhật tất cả đơn -> HOAN_THANH
        List<DonPhucKhao> listDon = donRepo.findBySuKienIdAndHocPhanId(
                sk.getSuKienTong().getId(), sk.getHocPhan().getId());
        
        for (DonPhucKhao don : listDon) {
            don.setTrangThai(TrangThaiDon.DA_HOAN_THANH);
            donRepo.save(don);
        }

        // 2. Cập nhật sự kiện -> HOAN_THANH
        sk.setTrangThai("HOAN_THANH");
        suKienConRepo.save(sk);
    }

    // =========================================================================
    // 5. XUẤT FILE EXCEL (BẢN NÂNG CẤP GIAO DIỆN ĐẸP)
    // =========================================================================
    public ByteArrayInputStream exportExcel(Long suKienConId) throws IOException {
        SuKienPhucKhaoHocPhan sk = suKienConRepo.findById(suKienConId).orElseThrow();
        List<DonPhucKhao> listDon = donRepo.findBySuKienIdAndHocPhanId(
                sk.getSuKienTong().getId(), sk.getHocPhan().getId());

        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("Danh sách phúc khảo");

            // Style Header
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);
            
            // Style Date (Quan trọng để hiển thị ngày đẹp)
            CellStyle dateStyle = workbook.createCellStyle();
            dateStyle.setDataFormat(workbook.createDataFormat().getFormat("dd/MM/yyyy HH:mm"));

            // Header Row
            Row headerRow = sheet.createRow(0);
            String[] columns = {"STT", "Mã SV", "Họ Tên", "Ngày nộp", "Điểm cũ", "Điểm mới", "Trạng thái"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            // Data Rows
            int rowIdx = 1;
            for (DonPhucKhao don : listDon) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(rowIdx - 1);
                row.createCell(1).setCellValue(don.getSinhVien().getUsername());
                row.createCell(2).setCellValue(don.getSinhVien().getFullName());
                
                // Xử lý ngày tháng
                Cell dateCell = row.createCell(3);
                if(don.getNgayNop() != null) {
                    dateCell.setCellValue(don.getNgayNop());
                    dateCell.setCellStyle(dateStyle);
                }

                row.createCell(4).setCellValue(don.getDiemCu() != null ? don.getDiemCu().doubleValue() : 0);
                row.createCell(5).setCellValue(don.getDiemMoi() != null ? don.getDiemMoi().doubleValue() : 0);
                row.createCell(6).setCellValue(don.getTrangThai().toString());
            }
            
            for(int i=0; i<columns.length; i++) sheet.autoSizeColumn(i);
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
    
    // =========================================================================
    // 6. THỐNG KÊ DASHBOARD
    // =========================================================================
    public CvktThongKeResponse getThongKe(String namHoc, String hocKyStr) {
        HocKy hocKy = null;
        try { if(hocKyStr != null) hocKy = HocKy.valueOf(hocKyStr); } catch (Exception e) {}

        if (namHoc == null || hocKy == null) return new CvktThongKeResponse(0, 0, 0, 0.0, List.of());

        long tongDon = donRepo.countTotalByKy(namHoc, hocKy);
        
        // Lưu ý: Kiểm tra lại tên Enum trong Project của bạn là HOAN_THANH hay DA_HOAN_THANH
        long daXuLy = donRepo.countByStatusAndKy(namHoc, hocKy, 
                List.of(TrangThaiDon.DA_CO_KET_QUA, TrangThaiDon.DA_HOAN_THANH, TrangThaiDon.TU_CHOI));

        long chuaXuLy = tongDon - daXuLy;
        double tyLe = (tongDon > 0) ? Math.round(((double) daXuLy / tongDon) * 100 * 100.0) / 100.0 : 0.0;
        List<ThongKeMonHocDto> chartData = donRepo.thongKeTheoMonHoc(namHoc, hocKy);

        return new CvktThongKeResponse(tongDon, daXuLy, chuaXuLy, tyLe, chartData);
    }
    
    // =========================================================================
    // 7. DANH SÁCH CHI TIẾT THỐNG KÊ
    // =========================================================================
    public List<ThongKeChiTietResponse> getThongKeChiTiet(String namHoc, String hocKyStr, String tenMonHoc) {
        HocKy hocKy = null;
        try { if(hocKyStr != null) hocKy = HocKy.valueOf(hocKyStr); } catch (Exception e) {}
        if (namHoc == null || hocKy == null) return List.of();
        if (tenMonHoc != null && tenMonHoc.isEmpty()) tenMonHoc = null;

        List<DonPhucKhao> list = donRepo.getListThongKeChiTiet(namHoc, hocKy, tenMonHoc);

        return list.stream().map(don -> new ThongKeChiTietResponse(
                don.getSinhVien().getUsername(),
                don.getSinhVien().getFullName(),
                
                // --- SỬA LỖI TẠI ĐÂY: KHÔNG GỌI .getLop() NỮA ---
                "D21CQCN01", // Gán cứng hoặc để chuỗi rỗng "" nếu chưa có dữ liệu lớp
                // ------------------------------------------------
                
                don.getHocPhan().getTenHp(),
                don.getNgayNop(),
                don.getTrangThai().toString()
        )).collect(Collectors.toList());
    }
}