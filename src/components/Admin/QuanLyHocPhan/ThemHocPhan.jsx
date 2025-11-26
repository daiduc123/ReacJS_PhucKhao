import React from "react";
import Modal from "../Shared/Modal";
import "./ThemHocPhan.css";

const ThemHocPhan = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Thêm học phần mới">
      <form className="AD_form">
        <div className="AD_form-grid">
          <div className="AD_form-group">
            <label htmlFor="courseId">Mã học phần</label>
            <input type="text" id="courseId" />
          </div>
          <div className="AD_form-group">
            <label htmlFor="courseName">Tên học phần</label>
            <input type="text" id="courseName" />
          </div>
          <div className="AD_form-group">
            <label htmlFor="credits">Số tín chỉ</label>
            <input type="number" id="credits" />
          </div>
          <div className="AD_form-group">
            <label htmlFor="department">Khoa/Bộ môn</label>
            <select id="department">
              <option>Công nghệ thông tin</option>
              <option>Toán học</option>
            </select>
          </div>
          <div className="AD_form-group">
            <label htmlFor="courseType">Loại học phần</label>
            <select id="courseType">
              <option>Đại cương</option>
              <option>Chuyên ngành</option>
            </select>
          </div>
          <div className="AD_form-group">
            <label htmlFor="lead">Trưởng nhóm</label>
            <select id="lead">
              <option>Nguyễn Văn A</option>
              <option>Trần Thị B</option>
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
            Tạo học phần
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ThemHocPhan;
