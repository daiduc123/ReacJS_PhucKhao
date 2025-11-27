import React, { useState, useEffect } from "react";
import Modal from "../Shared/Modal";
import { updateCourse } from "../../../services/adminApiService"; // <-- IMPORT MỚI

const ChinhSuaHocPhan = ({ isOpen, onClose, course, onSave }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (course) {
      setFormData({ ...course });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await updateCourse(formData.id, formData); // <-- GỌI API CẬP NHẬT
      onSave(); // Gọi hàm để tải lại danh sách
      onClose(); // Đóng modal
    } catch (err) {
      setError("Cập nhật thất bại. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!course) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Chỉnh sửa học phần - ${course.id}`}
    >
      <form onSubmit={handleSubmit} className="AD_form">
        <div className="AD_form-grid">
          <div className="AD_form-group">
            <label>Mã học phần</label>
            <input type="text" value={formData.id || ""} readOnly disabled />
          </div>
          <div className="AD_form-group">
            <label>Tên học phần</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="AD_form-group">
            <label>Số tín chỉ</label>
            <input
              type="number"
              name="credits"
              value={formData.credits || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="AD_form-group">
            <label>Khoa/Bộ môn</label>
            <input
              type="text"
              name="faculty"
              value={formData.faculty || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="AD_form-group">
            <label>Loại học phần</label>
            <select
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
            >
              <option>Đại cương</option>
              <option>Cơ sở ngành</option>
              <option>Chuyên ngành</option>
            </select>
          </div>
          <div className="AD_form-group">
            <label>Trạng thái</label>
            <select
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
            >
              <option>Hoạt động</option>
              <option>Tạm dừng</option>
            </select>
          </div>
        </div>
        {error && <p className="AD_error-message">{error}</p>}
        <div className="AD_form-actions">
          <button
            type="button"
            className="AD_btn AD_btn-secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="AD_btn AD_btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChinhSuaHocPhan;
