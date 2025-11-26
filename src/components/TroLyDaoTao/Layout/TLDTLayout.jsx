import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import "./TLDTLayout.css";
import { FaHome, FaArchive, FaClipboardList, FaBell } from "react-icons/fa";
import ChonNganhHocVaHocKy from "../../SinhVien/home/header/ChonNganhHocVaHocKy";

const TLDTLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentInfo, setCurrentInfo] = useState({
    khoa: "46 (2022-2026)",
    nganh: "Công nghệ phần mềm",
    hocky: "1",
    namhoc: "2025-2026"
  });

  const menuItems = [
    { path: "/tldt/tong-quan", label: "Tổng quan hệ thống", icon: FaHome },
    { path: "/tldt/xu-ly-don", label: "Xử lý đơn phúc khảo", icon: FaClipboardList },
    { path: "/tldt/kho-luu-tru", label: "Kho lưu trữ", icon: FaArchive },
    { path: "/tldt/thong-bao", label: "Thông báo", icon: FaBell },
  ];

  // Redirect dashboard to tong-quan
  useEffect(() => {
    if (location.pathname === "/tldt" || location.pathname === "/tldt/dashboard") {
      navigate("/tldt/tong-quan", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleHocKyClick = () => {
    navigate("/tldt/chon-nganh-hoc");
  };

  const handleHocKyConfirm = (data) => {
    setCurrentInfo({
      khoa: data.semester.course,
      nganh: data.major,
      hocky: data.semester.semester,
      namhoc: data.semester.year
    });
    navigate("/tldt/tong-quan");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header currentInfo={currentInfo} onHocKyClick={handleHocKyClick} />
      <div style={{ display: "flex", flex: 1 }}>
        <aside className="tldt-sidebar">
          <nav className="tldt-sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  className={`tldt-nav-item ${isActive ? "active" : ""}`}
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
          className="tldt-main-content"
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#f4f6f9",
            padding: "24px",
          }}
        >
          {location.pathname === "/tldt/chon-nganh-hoc" ? (
            <ChonNganhHocVaHocKy
              isOpen={true}
              onClose={() => navigate("/tldt/tong-quan")}
              onConfirm={handleHocKyConfirm}
              role="TLDT"
            />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default TLDTLayout;

