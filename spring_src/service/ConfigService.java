package com.example.demo.service;

import com.example.demo.entity.CauHinhHeThong;
import com.example.demo.repository.CauHinhRepository;
import com.example.demo.request.ConfigCostPaymentRequest;
import com.example.demo.request.ConfigTimeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.*;
import java.util.UUID;

@Service
public class ConfigService {

    @Autowired
    private CauHinhRepository configRepo;

    private final String UPLOAD_DIR = "uploads/";

    // --- HÀM TẠO URL ẢNH TỰ ĐỘNG ---
    private String generateFullUrl(String fileName) {
        if (fileName == null || fileName.isEmpty()) return null;
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        return baseUrl + "/" + UPLOAD_DIR + fileName;
    }

    // --- HÀM LẤY CẤU HÌNH (Tự động điền link ảnh) ---
    public CauHinhHeThong getConfig() {
        CauHinhHeThong config = configRepo.findById(1L).orElseGet(() -> {
            CauHinhHeThong newConfig = new CauHinhHeThong();
            return configRepo.save(newConfig);
        });

        // Gán link ảnh đầy đủ vào biến @Transient để Frontend hiển thị
        config.setQrCodeUrl(generateFullUrl(config.getQrCode()));
        
        return config;
    }

    // --- CẬP NHẬT CHI PHÍ & THANH TOÁN (KÈM ẢNH) ---
    public CauHinhHeThong updateCostAndPayment(ConfigCostPaymentRequest req, MultipartFile qrFile) throws IOException {
        
        // 1. Validate tiền (nếu có nhập)
        if (req.getChiPhiMacDinh() != null && req.getChiPhiMacDinh().compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException("Chi phí không được là số âm!");
        }

        CauHinhHeThong config = getConfig(); // Lấy cấu hình cũ

        // 2. Cập nhật thông tin Text
        if (req.getChiPhiMacDinh() != null) config.setChiPhiMacDinh(req.getChiPhiMacDinh());
        if (req.getTenTk() != null) config.setTenTk(req.getTenTk());
        if (req.getSoTk() != null) config.setSoTk(req.getSoTk());
        if (req.getNganHang() != null) config.setNganHang(req.getNganHang());

        // 3. Xử lý File ảnh (Nếu có chọn ảnh mới)
        if (qrFile != null && !qrFile.isEmpty()) {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            // Lưu file
            String fileName = UUID.randomUUID().toString() + "_" + qrFile.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(qrFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            // Lưu tên file vào DB
            config.setQrCode(fileName);
        }

        // 4. Lưu và trả về kết quả (kèm link ảnh mới)
        CauHinhHeThong saved = configRepo.save(config);
        saved.setQrCodeUrl(generateFullUrl(saved.getQrCode()));
        
        return saved;
    }
    
    // --- CẬP NHẬT THỜI GIAN (Tab 2) ---
    public CauHinhHeThong updateTime(ConfigTimeRequest req) {
        CauHinhHeThong config = getConfig();
        
        // Cập nhật từng trường
        if(req.getTgSvNopDon() != null) config.setTgSvNopDon(req.getTgSvNopDon());
        if(req.getTgSvChoKq() != null) config.setTgSvChoKq(req.getTgSvChoKq());
        
        if(req.getTgCvktDuyetDon() != null) config.setTgCvktDuyetDon(req.getTgCvktDuyetDon());
        if(req.getTgCvktKiemTraTroly() != null) config.setTgCvktKiemTraTroly(req.getTgCvktKiemTraTroly());
        
        if(req.getTgTrolyTimHoSo() != null) config.setTgTrolyTimHoSo(req.getTgTrolyTimHoSo());
        if(req.getTgTrolyNhapDiem() != null) config.setTgTrolyNhapDiem(req.getTgTrolyNhapDiem());
        if(req.getTgTrolyCapNhat() != null) config.setTgTrolyCapNhat(req.getTgTrolyCapNhat());

        return configRepo.save(config);
    }
}