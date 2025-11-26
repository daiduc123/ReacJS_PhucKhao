import React, { useState, useEffect } from "react";
import "./TaoSuKienPhucKhao.css";

const TaoSuKienPhucKhao = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Gọi API lấy danh sách sự kiện
    // Giả lập dữ liệu
    setTimeout(() => {
      setEvents([
        { id: 1, name: "Phúc khảo HK1 2025-2026", status: "Đang mở", startDate: "2025-01-01", endDate: "2025-01-31" },
        { id: 2, name: "Phúc khảo HK2 2024-2025", status: "Đã đóng", startDate: "2024-06-01", endDate: "2024-06-30" }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Tính toán thống kê
  const stats = {
    total: events.length,
    open: events.filter(e => e.status === "Đang mở").length,
    closed: events.filter(e => e.status === "Đã đóng").length,
    upcoming: events.filter(e => {
      const today = new Date();
      const startDate = new Date(e.startDate);
      return startDate > today;
    }).length
  };

  return (
    <div className="AD_container">
      <h1 className="AD_page-title">Tạo sự kiện phúc khảo</h1>

      {/* Thống kê */}
      <div className="AD_stats-grid">
        <div className="AD_stat-card">
          <div className="AD_stat-title">Tổng sự kiện</div>
          <div className="AD_stat-value">{stats.total}</div>
        </div>
        <div className="AD_stat-card" style={{ borderLeftColor: "#28a745" }}>
          <div className="AD_stat-title">Đang mở</div>
          <div className="AD_stat-value" style={{ color: "#28a745" }}>{stats.open}</div>
        </div>
        <div className="AD_stat-card" style={{ borderLeftColor: "#6c757d" }}>
          <div className="AD_stat-title">Đã đóng</div>
          <div className="AD_stat-value" style={{ color: "#6c757d" }}>{stats.closed}</div>
        </div>
        <div className="AD_stat-card" style={{ borderLeftColor: "#17a2b8" }}>
          <div className="AD_stat-title">Sắp tới</div>
          <div className="AD_stat-value" style={{ color: "#17a2b8" }}>{stats.upcoming}</div>
        </div>
      </div>

      <div className="AD_form-container">
        <form className="AD_form">
          <div className="AD_form-group">
            <label htmlFor="eventName">Tên sự kiện *</label>
            <input
              type="text"
              id="eventName"
              placeholder="Ví dụ: Phúc khảo HK2 2025-2026"
            />
          </div>
          <div className="AD_form-group">
            <label htmlFor="semester">Học kỳ áp dụng *</label>
            <select id="semester">
              <option>Chọn học kỳ</option>
              <option>Học kỳ 1</option>
              <option>Học kỳ 2</option>
            </select>
          </div>
          <div className="AD_form-grid">
            <div className="AD_form-group">
              <label htmlFor="startDate">Thời gian bắt đầu *</label>
              <input type="datetime-local" id="startDate" />
            </div>
            <div className="AD_form-group">
              <label htmlFor="endDate">Thời gian kết thúc *</label>
              <input type="datetime-local" id="endDate" />
            </div>
          </div>
          <div className="AD_form-group">
            <label htmlFor="fee">Lệ phí</label>
            <div className="AD_input-with-suffix">
              <input type="text" id="fee" defaultValue="20.000" />
              <span>VND</span>
            </div>
          </div>
          <div className="AD_form-actions">
            <button type="button" className="AD_btn AD_btn-secondary">
              Hủy
            </button>
            <button type="submit" className="AD_btn AD_btn-primary">
              Tạo sự kiện
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaoSuKienPhucKhao;
