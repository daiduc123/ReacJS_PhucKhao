package com.example.demo.repository;

import com.example.demo.entity.VaiTroPhuTrach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaiTroPhuTrachRepository extends JpaRepository<VaiTroPhuTrach, Long> {
    // JpaRepository đã có sẵn hàm findById
}