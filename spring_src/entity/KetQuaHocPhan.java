package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ketqua")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class KetQuaHocPhan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "idSv", nullable = false)
    private Long idSv;

    @Column(name = "idHocPhan", nullable = false)
    private Long idHocPhan;

    @Column(name = "diem", precision = 4, scale = 2)
    private java.math.BigDecimal diem;
}

