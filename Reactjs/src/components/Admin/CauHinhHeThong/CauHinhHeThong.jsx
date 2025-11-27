import React, { useState } from "react";
import "./CauHinhHeThong.css";
import TabPhiPhucKhao from "./TabPhiPhucKhao";
import TabThongBao from "./TabThongBao";
import TabThoiGianPhucKhao from "./TabThoiGianPhucKhao";

const CauHinhHeThong = () => {
  const [activeTab, setActiveTab] = useState("phi");

  const renderContent = () => {
    switch (activeTab) {
      case "thongbao":
        return <TabThongBao />;
      case "thoigian":
        return <TabThoiGianPhucKhao />;
      case "phi":
      default:
        return <TabPhiPhucKhao />;
    }
  };

  return (
    <div className="AD_container">
      <h1 className="AD_page-title">Cấu hình hệ thống</h1>
      <div className="AD_tabs-container">
        <div className="AD_tabs">
          <button
            onClick={() => setActiveTab("phi")}
            className={activeTab === "phi" ? "active" : ""}
          >
            Phí phúc khảo
          </button>
          <button
            onClick={() => setActiveTab("thongbao")}
            className={activeTab === "thongbao" ? "active" : ""}
          >
            Thông báo
          </button>
          <button
            onClick={() => setActiveTab("thoigian")}
            className={activeTab === "thoigian" ? "active" : ""}
          >
            Thời gian phúc khảo
          </button>
        </div>
        <div className="AD_tab-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default CauHinhHeThong;
