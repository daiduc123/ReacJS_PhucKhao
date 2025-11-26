import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./QuanLyYeuCau.css";
import { getReviewRequestsByCourse } from "../../../services/phuckhaoApiService";
import { FaSearch } from "react-icons/fa";

// Mock courses data - sẽ được thay thế bằng API call thực tế
const mockCourses = {
  "CNTT001": { teacher: "Nguyễn Văn A", groups: ["1", "2", "3"] },
  "TOM001": { teacher: "Nguyễn Văn B", groups: ["1", "3", "7"] },
  "KHMT001": { teacher: "Nguyễn Văn C", groups: ["9", "10", "11"] },
  "CNTT002": { teacher: "Nguyễn Văn A", groups: ["6", "7", "8"] },
  "TOAN001": { teacher: "Nguyễn Văn A", groups: ["1", "2", "3"] },
};

const QuanLyYeuCau = () => {
  const [courseGroups, setCourseGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getReviewRequestsByCourse();
      // Tạo cards cho mỗi học phần với các trạng thái khác nhau
      const cards = [];
      data.forEach((group) => {
        // Nhóm đơn theo trạng thái
        const statusGroups = {};
        group.requests.forEach((req) => {
          if (!statusGroups[req.status]) {
            statusGroups[req.status] = [];
          }
          statusGroups[req.status].push(req);
        });

        // Tạo card cho mỗi trạng thái
        Object.keys(statusGroups).forEach((status) => {
          const requests = statusGroups[status];
          // Lấy thông tin học phần từ mockCourses
          const courseInfo = mockCourses[group.courseId] || { teacher: "Nguyễn Văn A", groups: ["1", "2", "3"] };
          cards.push({
            courseId: group.courseId,
            courseName: group.courseName,
            courseCode: group.courseId,
            teacher: courseInfo.teacher,
            groups: courseInfo.groups,
            requestCount: requests.length,
            status: status,
            deadline: group.deadline,
            canSend: group.canSend || false,
            requests: requests,
          });
        });
      });
      setCourseGroups(cards);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  const uniqueCourses = [...new Set(courseGroups.map(g => g.courseName))];

  const filteredGroups = courseGroups.filter((group) => {
    const matchesSearch =
      group.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || group.status === filterStatus;
    const matchesCourse = filterCourse === "all" || group.courseName === filterCourse;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const getStatusText = (status) => {
    const statusMap = {
      "Chờ xử lý": "chờ xử lý",
      "Đang xử lý": "chờ xử lý",
      "Đã chuyển đến TLDT": "đã chuyển đến trợ lý đào tạo",
      "Đã chuyển đến TLGV": "đã chuyển đến trợ lý đào tạo",
      "Chờ PĐT nhập điểm": "chờ nhập điểm",
      "Chờ CVKT xác nhận": "chờ nhập điểm",
      "Hoàn thành": "đã hoàn thành",
      "chưa hết thời hạn PK": "chưa hết thời hạn PK",
    };
    return statusMap[status] || status;
  };

  const getCardColor = (status) => {
    // Chờ xử lý - màu vàng/cam
    if (status === "Chờ xử lý" || status === "Đang xử lý" || status === "chưa hết thời hạn PK") {
      return "card-yellow";
    }
    // Đã chuyển đến trợ lý đào tạo - màu tím
    else if (status === "Đã chuyển đến TLDT" || status === "Đã chuyển đến TLGV") {
      return "card-purple";
    }
    // Chờ nhập điểm - màu xanh dương
    else if (status === "Chờ PĐT nhập điểm" || status === "Chờ CVKT xác nhận") {
      return "card-blue";
    }
    // Đã hoàn thành - màu xanh lá
    else if (status === "Hoàn thành") {
      return "card-green";
    }
    return "card-default";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="quanly-container">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="quanly-container">
      <div className="quanly-header">
        <h1>Quản lý yêu cầu phúc khảo</h1>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm theo Tên học phần..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-row">
          <div className="filter-item">
            <label>Học phần:</label>
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tất cả học phần</option>
              {uniqueCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label>Trạng thái:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Đã chuyển đến TLDT">Đã chuyển đến trợ lý đào tạo</option>
              <option value="Chờ PĐT nhập điểm">Chờ nhập điểm</option>
              <option value="Hoàn thành">Đã hoàn thành</option>
            </select>
          </div>
        </div>
      </div>

      {filteredGroups.length === 0 ? (
        <div className="no-data">Không có yêu cầu nào.</div>
      ) : (
        <div className="course-cards-grid">
          {filteredGroups.map((group, index) => (
            <div
              key={`${group.courseId}-${group.status}-${index}`}
              className={`course-card ${getCardColor(group.status)}`}
              onClick={() => navigate(`/cvkt/chi-tiet-hoc-phan/${group.courseId}`)}
            >
              <div className="card-title">
                {group.courseName} #{group.courseCode}
              </div>
              <div className="card-info">
                <div className="card-info-item">
                  <strong>Giảng viên:</strong> {group.teacher}
                </div>
                <div className="card-info-item">
                  <strong>Nhóm học phần:</strong> {group.groups.join(", ")}
                </div>
                <div className="card-info-item">
                  <strong>Số lượng:</strong>{" "}
                  {group.requestCount > 0 ? (
                    <span className="request-count-number">{group.requestCount} đơn</span>
                  ) : (
                    <span className="request-count-icon">Đ</span>
                  )}
                </div>
                <div className="card-info-item">
                  <strong>Trạng thái:</strong> {getStatusText(group.status)}
                </div>
                <div className="card-info-item">
                  <strong>Thời hạn:</strong> {formatDate(group.deadline)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuanLyYeuCau;








