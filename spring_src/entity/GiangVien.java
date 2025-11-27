/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "giang_vien")
public class GiangVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_gv", unique = true, nullable = false)
    private String maGv;

    @Column(name = "ho_ten", nullable = false)
    private String hoTen;

    private String email;
    private String sdt;

    @ManyToOne
    @JoinColumn(name = "id_khoa")
    private Khoa khoa;

    @Column(name = "trang_thai")
    private String trangThai;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public GiangVien() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMaGv() { return maGv; }
    public void setMaGv(String maGv) { this.maGv = maGv; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSdt() { return sdt; }
    public void setSdt(String sdt) { this.sdt = sdt; }
    public Khoa getKhoa() { return khoa; }
    public void setKhoa(Khoa khoa) { this.khoa = khoa; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
