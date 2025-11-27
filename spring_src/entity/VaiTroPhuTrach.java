/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vai_tro_phu_trach")
public class VaiTroPhuTrach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_giang_vien", nullable = false)
    private GiangVien giangVien;

    @Column(name = "chuc_danh")
    private String chucDanh;

    public VaiTroPhuTrach() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public GiangVien getGiangVien() { return giangVien; }
    public void setGiangVien(GiangVien giangVien) { this.giangVien = giangVien; }
    public String getChucDanh() { return chucDanh; }
    public void setChucDanh(String chucDanh) { this.chucDanh = chucDanh; }
}
