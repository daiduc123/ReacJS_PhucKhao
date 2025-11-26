import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NopDonPhucKhao.css";
import { getAvailableCourses, submitReviewRequest } from "../../../services/phuckhaoApiService";
import { FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const NopDonPhucKhao = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
    // Load pending courses from sessionStorage if exists
    const pendingCourses = sessionStorage.getItem("pendingCoursesForPayment");
    if (pendingCourses) {
      try {
        const parsed = JSON.parse(pendingCourses);
        setSelectedCourses(parsed);
      } catch (e) {
        // Silent fail - invalid sessionStorage data
      }
    }
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAvailableCourses("sv01");
      setCourses(data);
    } catch (err) {
      setError(err.message || "Không thể tải danh sách môn học. Vui lòng thử lại.");
      // Error đã được xử lý và hiển thị cho user
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (courseId) => {
    setSelectedCourses((prev) => {
      if (prev.includes(courseId)) {
        return prev.filter((id) => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  const handleSelectAll = () => {
    const eligibleCourses = courses.filter(
      (c) => c.status === "Đủ điều kiện"
    );
    if (selectedCourses.length === eligibleCourses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(eligibleCourses.map((c) => c.id));
    }
  };

  const handleSubmit = () => {
    if (selectedCourses.length === 0) {
      setError("Vui lòng chọn ít nhất một môn học để phúc khảo.");
      return;
    }

    // Store selected courses in sessionStorage and navigate to payment
    sessionStorage.setItem(
      "pendingCoursesForPayment",
      JSON.stringify(selectedCourses)
    );
    navigate("/student/thanh-toan");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Đủ điều kiện":
        return <FaCheckCircle className="status-icon eligible" />;
      case "Đã nộp (chờ xử lý)":
        return <FaClock className="status-icon pending" />;
      default:
        return <FaTimesCircle className="status-icon not-eligible" />;
    }
  };

  const getStatusText = (status) => {
    return status;
  };

  const selectedCoursesData = courses.filter((c) =>
    selectedCourses.includes(c.id)
  );

  if (loading) {
    return (
      <div className="nopdon-container">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="nopdon-container">
      <h1 className="page-title">Nộp đơn phúc khảo</h1>

      <div className="warning-box">
        <FaExclamationTriangle className="warning-icon" />
        <div>
          <strong>Lưu ý:</strong> Sinh viên chỉ được phúc khảo các môn học đã có
          điểm và trong thời hạn quy định. Vui lòng kiểm tra kỹ thông tin trước
          khi nộp đơn.
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="courses-table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    courses.filter((c) => c.status === "Đủ điều kiện").length >
                      0 &&
                    selectedCourses.length ===
                      courses.filter((c) => c.status === "Đủ điều kiện").length
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th>Mã học phần</th>
              <th>Tên học phần</th>
              <th>Điểm</th>
              <th>Xếp loại</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => handleCheckboxChange(course.id)}
                    disabled={course.status !== "Đủ điều kiện"}
                  />
                </td>
                <td>
                  <span className="course-code-link">{course.id}</span>
                </td>
                <td>{course.name}</td>
                <td className="score-cell">
                  {course.score !== null && course.score !== undefined
                    ? course.score
                    : "-"}
                </td>
                <td className="grade-cell">
                  {course.grade || "-"}
                </td>
                <td className="status-cell">
                  {getStatusIcon(course.status)}
                  <span
                    className={`status-text ${
                      course.status === "Đủ điều kiện"
                        ? "eligible"
                        : course.status === "Đã nộp (chờ xử lý)"
                        ? "pending"
                        : "not-eligible"
                    }`}
                  >
                    {getStatusText(course.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCourses.length > 0 && (
        <div className="note-below-table">
          <FaExclamationTriangle className="note-icon" />
          <span>
            Đã chọn <strong>{selectedCourses.length}</strong> môn học để phúc
            khảo.
          </span>
        </div>
      )}

      <div className="regulations-section">
        <h3>Quy định phúc khảo:</h3>
        <ul>
          <li>
            Sinh viên chỉ được phúc khảo các môn học đã có điểm trong học kỳ
            hiện tại.
          </li>
          <li>
            Thời hạn nộp đơn phúc khảo: 15 ngày kể từ ngày công bố điểm.
          </li>
          <li>
            Lệ phí phúc khảo: 20.000 VNĐ/môn học (thanh toán sau khi nộp đơn).
          </li>
          <li>
            Kết quả phúc khảo sẽ được thông báo trong vòng 16 ngày làm việc.
          </li>
        </ul>
      </div>

      <div className="action-buttons">
        <button className="btn-cancel" onClick={() => navigate("/student")}>
          Hủy
        </button>
        <button
          className="btn-confirm"
          onClick={handleSubmit}
          disabled={selectedCourses.length === 0}
        >
          Xác nhận
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Xác nhận nộp đơn</div>
            <div className="modal-message">
              Bạn có chắc chắn muốn nộp đơn phúc khảo cho{" "}
              {selectedCourses.length} môn học đã chọn không?
            </div>
            <div className="modal-actions">
              <button
                className="btn-modal-cancel"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
              <button
                className="btn-modal-confirm"
                onClick={() => {
                  setShowModal(false);
                  handleSubmit();
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NopDonPhucKhao;
