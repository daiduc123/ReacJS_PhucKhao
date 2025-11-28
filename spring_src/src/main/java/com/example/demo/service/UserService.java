package com.example.demo.service;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.request.UserRequest;
import com.example.demo.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 1. TÌM KIẾM & LỌC
    public List<UserResponse> search(String keyword, Role role, Boolean active) {
        return userRepo.searchUser(keyword, role, active).stream()
                .map(u -> new UserResponse(
                        u.getId(), u.getUsername(), u.getFullName(),
                        u.getEmail(), u.getPhone(), u.getRole().toString(), u.getActive()
                )).collect(Collectors.toList());
    }

    // 2. XEM CHI TIẾT
    public UserResponse getDetail(Long id) {
        User u = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User không tồn tại"));
        return new UserResponse(u.getId(), u.getUsername(), u.getFullName(), u.getEmail(), u.getPhone(), u.getRole().toString(), u.getActive());
    }

    // 3. THÊM MỚI (Có check Confirm Password)
    public void createUser(UserRequest req) {
        // A. Kiểm tra tên đăng nhập trùng
        if (userRepo.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại!");
        }

        // B. Kiểm tra Mật khẩu xác nhận (Logic quan trọng)
        if (!req.getPassword().equals(req.getConfirmPassword())) {
            throw new RuntimeException("Mật khẩu xác nhận không khớp!");
        }

        // C. Tạo Entity lưu vào DB
        User u = new User();
        u.setUsername(req.getUsername());
        u.setPassword(passwordEncoder.encode(req.getPassword())); // Mã hóa
        u.setFullName(req.getFullName());
        u.setEmail(req.getEmail());
        u.setPhone(req.getPhone());
        u.setRole(req.getRole());
        u.setActive(true); // Mặc định Hoạt động

        userRepo.save(u);
    }

    // 4. CẬP NHẬT (Không cập nhật password ở đây)
    public void updateUser(Long id, UserRequest req) {
        User u = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User không tồn tại"));
        
        u.setFullName(req.getFullName());
        u.setEmail(req.getEmail());
        u.setPhone(req.getPhone());
        u.setRole(req.getRole());
        
        // Cập nhật trạng thái nếu có gửi lên
        if (req.getActive() != null) {
            u.setActive(req.getActive());
        }

        userRepo.save(u);
    }

    // 5. ĐỔI TRẠNG THÁI NHANH (Khóa/Mở khóa)
    public void toggleUserStatus(Long id) {
        User u = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User không tồn tại"));
        
        // Nếu null thì coi như đang mở -> set thành khóa
        if (u.getActive() == null) u.setActive(true);
        
        u.setActive(!u.getActive()); // Đảo ngược trạng thái
        userRepo.save(u);
    }

    // 6. RESET MẬT KHẨU (Admin cấp lại pass)
    public void resetPassword(Long id, String newPassword) {
        User u = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User không tồn tại"));
        u.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(u);
    }

    // 7. XÓA USER
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
}