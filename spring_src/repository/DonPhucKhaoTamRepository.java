package com.example.demo.repository;

import org.springframework.stereotype.Repository;

import com.example.demo.entity.DonPhucKhaoTam;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface DonPhucKhaoTamRepository extends JpaRepository<DonPhucKhaoTam, Long> {
    List<DonPhucKhaoTam> findBySinhVien_Id(Long idSv);
}

