/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.demo.repository;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    
    // Kiểm tra xem username đã tồn tại chưa (dùng khi tạo mới)
    boolean existsByUsername(String username);
    
    // --- HÀM TÌM KIẾM NÂNG CAO ---
    // Tìm theo từ khóa (tên, user, email) VÀ theo Role VÀ theo Trạng thái
    @Query("SELECT u FROM User u WHERE " +
           "(:keyword IS NULL OR u.fullName LIKE %:keyword% OR u.username LIKE %:keyword% OR u.email LIKE %:keyword%) AND " +
           "(:role IS NULL OR u.role = :role) AND " +
           "(:active IS NULL OR u.active = :active)")
    List<User> searchUser(
            @Param("keyword") String keyword,
            @Param("role") Role role,
            @Param("active") Boolean active
    );
}