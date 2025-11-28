package com.example.demo.service;

import com.example.demo.entity.Role;
import com.example.demo.entity.ThongBao;
import com.example.demo.entity.User;
import com.example.demo.repository.ThongBaoRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.request.CreateThongBaoRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ThongBaoService {

    @Autowired
    private ThongBaoRepository thongBaoRepo;

    @Autowired
    private UserRepository userRepo;

    // --- 1. GỬI THÔNG BÁO (Áp dụng ma trận phân quyền) ---
    public void guiThongBao(CreateThongBaoRequest req) {
        // Lấy thông tin người gửi
        User sender = userRepo.findById(req.getNguoiGuiId())
                .orElseThrow(() -> new RuntimeException("Người gửi không tồn tại!"));

        Role senderRole = sender.getRole();
        Role targetRole = req.getNguoiNhanRole();

        // === KIỂM TRA QUYỀN GỬI ===
        checkQuyenGui(senderRole, targetRole);

        // Nếu hợp lệ thì lưu
        ThongBao tb = new ThongBao();
        tb.setTieuDe(req.getTieuDe());
        tb.setNoiDung(req.getNoiDung());
        tb.setNguoiGui(sender);
        tb.setNguoiNhanRole(targetRole);
        tb.setLoaiThongBao(req.getLoaiThongBao());
        tb.setThoiGian(LocalDateTime.now());

        thongBaoRepo.save(tb);
    }

    // --- LOGIC MA TRẬN GỬI ---
    private void checkQuyenGui(Role senderRole, Role targetRole) {
        // 1. SINH VIÊN: Không được gửi
        if (senderRole == Role.SINHVIEN) {
            throw new RuntimeException("Sinh viên không có quyền gửi thông báo!");
        }

        // 2. ADMIN: Gửi được cho TẤT CẢ (Không cần check thêm)
        if (senderRole == Role.ADMIN) {
            return; 
        }

        // 3. TRỢ LÝ: Chỉ gửi được cho SINH VIÊN và CVKT
        if (senderRole == Role.TROLY) {
            if (targetRole == Role.SINHVIEN || targetRole == Role.CVKT) {
                return; // Hợp lệ
            } else {
                throw new RuntimeException("Trợ lý chỉ được gửi cho Sinh viên hoặc CVKT!");
            }
        }

        // 4. CVKT: Chỉ gửi được cho ADMIN và TRỢ LÝ
        if (senderRole == Role.CVKT) {
            if (targetRole == Role.ADMIN || targetRole == Role.TROLY) {
                return; // Hợp lệ
            } else {
                throw new RuntimeException("CVKT chỉ được gửi cho Admin hoặc Trợ lý!");
            }
        }
        
        // Mặc định chặn nếu không khớp case nào
        throw new RuntimeException("Quyền gửi không hợp lệ!");
    }

    // --- 2. XEM DANH SÁCH (Của tôi) ---
    public List<ThongBao> getMyNotifications(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
        // Lấy thông báo gửi đến Role của tôi
        return thongBaoRepo.findByNguoiNhanRoleOrderByThoiGianDesc(user.getRole());
    }

    // --- 3. ĐỌC CHI TIẾT (Kiểm tra xem có đúng gửi cho tôi không) ---
    public ThongBao docChiTiet(Long thongBaoId, Long userId) {
        ThongBao tb = thongBaoRepo.findById(thongBaoId)
                .orElseThrow(() -> new RuntimeException("Thông báo không tồn tại!"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User không tồn tại!"));

        // Bảo mật: Chỉ xem được nếu thông báo này gửi cho Role của mình
        // (Hoặc mình là người gửi, hoặc mình là Admin)
        if (tb.getNguoiNhanRole() == user.getRole() || 
            tb.getNguoiGui().getId().equals(userId) || 
            user.getRole() == Role.ADMIN) {
            return tb;
        } else {
            throw new RuntimeException("Bạn không có quyền xem thông báo này!");
        }
    }
}