package com.example.demo.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
@Table(name = "donphuckhaotam")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class DonPhucKhaoTam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // Sinh viên tạo đơn
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idSv", nullable = false)
    private User sinhVien;

    // Môn học liên quan
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idHocPhan", nullable = false)
    private HocPhan hocPhan;

    // Điểm cũ
    @Column(name = "diemCu", precision = 4, scale = 2)
    private BigDecimal diemCu;

    // Trạng thái đơn tạm
    @Enumerated(EnumType.STRING)
    @Column(name = "trangThai", length = 20, nullable = false)
    private TrangThaiDonTam trangThai = TrangThaiDonTam.DANG_XU_LY;

    // Thời gian tạo
    @Column(name = "ngayTao", nullable = false, updatable = false)
    private LocalDateTime ngayTao = LocalDateTime.now();

    // Enum trạng thái
    public enum TrangThaiDonTam {
        DANG_XU_LY,
        CHUYEN_VAO_SU_KIEN
    }
}

