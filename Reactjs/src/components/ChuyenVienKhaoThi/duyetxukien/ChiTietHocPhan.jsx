import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ChiTietHocPhan.css";
import { getCourseDetail, sendToTLDT, updateReviewScore } from "../../../services/phuckhaoApiService";
import { FaArrowLeft, FaPaperPlane, FaCheckCircle, FaEdit, FaSave } from "react-icons/fa";

const ChiTietHocPhan = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [editingScores, setEditingScores] = useState({});
  const [tempScores, setTempScores] = useState({});

  useEffect(() => {
    loadData();
  }, [courseId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getCourseDetail(courseId);
      setCourseDetail(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      setError("Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendToTLDT = async () => {
    if (!courseDetail?.canSend) {
      setError("Không thể gửi. Học phần này vẫn đang trong thời hạn nhận đơn phúc khảo của sinh viên. Vui lòng thực hiện sau khi hết hạn.");
      return;
    }

    if (!window.confirm(`Bạn có chắc muốn chuyển ${courseDetail.requests.length} yêu cầu này đến Trợ lý Đào tạo?`)) {
      return;
    }

    try {
      setSending(true);
      setError(null);
      await sendToTLDT(courseId);
      await loadData();
      alert("Đã chuyển đơn đến Trợ lý Đào tạo thành công!");
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi chuyển đơn.");
    } finally {
      setSending(false);
    }
  };


  const handleEditScore = (requestId, currentScore) => {
    setEditingScores({ ...editingScores, [requestId]: true });
    setTempScores({ ...tempScores, [requestId]: currentScore });
  };

  const handleSaveScore = async (requestId) => {
    try {
      const newScore = parseFloat(tempScores[requestId]);
      if (isNaN(newScore) || newScore < 0 || newScore > 10) {
        alert("Điểm phải là số từ 0 đến 10");
        return;
      }
      await updateReviewScore(requestId, newScore);
      setEditingScores({ ...editingScores, [requestId]: false });
      await loadData();
      alert("Đã cập nhật điểm thành công!");
    } catch (err) {
      alert("Có lỗi xảy ra khi cập nhật điểm.");
    }
  };

  const handleCancelEdit = (requestId) => {
    setEditingScores({ ...editingScores, [requestId]: false });
    setTempScores({ ...tempScores, [requestId]: null });
  };

  const getStatusBadge = (status) => {
    const badges = {
      "Chờ xử lý": "badge-warning",
      "Đang xử lý": "badge-processing",
      "Chờ CVKT xác nhận": "badge-info",
      "Hoàn thành": "badge-success",
    };
    return badges[status] || "badge-default";
  };

  if (loading) {
    return (
      <div className="chitiet-container">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (!courseDetail) {
    return (
      <div className="chitiet-container">
        <div className="error">Không tìm thấy thông tin học phần.</div>
      </div>
    );
  }

  const { course, requests, event, canSend } = courseDetail;

  return (
    <div className="chitiet-container">
      <div className="chitiet-header">
        <button className="btn-back" onClick={() => navigate("/cvkt/quan-ly-yeu-cau")}>
          <FaArrowLeft /> Quay lại
        </button>
        <h1>Chi tiết học phần: {course?.name}</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="course-info-section">
        <div className="info-card">
          <h3>Thông tin học phần</h3>
          <div className="info-grid">
            <div>
              <strong>Mã học phần:</strong> {course?.code}
            </div>
            <div>
              <strong>Khoa:</strong> {course?.faculty}
            </div>
            <div>
              <strong>Số tín chỉ:</strong> {course?.credits}
            </div>
            <div>
              <strong>Giảng viên:</strong> {course?.teacher}
            </div>
          </div>
        </div>

        {event && (
          <div className="info-card">
            <h3>Thông tin đợt phúc khảo</h3>
            <div className="info-grid">
              <div>
                <strong>Đợt:</strong> {event.name}
              </div>
              <div>
                <strong>Hạn nộp đơn:</strong> {new Date(event.endDate).toLocaleDateString("vi-VN")}
              </div>
              <div>
                <strong>Ngày công bố điểm:</strong> {new Date(event.resultDate).toLocaleDateString("vi-VN")}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="requests-section">
        <div className="section-header">
          <h2>Danh sách đơn phúc khảo ({requests.length})</h2>
          {canSend && requests.some((r) => r.status === "Chờ xử lý") && (
            <button
              className="btn-send"
              onClick={handleSendToTLDT}
              disabled={sending}
            >
              <FaPaperPlane /> Chuyển đến Trợ lý Đào tạo
            </button>
          )}
        </div>

        <div className="requests-table">
          <table>
            <thead>
              <tr>
                {requests.some((r) => r.status === "Chờ CVKT xác nhận") ? (
                  <>
                    <th>Mã SV</th>
                    <th>Họ tên</th>
                    <th>Tên học phần</th>
                    <th>Ngày thi</th>
                    <th>Giờ thi</th>
                    <th>Phòng thi</th>
                    <th>Điểm</th>
                    <th>Điểm phúc khảo</th>
                    <th>Thao tác</th>
                  </>
                ) : (
                  <>
                    <th>Mã SV</th>
                    <th>Họ tên</th>
                    <th>Tên học phần</th>
                    <th>Ngày thi</th>
                    <th>Giờ thi</th>
                    <th>Phòng thi</th>
                    <th>Điểm</th>
                    <th>Trạng thái</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.studentId}</td>
                  <td>
                    <strong>{req.studentName}</strong>
                  </td>
                  <td>{req.courseName}</td>
                  <td>{req.ngayThi ? new Date(req.ngayThi).toLocaleDateString("vi-VN") : "-"}</td>
                  <td>{req.gioThi || "-"}</td>
                  <td>{req.phongThi || "-"}</td>
                  <td className="score-cell">{req.oldScore}</td>
                  {req.status === "Chờ CVKT xác nhận" ? (
                    <>
                      <td className="score-cell">
                        {editingScores[req.id] ? (
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={tempScores[req.id] ?? req.newScore ?? ""}
                            onChange={(e) => setTempScores({ ...tempScores, [req.id]: e.target.value })}
                            className="score-input-edit"
                          />
                        ) : (
                          <span className="new-score">{req.newScore ?? "-"}</span>
                        )}
                      </td>
                      <td>
                        {editingScores[req.id] ? (
                          <div className="edit-actions">
                            <button
                              className="btn-save"
                              onClick={() => handleSaveScore(req.id)}
                              title="Lưu"
                            >
                              <FaSave />
                            </button>
                            <button
                              className="btn-cancel"
                              onClick={() => handleCancelEdit(req.id)}
                              title="Hủy"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <button
                            className="btn-edit"
                            onClick={() => handleEditScore(req.id, req.newScore)}
                            title="Chỉnh sửa điểm"
                          >
                            <FaEdit />
                          </button>
                        )}
                      </td>
                    </>
                  ) : (
                    <td>
                      <span className={`badge ${getStatusBadge(req.status)}`}>{req.status}</span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChiTietHocPhan;

