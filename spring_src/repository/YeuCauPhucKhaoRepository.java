package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.DonPhucKhao;

@Repository
public interface YeuCauPhucKhaoRepository extends JpaRepository<DonPhucKhao, Long> {

    @Query("""
        SELECT d 
        FROM DonPhucKhao d
        WHERE d.suKien.id = :idSuKien
          AND (:keyword IS NULL OR LOWER(d.sinhVien.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(d.sinhVien.username) LIKE LOWER(CONCAT('%', :keyword, '%')))
          AND (:idHocPhan IS NULL OR d.hocPhan.id = :idHocPhan)
    """)
    List<DonPhucKhao> searchBySuKien(
        @Param("idSuKien") Long idSuKien,
        @Param("keyword") String keyword,
        @Param("idHocPhan") Long idHocPhan
    );
}

