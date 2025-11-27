package com.example.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "ket_qua_hoc_tap")
public class KetQuaHocTap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_sinh_vien")
    private User sinhVien;

    @ManyToOne
    @JoinColumn(name = "id_hoc_phan")
    private HocPhan hocPhan;

    @Column(name = "diem_tong_ket")
    private BigDecimal diemTongKet;

    public KetQuaHocTap() {}

    // --- GETTER & SETTER ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getSinhVien() { return sinhVien; }
    public void setSinhVien(User sinhVien) { this.sinhVien = sinhVien; }

    public HocPhan getHocPhan() { return hocPhan; }
    public void setHocPhan(HocPhan hocPhan) { this.hocPhan = hocPhan; }

    public BigDecimal getDiemTongKet() { return diemTongKet; }
    public void setDiemTongKet(BigDecimal diemTongKet) { this.diemTongKet = diemTongKet; }
}