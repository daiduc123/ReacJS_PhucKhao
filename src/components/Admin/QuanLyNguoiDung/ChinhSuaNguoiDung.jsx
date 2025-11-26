import React, { useEffect, useState } from "react";
import Modal from "../Shared/Modal";
import "./ThemNguoiDung.css"; // Sẽ dùng chung CSS

const ChinhSuaNguoiDung = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Khi prop 'user' thay đổi, cập nhật state của form
    if (user) {
      setFormData({
        username: user.username || "",
        role: user.role || "",
        fullName: user.fullName || "",
        email: user.email || "",
        status: user.status || "Hoạt động",
        // Thêm các trường khác nếu cần
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Chỉnh sửa thông tin - ${user.fullName}`}
    >
      <form className="AD_form">
        <div className="AD_form-grid">
          <div className="AD_form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              readOnly
              disabled
            />
          </div>
          <div className="AD_form-group">
            <label>Quyền vai trò</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Sinh viên">Sinh viên</option>
              <option value="Admin">Admin</option>
              <option value="Giảng viên">Giảng viên</option>
            </select>
          </div>
          <div className="AD_form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="AD_form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="AD_form-group">
            <label>Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Hoạt động">Hoạt động</option>
              <option value="Bị khóa">Bị khóa</option>
            </select>
          </div>
        </div>
        <div className="AD_form-actions">
          <button
            type="button"
            className="AD_btn AD_btn-secondary"
            onClick={onClose}
          >
            Hủy
          </button>
          <button type="submit" className="AD_btn AD_btn-primary">
            Lưu thay đổi
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChinhSuaNguoiDung;
