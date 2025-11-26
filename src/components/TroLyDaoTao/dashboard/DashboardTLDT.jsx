import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardTLDT.css";
import { getTLDTRequests } from "../../../services/phuckhaoApiService";
import { FaClipboardList, FaArchive, FaExclamationTriangle, FaArrowRight } from "react-icons/fa";

const DashboardTLDT = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getTLDTRequests();
      setRequests(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      "Đang xử lý": "badge-processing",
      "Đã chuyển đến GV": "badge-sent",
      "Chờ chuyển đến CVKT": "badge-waiting",
    };
    return badges[status] || "badge-default";
  };

  if (loading) {
    return (
      <div className="dashboard-tldt">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-tldt">
      <div className="dashboard-header">
        <div>
          <h1>Xử lý đơn phúc khảo</h1>
          <p className="subtitle">Quản lý và xử lý các đơn phúc khảo đang chờ</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => navigate("/tldt/kho-luu-tru")}>
            <FaArchive /> Kho lưu trữ
          </button>
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-item">
          <FaClipboardList className="stat-icon" />
          <div>
            <h3>Tổng số lô đơn</h3>
            <p className="stat-value">{requests.length}</p>
          </div>
        </div>
        <div className="stat-item">
          <FaExclamationTriangle className="stat-icon warning" />
          <div>
            <h3>Cần xử lý</h3>
            <p className="stat-value">
              {requests.filter((r) => r.status === "Đang xử lý").length}
            </p>
          </div>
        </div>
      </div>

      <div className="requests-section">
        <h2>Danh sách đơn cần xử lý</h2>
        {requests.length === 0 ? (
          <div className="no-data">Không có đơn nào cần xử lý.</div>
        ) : (
          <div className="requests-grid">
            {requests.map((group) => (
              <div
                key={group.courseId}
                className="request-card"
                onClick={() => navigate(`/tldt/xu-ly-don/${group.courseId}`)}
              >
                <div className="card-header">
                  <h3>{group.courseName}</h3>
                  <span className={`badge ${getStatusBadge(group.status)}`}>{group.status}</span>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Số lượng đơn:</strong> {group.requests.length}
                  </p>
                  <p>
                    <strong>Mã học phần:</strong> {group.courseId}
                  </p>
                </div>
                <div className="card-footer">
                  <button className="btn-view">
                    Xem chi tiết <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTLDT;

