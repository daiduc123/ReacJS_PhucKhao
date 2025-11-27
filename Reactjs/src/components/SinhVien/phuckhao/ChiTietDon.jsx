import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ChiTietDon.css";
import { getStudentReviewHistory } from "../../../services/phuckhaoApiService";
import { FaArrowLeft, FaMoneyBillWave } from "react-icons/fa";

const ChiTietDon = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [requestId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const history = await getStudentReviewHistory("sv01");
      const foundRequest = history.find((r) => r.id === requestId);
      setRequest(foundRequest);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      "Chờ xử lý": "badge-warning",
      "Đang xử lý": "badge-processing",
      "Chờ CVKT xác nhận": "badge-info",
      "Chờ PĐT nhập điểm": "badge-waiting",
      "Hoàn thành": "badge-success",
    };
    return badges[status] || "badge-default";
  };

  if (loading) {
    return (
      <div className="chitietdon-container">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="chitietdon-container">
        <div className="error">Không tìm thấy đơn phúc khảo.</div>
      </div>
    );
  }

  return (
    <div className="chitietdon-container">
      <div className="chitietdon-header">
        <button className="btn-back" onClick={() => navigate("/student/lich-su-don")}>
          <FaArrowLeft /> Quay lại
        </button>
        <h1>Chi tiết đơn phúc khảo</h1>
      </div>

      <div className="request-details">
        <div className="detail-section">
          <h2>Thông tin đơn</h2>
          <div className="detail-card">
            <div className="detail-row">
              <strong>Mã đơn:</strong>
              <span>{request.id}</span>
            </div>
            <div className="detail-row">
              <strong>Trạng thái:</strong>
              <span className={`badge ${getStatusBadge(request.status)}`}>{request.status}</span>
            </div>
            <div className="detail-row">
              <strong>Ngày nộp đơn:</strong>
              <span>{new Date(request.submittedDate).toLocaleDateString("vi-VN")}</span>
            </div>
            <div className="detail-row">
              <strong>Thanh toán:</strong>
              <span className={request.paymentStatus === "Đã thanh toán" ? "paid" : "unpaid"}>
                {request.paymentStatus}
              </span>
            </div>
            {request.paymentDate && (
              <div className="detail-row">
                <strong>Ngày thanh toán:</strong>
                <span>{new Date(request.paymentDate).toLocaleDateString("vi-VN")}</span>
              </div>
            )}
          </div>
        </div>

        <div className="detail-section">
          <h2>Thông tin học phần</h2>
          <div className="detail-card">
            <div className="detail-row">
              <strong>Tên học phần:</strong>
              <span>{request.courseName}</span>
            </div>
            <div className="detail-row">
              <strong>Mã học phần:</strong>
              <span>{request.courseId}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Kết quả phúc khảo</h2>
          <div className="detail-card">
            <div className="score-comparison">
              <div className="score-item">
                <label>Điểm cũ</label>
                <div className="score-value old-score">{request.oldScore}</div>
              </div>
              <div className="score-arrow">→</div>
              <div className="score-item">
                <label>Điểm mới</label>
                <div className="score-value new-score">
                  {request.newScore !== null ? request.newScore : "Chưa có"}
                </div>
              </div>
            </div>
            {request.newScore !== null && (
              <div className="score-change">
                {request.newScore > request.oldScore ? (
                  <span className="change-positive">
                    Tăng {((request.newScore - request.oldScore) * 10).toFixed(1)} điểm
                  </span>
                ) : request.newScore < request.oldScore ? (
                  <span className="change-negative">
                    Giảm {((request.oldScore - request.newScore) * 10).toFixed(1)} điểm
                  </span>
                ) : (
                  <span className="change-neutral">Không thay đổi</span>
                )}
              </div>
            )}
          </div>
        </div>

        {request.paymentStatus === "Chưa thanh toán" && (
          <div className="action-section">
            <button
              className="btn-pay"
              onClick={() => navigate(`/student/thanh-toan/${request.id}`)}
            >
              <FaMoneyBillWave /> Thanh toán phí phúc khảo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChiTietDon;
























