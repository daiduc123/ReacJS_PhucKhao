package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

@Entity
@Table(name = "lichsuphuckhaosv")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class LichSuPhucKhaoSV {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idSv", nullable = false)
    private User sinhVien;

    @Column(name = "tongSoDon")
    private Integer tongSoDon = 0;

    @Column(name = "soDonHoanTat")
    private Integer soDonHoanTat = 0;

    @Column(name = "soDonChuaHoanTat")
    private Integer soDonChuaHoanTat = 0;

    @Column(name = "soDonDiemThayDoi")
    private Integer soDonDiemThayDoi = 0;

    @Column(name = "soDonDiemGiuNguyen")
    private Integer soDonDiemGiuNguyen = 0;

    @Column(name = "thoiDiemCapNhat")
    private LocalDateTime thoiDiemCapNhat = LocalDateTime.now();
}

