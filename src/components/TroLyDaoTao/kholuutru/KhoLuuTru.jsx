import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./KhoLuuTru.css";
import { getArchive } from "../../../services/phuckhaoApiService";
import { FaSearch, FaArchive, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const KhoLuuTru = () => {
  const [archivedGroups, setArchivedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadArchive();
  }, []);

  const loadArchive = async () => {
    try {
      setLoading(true);
      const data = await getArchive();
      
      // Nhóm theo học phần
      const grouped = {};
      data.forEach((req) => {
        if (!grouped[req.courseId]) {
          grouped[req.courseId] = {
            courseId: req.courseId,
            courseName: req.courseName,
            requests: [],
            completedDate: req.completedDate,
          };
        }
        grouped[req.courseId].requests.push(req);
      });
      
      // Chuyển đổi object thành array và sắp xếp theo ngày hoàn thành
      const groups = Object.values(grouped).sort((a, b) => {
        const dateA = new Date(a.completedDate || 0);
        const dateB = new Date(b.completedDate || 0);
        return dateB - dateA;
      });
      
      setArchivedGroups(groups);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = archivedGroups.filter((group) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      group.courseName.toLowerCase().includes(searchLower) ||
      group.courseId.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="kholuutru-container">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="kholuutru-container">
      <div className="kholuutru-header">
        <div>
          <h1>Kho lưu trữ</h1>
          <p className="subtitle">Danh sách các đơn phúc khảo đã hoàn thành</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => navigate("/tldt/xu-ly-don")}>
            <FaArchive /> Xử lý đơn
          </button>
        </div>
      </div>

      <div className="search-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã học phần, tên học phần..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-item">
          <FaArchive className="stat-icon" />
          <div>
            <h3>Tổng số lô đơn</h3>
            <p className="stat-value">{archivedGroups.length}</p>
          </div>
        </div>
        <div className="stat-item">
          <FaCheckCircle className="stat-icon success" />
          <div>
            <h3>Đã hoàn thành</h3>
            <p className="stat-value">
              {archivedGroups.reduce((sum, group) => sum + group.requests.length, 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="requests-section">
        <h2>Danh sách đơn đã lưu trữ</h2>
        {filteredGroups.length === 0 ? (
          <div className="no-data">Không có đơn nào trong kho lưu trữ.</div>
        ) : (
          <div className="requests-grid">
            {filteredGroups.map((group) => (
              <div
                key={group.courseId}
                className="request-card archived-card"
              >
                <div className="card-header">
                  <h3>{group.courseName}</h3>
                  <span className="badge badge-success">Đã hoàn thành</span>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Số lượng đơn:</strong> {group.requests.length}
                  </p>
                  <p>
                    <strong>Mã học phần:</strong> {group.courseId}
                  </p>
                  <p>
                    <strong>Ngày hoàn thành:</strong>{" "}
                    {group.completedDate
                      ? new Date(group.completedDate).toLocaleDateString("vi-VN")
                      : "-"}
                  </p>
                </div>
                <div className="card-footer">
                  <button className="btn-view" disabled>
                    Đã lưu trữ <FaCheckCircle />
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

export default KhoLuuTru;








