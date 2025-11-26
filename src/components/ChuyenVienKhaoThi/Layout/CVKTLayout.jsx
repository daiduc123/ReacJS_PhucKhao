import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import "./CVKTLayout.css";
import { FaHome, FaClipboardList, FaChartBar } from "react-icons/fa";
import ChonNganhHocVaHocKy from "../../SinhVien/home/header/ChonNganhHocVaHocKy";

const CVKTLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentInfo, setCurrentInfo] = useState({
    khoa: "46 (2022-2026)",
    nganh: "Công nghệ phần mềm",
    hocky: "1",
    namhoc: "2025-2026"
  });

  const menuItems = [
    { path: "/cvkt/dashboard", label: "Dashboard", icon: FaHome },
    { path: "/cvkt/quan-ly-yeu-cau", label: "Quản lý yêu cầu", icon: FaClipboardList },
    { path: "/cvkt/thong-ke", label: "Thống kê", icon: FaChartBar },
  ];

  const handleHocKyClick = () => {
    navigate("/cvkt/chon-nganh-hoc");
  };

  const handleHocKyConfirm = (data) => {
    setCurrentInfo({
      khoa: data.semester.course,
      nganh: data.major,
      hocky: data.semester.semester,
      namhoc: data.semester.year
    });
    navigate("/cvkt/dashboard");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header currentInfo={currentInfo} onHocKyClick={handleHocKyClick} />
      <div style={{ display: "flex", flex: 1 }}>
        <aside className="cvkt-sidebar">
          <nav className="cvkt-sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  className={`cvkt-nav-item ${isActive ? "active" : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>
        <main
          className="cvkt-main-content"
          style={{
            backgroundColor: "#f4f6f9",
            padding: "24px",
          }}
        >
          {location.pathname === "/cvkt/chon-nganh-hoc" ? (
            <ChonNganhHocVaHocKy
              isOpen={true}
              onClose={() => navigate("/cvkt/dashboard")}
              onConfirm={handleHocKyConfirm}
              role="CVKT"
            />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default CVKTLayout;

