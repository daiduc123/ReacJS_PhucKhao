import React, { useState, useEffect } from "react";
import "./ThongKe.css";
import { getCVKTStats, getReviewRequestsByCourse } from "../../../services/phuckhaoApiService";
import { FaCalendarAlt, FaFileExcel } from "react-icons/fa";

const ThongKe = () => {
  const [stats, setStats] = useState(null);
  const [courseGroups, setCourseGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    fromDate: "20/8/2025",
    toDate: "20/9/2025",
    faculty: "all",
    course: "all"
  });

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
      setCourseGroups(requestsData);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  // Tính toán dữ liệu thống kê
  const totalRequests = stats?.total || 717;
  const completedRate = stats?.completedRate || 32.9;
  const avgProcessingTime = stats?.averageProcessingTime || 2.4;
  const scoreIncreaseRate = 17.3;

  // Tính phân bố trạng thái
  const statusDistribution = {
    "Chờ xử lý": courseGroups.reduce((sum, g) => sum + g.requests.filter(r => r.status === "Chờ xử lý").length, 0),
    "Đã chuyển đến TLDT": courseGroups.reduce((sum, g) => sum + g.requests.filter(r => r.status === "Đã chuyển đến TLDT" || r.status === "Đã chuyển đến TLGV").length, 0),
    "Chờ nhập điểm": courseGroups.reduce((sum, g) => sum + g.requests.filter(r => r.status === "Chờ PĐT nhập điểm" || r.status === "Chờ CVKT xác nhận").length, 0),
    "Đã hoàn thành": courseGroups.reduce((sum, g) => sum + g.requests.filter(r => r.status === "Hoàn thành").length, 0),
  };

  // Top 5 môn học
  const topCourses = courseGroups
    .map(g => ({
      name: g.courseName,
      count: g.requests.length
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Báo cáo theo khoa (mock data)
  const facultyReport = [
    { faculty: "Công nghệ thông tin", total: 100, completed: 80, processing: 18, pending: 4, rate: "80%", avgTime: "3 ngày", scoreChange: "20%" },
    { faculty: "Toán", total: 100, completed: 80, processing: 18, pending: 4, rate: "80%", avgTime: "3 ngày", scoreChange: "20%" },
    { faculty: "Điện", total: 100, completed: 80, processing: 18, pending: 4, rate: "80%", avgTime: "3 ngày", scoreChange: "20%" },
    { faculty: "Điện tử và Công nghệ vật liệu", total: 100, completed: 80, processing: 18, pending: 4, rate: "80%", avgTime: "3 ngày", scoreChange: "20%" },
    { faculty: "Lý luận chính trị", total: 100, completed: 80, processing: 18, pending: 4, rate: "80%", avgTime: "3 ngày", scoreChange: "20%" },
  ];

  const statusColors = {
    "Chờ xử lý": "#FFC107",
    "Đã chuyển đến TLDT": "#9C27B0",
    "Chờ nhập điểm": "#2196F3",
    "Đã hoàn thành": "#4CAF50",
  };

  if (loading) {
    return (
      <div className="thongke-container">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="thongke-container">
      {/* Thanh lọc */}
      <div className="thongke-filter-bar">
        <div className="filter-item">
          <label>Từ ngày:</label>
          <div className="date-input-wrapper">
            <FaCalendarAlt className="date-icon" />
            <input
              type="text"
              value={filters.fromDate}
              onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
              className="date-input"
            />
          </div>
        </div>
        <div className="filter-item">
          <label>Đến ngày:</label>
          <div className="date-input-wrapper">
            <FaCalendarAlt className="date-icon" />
            <input
              type="text"
              value={filters.toDate}
              onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
              className="date-input"
            />
          </div>
        </div>
        <div className="filter-item">
          <label>khoa/viện:</label>
          <select
            value={filters.faculty}
            onChange={(e) => setFilters({ ...filters, faculty: e.target.value })}
            className="filter-select"
          >
            <option value="all">Tất cả các khoa</option>
          </select>
        </div>
        <div className="filter-item">
          <label>Học phần:</label>
          <select
            value={filters.course}
            onChange={(e) => setFilters({ ...filters, course: e.target.value })}
            className="filter-select"
          >
            <option value="all">Tất cả học phần</option>
          </select>
        </div>
        <button className="btn-search">Tìm kiếm</button>
      </div>

      {/* 4 thẻ thống kê */}
      <div className="stats-cards-grid">
        <div className="stat-card">
          <h3>Tổng yêu cầu</h3>
          <div className="stat-value">{totalRequests}</div>
          <div className="stat-trend">tăng 12% so với tháng trước</div>
        </div>
        <div className="stat-card">
          <h3>Tỷ lệ hoàn thành</h3>
          <div className="stat-value">{completedRate}%</div>
          <div className="stat-trend">tăng 3.3% so với tháng trước</div>
        </div>
        <div className="stat-card stat-card-special">
          <div className="stat-indicator">Đ</div>
          <h3>Thời gian xử lý TB</h3>
          <div className="stat-value">{avgProcessingTime}</div>
          <div className="stat-unit">Ngày</div>
        </div>
        <div className="stat-card">
          <h3>Tỷ lệ tăng điểm</h3>
          <div className="stat-value">{scoreIncreaseRate}%</div>
          <div className="stat-trend negative">giảm 1.3% so với tháng trước</div>
        </div>
      </div>

      {/* Phân bố theo trạng thái và Top 5 môn học */}
      <div className="charts-row">
        <div className="status-distribution">
          <h2>Phân bố theo trạng thái</h2>
          <div className="status-chart-container">
            <div className="pie-chart-placeholder"></div>
            <div className="status-legend">
              {Object.entries(statusDistribution).map(([status, count]) => (
                <div key={status} className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: statusColors[status] }}
                  ></div>
                  <span>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="top-courses">
          <h2>top 5 môn học có nhiều yêu cầu nhất</h2>
          <div className="top-courses-list">
            {topCourses.map((course, index) => {
              const colors = ["#E91E63", "#4CAF50", "#4CAF50", "#2196F3", "#E91E63"];
              return (
                <div
                  key={index}
                  className="top-course-item"
                  style={{ backgroundColor: colors[index] }}
                >
                  {index + 1}. {course.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Báo cáo chi tiết theo khoa */}
      <div className="faculty-report">
        <div className="report-header">
          <h2>BÁO CÁO CHI TIẾT THEO KHOA</h2>
          <button className="btn-export">
            <FaFileExcel /> Xuất Excel
          </button>
        </div>
        <div className="report-table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Khoa</th>
                <th>Tổng yêu cầu</th>
                <th>Hoàn thành</th>
                <th>Đang xử lý</th>
                <th>Chờ xử lý</th>
                <th>Tỷ lệ hoàn thành</th>
                <th>Thời gian TB</th>
                <th>Tỷ lệ thay đổi điểm</th>
              </tr>
            </thead>
            <tbody>
              {facultyReport.map((row, index) => (
                <tr key={index}>
                  <td>{row.faculty}</td>
                  <td>{row.total}</td>
                  <td>{row.completed}</td>
                  <td>{row.processing}</td>
                  <td>{row.pending}</td>
                  <td>{row.rate}</td>
                  <td>{row.avgTime}</td>
                  <td>{row.scoreChange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ThongKe;
