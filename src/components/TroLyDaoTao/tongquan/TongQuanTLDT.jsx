import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TongQuanTLDT.css";
import { getTLDTRequests, getArchive } from "../../../services/phuckhaoApiService";
import {
  FaClipboardList,
  FaArchive,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileExcel,
  FaChartLine,
  FaUsers,
  FaBook,
} from "react-icons/fa";

const TongQuanTLDT = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    processing: 0,
    waiting: 0,
    completed: 0,
    archived: 0,
    totalCourses: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [requests, archived] = await Promise.all([
        getTLDTRequests(),
        getArchive(),
      ]);

      const totalRequests = requests.reduce((sum, group) => sum + group.requests.length, 0);
      const processing = requests.filter((g) => g.status === "Đang xử lý").length;
      const waiting = requests.filter((g) => g.status === "Chờ chuyển đến CVKT").length;
      const completed = requests.filter((g) => g.status === "Hoàn thành").length;

      setStats({
        totalRequests,
        processing,
        waiting,
        completed,
        archived: archived.length,
        totalCourses: requests.length,
      });
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="tongquan-tldt">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tongquan-tldt">
      <div className="tongquan-header">
        <div>
          <h1>Tổng quan hệ thống</h1>
          <p className="subtitle">Thống kê và theo dõi đơn phúc khảo</p>
        </div>
        <div className="header-actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/tldt/xu-ly-don")}
          >
            <FaClipboardList /> Xử lý đơn
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon-wrapper">
            <FaClipboardList className="stat-icon" />
          </div>
          <div className="stat-content">
            <h3>Tổng số đơn</h3>
            <p className="stat-value">{stats.totalRequests}</p>
            <span className="stat-label">đơn phúc khảo</span>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon-wrapper">
            <FaClock className="stat-icon" />
          </div>
          <div className="stat-content">
            <h3>Đang xử lý</h3>
            <p className="stat-value">{stats.processing}</p>
            <span className="stat-label">học phần</span>
          </div>
        </div>

        <div className="stat-card stat-info">
          <div className="stat-icon-wrapper">
            <FaExclamationTriangle className="stat-icon" />
          </div>
          <div className="stat-content">
            <h3>Chờ chuyển</h3>
            <p className="stat-value">{stats.waiting}</p>
            <span className="stat-label">học phần</span>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon-wrapper">
            <FaCheckCircle className="stat-icon" />
          </div>
          <div className="stat-content">
            <h3>Hoàn thành</h3>
            <p className="stat-value">{stats.completed}</p>
            <span className="stat-label">học phần</span>
          </div>
        </div>

        <div className="stat-card stat-archive">
          <div className="stat-icon-wrapper">
            <FaArchive className="stat-icon" />
          </div>
          <div className="stat-content">
            <h3>Kho lưu trữ</h3>
            <p className="stat-value">{stats.archived}</p>
            <span className="stat-label">đơn đã lưu</span>
          </div>
        </div>

        <div className="stat-card stat-secondary">
          <div className="stat-icon-wrapper">
            <FaBook className="stat-icon" />
          </div>
          <div className="stat-content">
            <h3>Tổng học phần</h3>
            <p className="stat-value">{stats.totalCourses}</p>
            <span className="stat-label">học phần</span>
          </div>
        </div>
      </div>

      <div className="quick-actions-section">
        <h2>Thao tác nhanh</h2>
        <div className="quick-actions-grid">
          <div
            className="action-card"
            onClick={() => navigate("/tldt/xu-ly-don")}
          >
            <div className="action-icon">
              <FaClipboardList />
            </div>
            <h3>Xử lý đơn phúc khảo</h3>
            <p>Xem và xử lý các đơn phúc khảo đang chờ</p>
          </div>

          <div
            className="action-card"
            onClick={() => navigate("/tldt/kho-luu-tru")}
          >
            <div className="action-icon">
              <FaArchive />
            </div>
            <h3>Kho lưu trữ</h3>
            <p>Xem các đơn đã hoàn thành và lưu trữ</p>
          </div>

          <div
            className="action-card"
            onClick={() => navigate("/tldt/thong-bao")}
          >
            <div className="action-icon">
              <FaBell />
            </div>
            <h3>Thông báo</h3>
            <p>Xem các thông báo và cập nhật hệ thống</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Hoạt động gần đây</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">
              <FaFileExcel />
            </div>
            <div className="activity-content">
              <h4>Xuất file Excel</h4>
              <p>Đã xuất danh sách phúc khảo cho giảng viên</p>
              <span className="activity-time">2 giờ trước</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <FaCheckCircle />
            </div>
            <div className="activity-content">
              <h4>Nhập điểm thành công</h4>
              <p>Đã nhập điểm phúc khảo cho 5 sinh viên</p>
              <span className="activity-time">5 giờ trước</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <FaUsers />
            </div>
            <div className="activity-content">
              <h4>Nhận đơn mới</h4>
              <p>Nhận 3 đơn phúc khảo mới từ Chuyên viên khảo thí</p>
              <span className="activity-time">1 ngày trước</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TongQuanTLDT;





















