/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "thong_bao")
public class ThongBao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tieuDe;
    
    @Column(columnDefinition = "TEXT")
    private String noiDung;

    @ManyToOne
    @JoinColumn(name = "nguoi_gui")
    private User nguoiGui;

    @Enumerated(EnumType.STRING)
    private Role nguoiNhanRole; 

    @Enumerated(EnumType.STRING)
    private LoaiThongBao loaiThongBao;

    private LocalDateTime thoiGian;

    public ThongBao() {}
    // Getters Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTieuDe() { return tieuDe; }
    public void setTieuDe(String tieuDe) { this.tieuDe = tieuDe; }
    public String getNoiDung() { return noiDung; }
    public void setNoiDung(String noiDung) { this.noiDung = noiDung; }
    public User getNguoiGui() { return nguoiGui; }
    public void setNguoiGui(User nguoiGui) { this.nguoiGui = nguoiGui; }
    public Role getNguoiNhanRole() { return nguoiNhanRole; }
    public void setNguoiNhanRole(Role nguoiNhanRole) { this.nguoiNhanRole = nguoiNhanRole; }
    public LoaiThongBao getLoaiThongBao() { return loaiThongBao; }
    public void setLoaiThongBao(LoaiThongBao loaiThongBao) { this.loaiThongBao = loaiThongBao; }
    public LocalDateTime getThoiGian() { return thoiGian; }
    public void setThoiGian(LocalDateTime thoiGian) { this.thoiGian = thoiGian; }
}
