import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ChonNganhHocVaHocKy from "../../SinhVien/home/header/ChonNganhHocVaHocKy";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentInfo, setCurrentInfo] = useState({
    khoa: "46 (2022-2026)",
    nganh: "Công nghệ phần mềm",
    hocky: "1",
    namhoc: "2025-2026"
  });

  const handleHocKyClick = () => {
    navigate("/admin/chon-nganh-hoc");
  };

  const handleHocKyConfirm = (data) => {
    setCurrentInfo({
      khoa: data.semester.course,
      nganh: data.major,
      hocky: data.semester.semester,
      namhoc: data.semester.year
    });
    navigate("/admin/tong-quan");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header currentInfo={currentInfo} onHocKyClick={handleHocKyClick} />

      {/* Container cho Sidebar và Main Content */}
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />

        {/* Khu vực nội dung chính sẽ có thanh cuộn riêng */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#f4f6f9",
            padding: "24px",
          }}
        >
          {location.pathname === "/admin/chon-nganh-hoc" ? (
            <ChonNganhHocVaHocKy
              isOpen={true}
              onClose={() => navigate("/admin/tong-quan")}
              onConfirm={handleHocKyConfirm}
              role="Admin"
            />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
