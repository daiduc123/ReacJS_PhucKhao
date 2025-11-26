import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardCVKT.css";
import { getCVKTStats, getReviewRequestsByCourse } from "../../../services/phuckhaoApiService";
import { FaChartBar, FaClipboardList, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const DashboardCVKT = () => {
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, requestsData] = await Promise.all([
        getCVKTStats(),
        getReviewRequestsByCourse(),
      ]);
      setStats(statsData);
      setRecentRequests(requestsData.slice(0, 5));
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-cvkt">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-cvkt">
      <div className="dashboard-header">
        <h1>Dashboard - Chuyên viên khảo thí</h1>
        <button className="btn-primary" onClick={() => navigate("/cvkt/quan-ly-yeu-cau")}>
          Quản lý yêu cầu
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon">
            <FaClipboardList />
          </div>
          <div className="stat-content">
            <h3>Tổng đơn</h3>
            <p className="stat-value">{stats?.total || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>Chờ xử lý</h3>
            <p className="stat-value">{stats?.pending || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-processing">
          <div className="stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <h3>Đang xử lý</h3>
            <p className="stat-value">{stats?.processing || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-waiting">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>Chờ xác nhận</h3>
            <p className="stat-value">{stats?.waitingConfirm || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>Hoàn thành</h3>
            <p className="stat-value">{stats?.completed || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-time">
          <div className="stat-icon">
            <FaChartBar />
          </div>
          <div className="stat-content">
            <h3>Thời gian xử lý TB</h3>
            <p className="stat-value">{stats?.averageProcessingTime || 0} ngày</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-requests">
          <div className="section-header">
            <h2>Yêu cầu gần đây</h2>
            <button className="btn-link" onClick={() => navigate("/cvkt/quan-ly-yeu-cau")}>
              Xem tất cả
            </button>
          </div>
          {recentRequests.length === 0 ? (
            <div className="no-data">Không có yêu cầu nào.</div>
          ) : (
            <div className="requests-list">
              {recentRequests.map((group) => (
                <div
                  key={group.courseId}
                  className="request-item"
                  onClick={() => navigate(`/cvkt/chi-tiet-hoc-phan/${group.courseId}`)}
                >
                  <div className="request-info">
                    <h4>{group.courseName}</h4>
                    <p>
                      {group.requests.length} đơn - Trạng thái: {group.status}
                    </p>
                  </div>
                  <div className="request-actions">
                    <span className="badge badge-info">{group.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="quick-actions">
          <h2>Thao tác nhanh</h2>
          <div className="actions-grid">
            <button
              className="action-btn"
              onClick={() => navigate("/cvkt/quan-ly-yeu-cau")}
            >
              <FaClipboardList />
              <span>Quản lý yêu cầu</span>
            </button>
            <button
              className="action-btn"
              onClick={() => navigate("/cvkt/thong-ke")}
            >
              <FaChartBar />
              <span>Thống kê</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCVKT;





















