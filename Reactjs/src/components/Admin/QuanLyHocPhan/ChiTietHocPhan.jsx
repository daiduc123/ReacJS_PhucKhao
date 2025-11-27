import React, { useState, useEffect } from "react";
import Modal from "../Shared/Modal";
import { getCourseDetail } from "../../../services/adminApiService";
import "./ChiTietHocPhan.css";

const ChiTietHocPhan = ({ isOpen, onClose, courseId }) => {
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && courseId) {
      fetchCourseDetail();
    } else {
      // Reset state khi đóng modal
      setCourseDetail(null);
      setError(null);
    }
  }, [isOpen, courseId]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCourseDetail(courseId);
      setCourseDetail(data);
    } catch (err) {
      setError(err.message || "Không thể tải thông tin chi tiết học phần. Vui lòng thử lại.");
      console.error("Lỗi khi tải chi tiết học phần:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getStatusBadgeClass = (status) => {
    if (!status) return "AD_status-badge AD_status-locked";
    const statusLower = status.toLowerCase();
    if (statusLower === "hoạt động" || statusLower === "hoatdong") {
      return "AD_status-badge AD_status-active";
    }
    return "AD_status-badge AD_status-locked";
  };

  const formatStatus = (status) => {
    if (!status) return "Không xác định";
    if (status === "HOATDONG") return "Hoạt động";
    if (status === "TAMDUNG") return "Tạm dừng";
    if (status === "XOA") return "Đã xóa";
    return status;
  };

  const formatLoaiHp = (loai) => {
    if (!loai) return "Không xác định";
    if (loai === "CO_SO") return "Cơ sở";
    if (loai === "CHUYEN_NGANH") return "Chuyên ngành";
    if (loai === "KHAC") return "Khác";
    return loai;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết học phần" maxWidth="800px">
      <div className="AD_course-detail">
        {loading && (
          <div className="AD_loading-container">
            <div className="AD_loading">Đang tải thông tin...</div>
          </div>
        )}

        {error && (
          <div className="AD_error-container">
            <div className="AD_error-message">{error}</div>
            <button
              className="AD_btn AD_btn-primary"
              onClick={fetchCourseDetail}
              style={{ marginTop: "12px" }}
            >
              Thử lại
            </button>
          </div>
        )}

        {!loading && !error && courseDetail && (
          <div className="AD_course-detail-content">
            {/* Header với tên học phần */}
            <div className="AD_course-detail-header">
              <h2 className="AD_course-detail-title">{courseDetail.tenHp || courseDetail.name}</h2>
              <span className={getStatusBadgeClass(courseDetail.trangThai || courseDetail.status)}>
                {formatStatus(courseDetail.trangThai || courseDetail.status)}
              </span>
            </div>

            {/* Thông tin cơ bản */}
            <div className="AD_course-detail-section">
              <h3 className="AD_section-title">Thông tin cơ bản</h3>
              <div className="AD_detail-grid">
                <div className="AD_detail-item">
                  <span className="AD_detail-label">Mã học phần:</span>
                  <span className="AD_detail-value">
                    {courseDetail.maHp || courseDetail.id || courseDetail.code || "N/A"}
                  </span>
                </div>
                <div className="AD_detail-item">
                  <span className="AD_detail-label">Tên học phần:</span>
                  <span className="AD_detail-value">
                    {courseDetail.tenHp || courseDetail.name || "N/A"}
                  </span>
                </div>
                <div className="AD_detail-item">
                  <span className="AD_detail-label">Số tín chỉ:</span>
                  <span className="AD_detail-value">
                    {courseDetail.soTinChi || courseDetail.credits || "N/A"}
                  </span>
                </div>
                <div className="AD_detail-item">
                  <span className="AD_detail-label">Khoa/Bộ môn:</span>
                  <span className="AD_detail-value">
                    {courseDetail.tenKhoa || courseDetail.faculty || "N/A"}
                  </span>
                </div>
                <div className="AD_detail-item">
                  <span className="AD_detail-label">Loại học phần:</span>
                  <span className="AD_detail-value">
                    {formatLoaiHp(courseDetail.loaiHp || courseDetail.type)}
                  </span>
                </div>
                <div className="AD_detail-item">
                  <span className="AD_detail-label">Trưởng khoa:</span>
                  <span className="AD_detail-value">
                    {courseDetail.tenTruongKhoa || courseDetail.teacher || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Thông tin bổ sung */}
            <div className="AD_course-detail-section">
              <h3 className="AD_section-title">Thông tin bổ sung</h3>
              <div className="AD_detail-grid">
                <div className="AD_detail-item AD_detail-item-full">
                  <span className="AD_detail-label">Trạng thái:</span>
                  <span className={getStatusBadgeClass(courseDetail.trangThai || courseDetail.status)}>
                    {formatStatus(courseDetail.trangThai || courseDetail.status)}
                  </span>
                </div>
                {courseDetail.id && (
                  <div className="AD_detail-item">
                    <span className="AD_detail-label">ID:</span>
                    <span className="AD_detail-value">{courseDetail.id}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer với nút đóng */}
        <div className="AD_course-detail-footer">
          <button
            type="button"
            className="AD_btn AD_btn-secondary"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChiTietHocPhan;













