package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "phanconggiangday")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhanCongGiangDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idGiangVien", nullable = false)
    private GiangVien giangVien;

    @ManyToOne
    @JoinColumn(name = "idHocPhan", nullable = false)
    private HocPhan hocPhan;

    @Enumerated(EnumType.STRING)
    @Column(name = "hocKy", nullable = false)
    private HocKy hocKy;

    @Column(name = "nhomLop", nullable = false, length = 50)
    private String nhomLop;
    
    @Column(name = "namHoc", nullable = false, length = 9)
    private String namHoc;
}

