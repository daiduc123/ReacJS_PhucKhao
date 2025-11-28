/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.entity;


import jakarta.persistence.*;


@Entity
@Table(name = "khoa")

public class Khoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_khoa", unique = true, nullable = false)
    private String maKhoa;

    @Column(name = "ten_khoa", nullable = false)
    private String tenKhoa;

    @Column(name = "id_truong_khoa")
    private Long idTruongKhoa; 

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaKhoa() {
        return maKhoa;
    }

    public void setMaKhoa(String maKhoa) {
        this.maKhoa = maKhoa;
    }

    public String getTenKhoa() {
        return tenKhoa;
    }

    public void setTenKhoa(String tenKhoa) {
        this.tenKhoa = tenKhoa;
    }

    public Long getIdTruongKhoa() {
        return idTruongKhoa;
    }

    public void setIdTruongKhoa(Long idTruongKhoa) {
        this.idTruongKhoa = idTruongKhoa;
    }
    
}
