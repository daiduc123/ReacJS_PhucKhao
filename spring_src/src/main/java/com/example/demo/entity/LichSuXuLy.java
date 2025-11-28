/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lich_su_xu_ly")
public class LichSuXuLy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_don")
    private DonPhucKhao donPhucKhao;

    @ManyToOne
    @JoinColumn(name = "nguoi_thuc_hien")
    private User nguoiThucHien;

    private String hanhDong;
    private String ghiChu;
    private LocalDateTime thoiGian;

    public LichSuXuLy() {}
    
    @PrePersist
    protected void onCreate() { this.thoiGian = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public DonPhucKhao getDonPhucKhao() { return donPhucKhao; }
    public void setDonPhucKhao(DonPhucKhao donPhucKhao) { this.donPhucKhao = donPhucKhao; }
    public User getNguoiThucHien() { return nguoiThucHien; }
    public void setNguoiThucHien(User nguoiThucHien) { this.nguoiThucHien = nguoiThucHien; }
    public String getHanhDong() { return hanhDong; }
    public void setHanhDong(String hanhDong) { this.hanhDong = hanhDong; }
    public String getGhiChu() { return ghiChu; }
    public void setGhiChu(String ghiChu) { this.ghiChu = ghiChu; }
    public LocalDateTime getThoiGian() { return thoiGian; }
    public void setThoiGian(LocalDateTime thoiGian) { this.thoiGian = thoiGian; }
}