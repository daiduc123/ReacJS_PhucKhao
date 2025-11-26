import React, { useState, useEffect } from "react";
import "./TongQuan.css";
import { getDashboardStats } from "../../../services/adminApiService";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng

const TongQuan = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Sử dụng hook navigate

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError("Không thể tải dữ liệu. Vui lòng thử lại.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleQuickAction = (path) => {
    navigate(path);
  };

  if (loading) {
    return <div className="AD_loading">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="AD_error">{error}</div>;
  }

  return (
    <div className="AD_tongquan-container AD_container">
      <h1 className="AD_page-title">Tổng quan</h1>

      {/* Phần thống kê tổng quan */}
      <div className="AD_stats-grid">
        <div className="AD_stat-card" style={{ borderColor: "#28a745" }}>
          <div className="AD_stat-title">Trạng thái mạng</div>
          <div className="AD_stat-value" style={{ color: "#28a745" }}>
            {stats.status}
          </div>
        </div>
        <div className="AD_stat-card">
          <div className="AD_stat-title">Người dùng đang online</div>
          <div className="AD_stat-value">{stats.onlineUsers}</div>
        </div>
        <div className="AD_stat-card">
          <div className="AD_stat-title">Đợt phúc khảo đang mở</div>
          <div className="AD_stat-value">{stats.openEvents}</div>
        </div>
        <div className="AD_stat-card">
          <div className="AD_stat-title">Đơn phúc khảo hôm nay</div>
          <div className="AD_stat-value">{stats.todaySubmissions}</div>
        </div>
      </div>

      <div className="AD_main-content-grid">
        {/* Thông tin phúc khảo */}
        <div className="AD_info-box">
          <h3>Thông tin phúc khảo</h3>
          {stats.infoCards.map((card, index) => (
            <div key={index} className="AD_info-item">
              <span>{card.title}</span>
              <span
                className="AD_info-value"
                style={{ backgroundColor: card.color }}
              >
                {card.value}
              </span>
            </div>
          ))}
        </div>

        {/* Hoạt động gần đây */}
        <div className="AD_activity-box">
          <h3>Hoạt động gần đây</h3>
          <ul>
            {stats.recentActivities.map((activity) => (
              <li key={activity.id}>
                <p>{activity.action}</p>
                <small>{activity.timestamp}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Thao tác nhanh */}
      <div className="AD_quick-actions">
        <h3>Thao tác nhanh</h3>
        <div className="AD_action-buttons">
          <button
            className="AD_quick-btn AD_btn-green"
            onClick={() => handleQuickAction("/admin/tao-su-kien")}
          >
            Tạo sự kiện phúc khảo
          </button>
          <button
            className="AD_quick-btn AD_btn-blue"
            onClick={() => handleQuickAction("/admin/cau-hinh-he-thong")}
          >
            Cấu hình hệ thống
          </button>
          <button
            className="AD_quick-btn AD_btn-purple"
            onClick={() => handleQuickAction("/admin/quan-ly-nguoi-dung")}
          >
            Quản lý người dùng
          </button>
          <button
            className="AD_quick-btn AD_btn-orange"
            onClick={() => handleQuickAction("/admin/quan-ly-hoc-phan")}
          >
            Quản lý học phần
          </button>
        </div>
      </div>
    </div>
  );
};

export default TongQuan;
