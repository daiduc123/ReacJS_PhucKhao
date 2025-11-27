CREATE DATABASE  IF NOT EXISTS `phuc_khao` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `phuc_khao`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: phuc_khao
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cau_hinh_he_thong`
--

DROP TABLE IF EXISTS `cau_hinh_he_thong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cau_hinh_he_thong` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `chi_phi_mac_dinh` decimal(38,2) DEFAULT NULL,
  `ten_tk` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `so_tk` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngan_hang` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qr_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tg_sv_nop_don` int DEFAULT '15',
  `tg_sv_cho_kq` int DEFAULT '7',
  `tg_cvkt_duyet_don` int DEFAULT '5',
  `tg_cvkt_kiem_tra_troly` int DEFAULT '3',
  `tg_troly_tim_ho_so` int DEFAULT '3',
  `tg_troly_nhap_diem` int DEFAULT '5',
  `tg_troly_cap_nhat` int DEFAULT '2',
  `thong_bao_qua_han` enum('BAT','TAT') COLLATE utf8mb4_unicode_ci DEFAULT 'BAT',
  `hien_tb_hoan_thanh` enum('BAT','TAT') COLLATE utf8mb4_unicode_ci DEFAULT 'BAT',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cau_hinh_he_thong`
--

LOCK TABLES `cau_hinh_he_thong` WRITE;
/*!40000 ALTER TABLE `cau_hinh_he_thong` DISABLE KEYS */;
/*!40000 ALTER TABLE `cau_hinh_he_thong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `don_phuc_khao`
--

DROP TABLE IF EXISTS `don_phuc_khao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `don_phuc_khao` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_sv` bigint NOT NULL,
  `id_su_kien` bigint NOT NULL,
  `id_hoc_phan` bigint NOT NULL,
  `ngay_thi` date NOT NULL,
  `gio_thi` time NOT NULL,
  `phong_thi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `diem_cu` decimal(38,2) DEFAULT NULL,
  `diem_moi` decimal(38,2) DEFAULT NULL,
  `so_tui` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `so_phach` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `le_phi` decimal(38,2) DEFAULT NULL,
  `trang_thai` enum('DANGCHAM','DACHAM','HOANTHANH') COLLATE utf8mb4_unicode_ci DEFAULT 'DANGCHAM',
  `ngay_nop` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_sv` (`id_sv`),
  KEY `id_su_kien` (`id_su_kien`),
  KEY `id_hoc_phan` (`id_hoc_phan`),
  CONSTRAINT `don_phuc_khao_ibfk_1` FOREIGN KEY (`id_sv`) REFERENCES `users` (`id`),
  CONSTRAINT `don_phuc_khao_ibfk_2` FOREIGN KEY (`id_su_kien`) REFERENCES `su_kien_phuc_khao` (`id`),
  CONSTRAINT `don_phuc_khao_ibfk_3` FOREIGN KEY (`id_hoc_phan`) REFERENCES `hoc_phan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `don_phuc_khao`
--

LOCK TABLES `don_phuc_khao` WRITE;
/*!40000 ALTER TABLE `don_phuc_khao` DISABLE KEYS */;
/*!40000 ALTER TABLE `don_phuc_khao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giang_vien`
--

DROP TABLE IF EXISTS `giang_vien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giang_vien` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ma_gv` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ho_ten` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sdt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_khoa` bigint DEFAULT NULL,
  `trang_thai` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ma_gv` (`ma_gv`),
  KEY `id_khoa` (`id_khoa`),
  CONSTRAINT `giang_vien_ibfk_1` FOREIGN KEY (`id_khoa`) REFERENCES `khoa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giang_vien`
--

LOCK TABLES `giang_vien` WRITE;
/*!40000 ALTER TABLE `giang_vien` DISABLE KEYS */;
/*!40000 ALTER TABLE `giang_vien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoc_phan`
--

DROP TABLE IF EXISTS `hoc_phan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoc_phan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ma_hp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ten_hp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `so_tin_chi` int DEFAULT NULL,
  `id_khoa` bigint DEFAULT NULL,
  `loai_hp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trang_thai` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_nguoi_phu_trach_hp` bigint DEFAULT NULL,
  `id_nguoi_phu_trach` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ma_hp` (`ma_hp`),
  KEY `id_khoa` (`id_khoa`),
  KEY `fk_hp_vaitro_pt` (`id_nguoi_phu_trach_hp`),
  KEY `FKhcq4n1fybeaowsx3mplwxvbax` (`id_nguoi_phu_trach`),
  CONSTRAINT `fk_hp_vaitro_pt` FOREIGN KEY (`id_nguoi_phu_trach_hp`) REFERENCES `vai_tro_phu_trach` (`id`),
  CONSTRAINT `FKhcq4n1fybeaowsx3mplwxvbax` FOREIGN KEY (`id_nguoi_phu_trach`) REFERENCES `vai_tro_phu_trach` (`id`),
  CONSTRAINT `hoc_phan_ibfk_1` FOREIGN KEY (`id_khoa`) REFERENCES `khoa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoc_phan`
--

LOCK TABLES `hoc_phan` WRITE;
/*!40000 ALTER TABLE `hoc_phan` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoc_phan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ket_qua_hoc_tap`
--

DROP TABLE IF EXISTS `ket_qua_hoc_tap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ket_qua_hoc_tap` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_sinh_vien` bigint NOT NULL,
  `id_hoc_phan` bigint NOT NULL,
  `diem_tong_ket` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_sinh_vien` (`id_sinh_vien`),
  KEY `id_hoc_phan` (`id_hoc_phan`),
  CONSTRAINT `ket_qua_hoc_tap_ibfk_1` FOREIGN KEY (`id_sinh_vien`) REFERENCES `users` (`id`),
  CONSTRAINT `ket_qua_hoc_tap_ibfk_2` FOREIGN KEY (`id_hoc_phan`) REFERENCES `hoc_phan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ket_qua_hoc_tap`
--

LOCK TABLES `ket_qua_hoc_tap` WRITE;
/*!40000 ALTER TABLE `ket_qua_hoc_tap` DISABLE KEYS */;
/*!40000 ALTER TABLE `ket_qua_hoc_tap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khoa`
--

DROP TABLE IF EXISTS `khoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khoa` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ma_khoa` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ten_khoa` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_truong_khoa` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ma_khoa` (`ma_khoa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoa`
--

LOCK TABLES `khoa` WRITE;
/*!40000 ALTER TABLE `khoa` DISABLE KEYS */;
/*!40000 ALTER TABLE `khoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_su_xu_ly`
--

DROP TABLE IF EXISTS `lich_su_xu_ly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_su_xu_ly` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_don` bigint NOT NULL,
  `nguoi_thuc_hien` bigint NOT NULL,
  `hanh_dong` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thoi_gian` datetime DEFAULT CURRENT_TIMESTAMP,
  `ghi_chu` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_don` (`id_don`),
  KEY `nguoi_thuc_hien` (`nguoi_thuc_hien`),
  CONSTRAINT `lich_su_xu_ly_ibfk_1` FOREIGN KEY (`id_don`) REFERENCES `don_phuc_khao` (`id`),
  CONSTRAINT `lich_su_xu_ly_ibfk_2` FOREIGN KEY (`nguoi_thuc_hien`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_xu_ly`
--

LOCK TABLES `lich_su_xu_ly` WRITE;
/*!40000 ALTER TABLE `lich_su_xu_ly` DISABLE KEYS */;
/*!40000 ALTER TABLE `lich_su_xu_ly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lop_hoc_phan`
--

DROP TABLE IF EXISTS `lop_hoc_phan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lop_hoc_phan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ma_lop_hp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nhom_lop` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_hoc_phan` bigint NOT NULL,
  `id_giang_vien` bigint DEFAULT NULL,
  `hoc_ky` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nam_hoc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_hoc_phan` (`id_hoc_phan`),
  KEY `id_giang_vien` (`id_giang_vien`),
  CONSTRAINT `lop_hoc_phan_ibfk_1` FOREIGN KEY (`id_hoc_phan`) REFERENCES `hoc_phan` (`id`),
  CONSTRAINT `lop_hoc_phan_ibfk_2` FOREIGN KEY (`id_giang_vien`) REFERENCES `giang_vien` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lop_hoc_phan`
--

LOCK TABLES `lop_hoc_phan` WRITE;
/*!40000 ALTER TABLE `lop_hoc_phan` DISABLE KEYS */;
/*!40000 ALTER TABLE `lop_hoc_phan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `su_kien_phuc_khao`
--

DROP TABLE IF EXISTS `su_kien_phuc_khao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `su_kien_phuc_khao` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ten_su_kien` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hoc_ky` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nam_hoc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thoi_gian_bat_dau` datetime NOT NULL,
  `thoi_gian_ket_thuc` datetime NOT NULL,
  `le_phi` decimal(38,2) DEFAULT NULL,
  `trang_thai` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` bigint NOT NULL,
  `ngay_bat_dau` date DEFAULT NULL,
  `ngay_ket_thuc` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `su_kien_phuc_khao_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `su_kien_phuc_khao`
--

LOCK TABLES `su_kien_phuc_khao` WRITE;
/*!40000 ALTER TABLE `su_kien_phuc_khao` DISABLE KEYS */;
/*!40000 ALTER TABLE `su_kien_phuc_khao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `su_kien_phuc_khao_hoc_phan`
--

DROP TABLE IF EXISTS `su_kien_phuc_khao_hoc_phan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `su_kien_phuc_khao_hoc_phan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_su_kien_tong` bigint NOT NULL,
  `id_hoc_phan` bigint NOT NULL,
  `id_giang_vien` bigint NOT NULL,
  `nhom_lop` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `so_luong_don` int DEFAULT '0',
  `trang_thai` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `han_xu_ly` date DEFAULT NULL,
  `ngay_bat_dau` datetime DEFAULT NULL,
  `ngay_hoan_thanh` datetime DEFAULT NULL,
  `hoc_ky` enum('HK1','HK2','HK3') COLLATE utf8mb4_unicode_ci NOT NULL,
  `nam_hoc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `le_phi` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_su_kien_tong` (`id_su_kien_tong`),
  KEY `id_hoc_phan` (`id_hoc_phan`),
  KEY `id_giang_vien` (`id_giang_vien`),
  CONSTRAINT `su_kien_phuc_khao_hoc_phan_ibfk_1` FOREIGN KEY (`id_su_kien_tong`) REFERENCES `su_kien_phuc_khao` (`id`),
  CONSTRAINT `su_kien_phuc_khao_hoc_phan_ibfk_2` FOREIGN KEY (`id_hoc_phan`) REFERENCES `hoc_phan` (`id`),
  CONSTRAINT `su_kien_phuc_khao_hoc_phan_ibfk_3` FOREIGN KEY (`id_giang_vien`) REFERENCES `giang_vien` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `su_kien_phuc_khao_hoc_phan`
--

LOCK TABLES `su_kien_phuc_khao_hoc_phan` WRITE;
/*!40000 ALTER TABLE `su_kien_phuc_khao_hoc_phan` DISABLE KEYS */;
/*!40000 ALTER TABLE `su_kien_phuc_khao_hoc_phan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thanh_toan_phuc_khao`
--

DROP TABLE IF EXISTS `thanh_toan_phuc_khao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thanh_toan_phuc_khao` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `so_tien` decimal(38,2) DEFAULT NULL,
  `phuong_thuc` enum('CHUYEN_KHOAN','TIEN_MAT') COLLATE utf8mb4_unicode_ci DEFAULT 'CHUYEN_KHOAN',
  `ma_giao_dich` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngay_thanh_toan` datetime DEFAULT CURRENT_TIMESTAMP,
  `trang_thai` enum('THANH_CONG','THAT_BAI','CHO_XAC_NHAN') COLLATE utf8mb4_unicode_ci DEFAULT 'CHO_XAC_NHAN',
  `id_sv` bigint NOT NULL,
  `tong_so_tien` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_sv` (`id_sv`),
  CONSTRAINT `thanh_toan_phuc_khao_ibfk_1` FOREIGN KEY (`id_sv`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanh_toan_phuc_khao`
--

LOCK TABLES `thanh_toan_phuc_khao` WRITE;
/*!40000 ALTER TABLE `thanh_toan_phuc_khao` DISABLE KEYS */;
/*!40000 ALTER TABLE `thanh_toan_phuc_khao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thong_bao`
--

DROP TABLE IF EXISTS `thong_bao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thong_bao` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tieu_de` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `noi_dung` text COLLATE utf8mb4_unicode_ci,
  `nguoi_gui` bigint DEFAULT NULL,
  `nguoi_nhan_role` enum('SINHVIEN','TROLY','CVKT','TATCA') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loai_thong_bao` enum('HE_THONG','SU_KIEN','KET_QUA','QUA_HAN') COLLATE utf8mb4_unicode_ci DEFAULT 'HE_THONG',
  `thoi_gian` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `nguoi_gui` (`nguoi_gui`),
  CONSTRAINT `thong_bao_ibfk_1` FOREIGN KEY (`nguoi_gui`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thong_bao`
--

LOCK TABLES `thong_bao` WRITE;
/*!40000 ALTER TABLE `thong_bao` DISABLE KEYS */;
/*!40000 ALTER TABLE `thong_bao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `role` enum('ADMIN','CVKT','TROLY','SINHVIEN') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('HOATDONG','BIKHOA') COLLATE utf8mb4_unicode_ci DEFAULT 'HOATDONG',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','123456','Quản Trị Viên','admin@example.com',NULL,NULL,'ADMIN','HOATDONG','2025-11-26 10:00:28',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_thong_ke_phuc_khao`
--

DROP TABLE IF EXISTS `v_thong_ke_phuc_khao`;
/*!50001 DROP VIEW IF EXISTS `v_thong_ke_phuc_khao`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_thong_ke_phuc_khao` AS SELECT 
 1 AS `ten_khoa`,
 1 AS `tong_don`,
 1 AS `so_don_hoanthanh`,
 1 AS `so_don_dacham`,
 1 AS `so_don_dangcham`,
 1 AS `tb_thaydoi_diem`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `vai_tro_phu_trach`
--

DROP TABLE IF EXISTS `vai_tro_phu_trach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vai_tro_phu_trach` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_giang_vien` bigint NOT NULL,
  `chuc_danh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_giang_vien` (`id_giang_vien`),
  CONSTRAINT `vai_tro_phu_trach_ibfk_1` FOREIGN KEY (`id_giang_vien`) REFERENCES `giang_vien` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vai_tro_phu_trach`
--

LOCK TABLES `vai_tro_phu_trach` WRITE;
/*!40000 ALTER TABLE `vai_tro_phu_trach` DISABLE KEYS */;
/*!40000 ALTER TABLE `vai_tro_phu_trach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `v_thong_ke_phuc_khao`
--

/*!50001 DROP VIEW IF EXISTS `v_thong_ke_phuc_khao`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_thong_ke_phuc_khao` AS select `k`.`ten_khoa` AS `ten_khoa`,count(`d`.`id`) AS `tong_don`,sum((`d`.`trang_thai` = 'HOANTHANH')) AS `so_don_hoanthanh`,sum((`d`.`trang_thai` = 'DACHAM')) AS `so_don_dacham`,sum((`d`.`trang_thai` = 'DANGCHAM')) AS `so_don_dangcham`,round(avg((`d`.`diem_moi` - `d`.`diem_cu`)),2) AS `tb_thaydoi_diem` from ((`don_phuc_khao` `d` join `hoc_phan` `hp` on((`hp`.`id` = `d`.`id_hoc_phan`))) join `khoa` `k` on((`k`.`id` = `hp`.`id_khoa`))) group by `k`.`ten_khoa` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-27 22:24:18
