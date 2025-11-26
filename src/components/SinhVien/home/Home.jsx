import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";
import HoSoCaNhan from "../hosocanhan/HoSoCaNhan";
import NopDonPhucKhao from "../phuckhao/NopDonPhucKhao";
import LichSuDon from "../phuckhao/LichSuDon";
import ThanhToan from "../phuckhao/ThanhToan";
import ChiTietDon from "../phuckhao/ChiTietDon";
import ChonNganhHocVaHocKy from "./header/ChonNganhHocVaHocKy";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentInfo, setCurrentInfo] = useState({
    khoa: "46 (2022-2026)",
    nganh: "Công nghệ phần mềm",
    hocky: "1",
    namhoc: "2025-2026"
  });
  
  const renderContent = () => {
    if (location.pathname === "/student/chon-nganh-hoc") {
      return (
        <ChonNganhHocVaHocKy
          isOpen={true}
          onClose={() => {
            navigate("/student");
          }}
          onConfirm={(data) => {
            setCurrentInfo({
              khoa: data.semester.course,
              nganh: data.major,
              hocky: data.semester.semester,
              namhoc: data.semester.year
            });
            navigate("/student");
          }}
          role="Sinh viên"
        />
      );
    }
    if (location.pathname.startsWith("/student/chi-tiet-don/")) {
      return <ChiTietDon />;
    }
    if (location.pathname.startsWith("/student/thanh-toan")) {
      return <ThanhToan />;
    }
    switch (location.pathname) {
      case "/student":
      case "/student/hosocanhan":
        return <HoSoCaNhan />;
      case "/student/nop-don":
        return <NopDonPhucKhao />;
      case "/student/lich-su-don":
        return <LichSuDon />;
      default:
        return <HoSoCaNhan />;
    }
  };

  return (
    <div className="sv-home-wrapper">
      <Header currentInfo={currentInfo} />
      <div className="sv-container">
        <Navbar />
        <div className="sv-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Home;
