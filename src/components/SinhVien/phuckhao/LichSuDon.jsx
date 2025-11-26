import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LichSuDon.css";
import { getStudentReviewHistory } from "../../../services/phuckhaoApiService";
import { FaSearch } from "react-icons/fa";

const LichSuDon = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSemester, setFilterSemester] = useState("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const history = await getStudentReviewHistory("sv01");
      setRequests(history);
    } catch (err) {
      // Error handling - show empty state or error message
    } finally {
      setLoading(false);
    }
  };

  // Nhóm đơn theo học kỳ
  const groupBySemester = (requests) => {
    const grouped = {};
    requests.forEach((req) => {
      const semester = req.semester || "Không xác định";
      const year = req.year || "Không xác định";
      const key = `${semester}-${year}`;
      if (!grouped[key]) {
        grouped[key] = {
          semester,
          year,
          requests: [],
        };
      }
      grouped[key].requests.push(req);
    });
    return grouped;
  };

  // Lọc dữ liệu
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.courseId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || req.status === filterStatus;
    const semester = req.semester || "Không xác định";
    const year = req.year || "Không xác định";
    const semesterKey = `${semester}-${year}`;
    const matchesSemester =
      filterSemester === "all" || semesterKey === filterSemester;
    return matchesSearch && matchesStatus && matchesSemester;
  });

  const groupedData = groupBySemester(filteredRequests);

  // Lấy danh sách học kỳ để filter
  const semesters = Object.keys(groupBySemester(requests));

  const getStatusDisplay = (status) => {
    const statusMap = {
      "Chờ xử lý": { text: "Chờ xử lý", bgColor: "#fff3cd", color: "#856404" },
      "Đang xử lý": { text: "Đang xử lý", bgColor: "#d1ecf1", color: "#0c5460" },
      "Chờ CVKT xác nhận": {
        text: "Chờ CVKT xác nhận",
        bgColor: "#d1ecf1",
        color: "#0c5460",
      },
      "Chờ PĐT nhập điểm": {
        text: "Chờ PĐT nhập điểm",
        bgColor: "#d1ecf1",
        color: "#0c5460",
      },
      "Hoàn thành": { text: "Hoàn thành", bgColor: "#d4edda", color: "#155724" },
    };
    return statusMap[status] || { text: status, bgColor: "#e2e3e5", color: "#383d41" };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  // Tính tổng số đơn
  const totalRequests = filteredRequests.length;
  const completedRequests = filteredRequests.filter(
    (r) => r.status === "Hoàn thành"
  ).length;
  const pendingRequests = filteredRequests.filter(
    (r) => r.status === "Chờ xử lý" || r.status === "Đang xử lý"
  ).length;
  
  // Tính số đơn thay đổi điểm và giữ nguyên điểm
  const changedScoreRequests = filteredRequests.filter(
    (r) => r.status === "Hoàn thành" && 
    r.newScore !== null && 
    r.newScore !== undefined && 
    r.oldScore !== null && 
    r.oldScore !== undefined &&
    r.newScore !== r.oldScore
  ).length;
  
  const unchangedScoreRequests = filteredRequests.filter(
    (r) => r.status === "Hoàn thành" && 
    r.newScore !== null && 
    r.newScore !== undefined && 
    r.oldScore !== null && 
    r.oldScore !== undefined &&
    r.newScore === r.oldScore
  ).length;

  if (loading) {
    return (
      <div className="lichsu-container">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="lichsu-container">
      <h1 className="page-title">Lịch sử đơn phúc khảo</h1>

      {/* Filter section */}
      <div className="filter-section">
        <div className="filter-group">
          <label>Trạng thái:</label>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="Chờ xử lý">Chờ xử lý</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Chờ CVKT xác nhận">Chờ CVKT xác nhận</option>
            <option value="Chờ PĐT nhập điểm">Chờ PĐT nhập điểm</option>
            <option value="Hoàn thành">Hoàn thành</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Học kỳ:</label>
          <select
            className="filter-select"
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
          >
            <option value="all">Tất cả</option>
            {semesters.map((sem) => {
              const [semester, year] = sem.split("-");
              return (
                <option key={sem} value={sem}>
                  Học kỳ {semester} - {year}
                </option>
              );
            })}
          </select>
        </div>

        <div className="search-group">
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm theo tên môn, mã môn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Summary section */}
      <div className="summary-section">
        <div className="summary-boxes-row">
          <div className="summary-box large">
            <div className="summary-label">Tổng số đơn</div>
            <div className="summary-value">{totalRequests}</div>
          </div>
          <div className="summary-box">
            <div className="summary-label">Đã hoàn thành</div>
            <div className="summary-value">{completedRequests}</div>
          </div>
          <div className="summary-box">
            <div className="summary-label">Đang xử lý</div>
            <div className="summary-value">{pendingRequests}</div>
          </div>
          <div className="summary-box">
            <div className="summary-label">Thay đổi điểm</div>
            <div className="summary-value">{changedScoreRequests}</div>
          </div>
          <div className="summary-box">
            <div className="summary-label">Giữ nguyên điểm</div>
            <div className="summary-value">{unchangedScoreRequests}</div>
          </div>
        </div>
      </div>

      {/* Semester sections */}
      {Object.keys(groupedData).length === 0 ? (
        <div className="no-data-message">
          Không có đơn phúc khảo nào.
        </div>
      ) : (
        Object.values(groupedData)
          .sort((a, b) => {
            // Sắp xếp theo năm học và học kỳ
            if (a.year !== b.year) {
              return b.year.localeCompare(a.year);
            }
            return parseInt(b.semester) - parseInt(a.semester);
          })
          .map((group) => {
            return (
              <div key={`${group.semester}-${group.year}`} className="semester-section">
                <div className="semester-header">
                  <h2 className="semester-title">
                    Học kỳ {group.semester} - Năm học {group.year}
                  </h2>
                </div>

                <div className="requests-table-container">
                  <table className="requests-table">
                    <thead>
                      <tr>
                        <th>Mã học phần</th>
                        <th>Tên học phần</th>
                        <th>Điểm cũ</th>
                        <th>Điểm mới</th>
                        <th>Ngày nộp</th>
                        <th>Trạng thái</th>
                        <th>Thanh toán</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.requests.map((req) => {
                        const statusDisplay = getStatusDisplay(req.status);
                        return (
                          <tr key={req.id}>
                            <td>{req.courseId || "-"}</td>
                            <td>
                              <a
                                className="course-link"
                                onClick={() =>
                                  navigate(`/student/chi-tiet-don/${req.id}`)
                                }
                              >
                                {req.courseName || "-"}
                              </a>
                            </td>
                            <td className="score-cell">
                              {req.oldScore !== null && req.oldScore !== undefined
                                ? req.oldScore
                                : "-"}
                            </td>
                            <td className="score-cell">
                              {req.newScore !== null && req.newScore !== undefined
                                ? req.newScore
                                : "-"}
                            </td>
                            <td>{formatDate(req.submittedDate)}</td>
                            <td>
                              <span
                                className="status-badge"
                                style={{
                                  backgroundColor: statusDisplay.bgColor,
                                  color: statusDisplay.color,
                                }}
                              >
                                {statusDisplay.text}
                              </span>
                            </td>
                            <td>
                              {req.paymentStatus === "Đã thanh toán" ? (
                                <span style={{ color: "#28a745" }}>✓ Đã thanh toán</span>
                              ) : (
                                <span style={{ color: "#dc3545" }}>Chưa thanh toán</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
};

export default LichSuDon;
