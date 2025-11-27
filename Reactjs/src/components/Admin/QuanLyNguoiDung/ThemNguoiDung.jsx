import React, { useState } from "react";
import Modal from "../Shared/Modal";
import "./ThemNguoiDung.css";
import { FaKey, FaCopy, FaCheck } from "react-icons/fa";

// Hàm tạo mật khẩu ngẫu nhiên
const generateRandomPassword = () => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const ThemNguoiDung = ({ isOpen, onClose, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    autoGeneratePassword: true,
    sendEmail: true
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordCopied, setPasswordCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword();
    setGeneratedPassword(newPassword);
    setFormData(prev => ({
      ...prev,
      password: newPassword,
      confirmPassword: newPassword
    }));
  };

  const handleCopyPassword = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      setPasswordCopied(true);
      setTimeout(() => setPasswordCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Nếu tự động tạo mật khẩu và chưa tạo, tạo ngay
    if (formData.autoGeneratePassword && !generatedPassword) {
      handleGeneratePassword();
    }

    const finalPassword = formData.autoGeneratePassword ? generatedPassword : formData.password;

    // Gọi API tạo người dùng
    // TODO: Gọi API thực tế
    // Creating user...
    // Note: API call should be implemented here

    // Nếu có gửi email, gửi email với mật khẩu
    if (formData.sendEmail && formData.email) {
      // TODO: Gọi API gửi email
      // Sending email notification...
    }

    if (onSaveSuccess) {
      onSaveSuccess();
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Thêm người dùng mới">
      <form className="AD_form AD_add-user-form" onSubmit={handleSubmit}>
        <div className="AD_form-grid">
          <div className="AD_form-group">
            <label htmlFor="username">Tên đăng nhập *</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={formData.username}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="AD_form-group">
            <label htmlFor="role">Quyền vai trò *</label>
            <select 
              id="role" 
              name="role" 
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Chọn vai trò</option>
              <option value="student">Sinh viên</option>
              <option value="admin">Admin</option>
              <option value="lecturer">Giảng viên</option>
              <option value="cvkt">Chuyên viên khảo thí</option>
              <option value="tldt">Trợ lý đào tạo</option>
            </select>
          </div>
          <div className="AD_form-group">
            <label htmlFor="fullName">Họ và tên *</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              value={formData.fullName}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="AD_form-group">
            <label htmlFor="email">Email *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="AD_form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="AD_form-group">
            <label htmlFor="dob">Ngày sinh</label>
            <input 
              type="date" 
              id="dob" 
              name="dob" 
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Phần mật khẩu */}
        <div className="AD_password-section">
          <div className="AD_form-group AD_checkbox-group">
            <label>
              <input 
                type="checkbox" 
                name="autoGeneratePassword"
                checked={formData.autoGeneratePassword}
                onChange={handleChange}
              />
              <span>Tự động tạo mật khẩu ngẫu nhiên</span>
            </label>
            {formData.autoGeneratePassword && (
              <button
                type="button"
                className="AD_btn AD_btn-small AD_btn-primary"
                onClick={handleGeneratePassword}
              >
                <FaKey /> Tạo mật khẩu mới
              </button>
            )}
          </div>

          {formData.autoGeneratePassword && generatedPassword && (
            <div className="AD_generated-password-box">
              <label>Mật khẩu đã tạo:</label>
              <div className="AD_password-display">
                <code>{generatedPassword}</code>
                <button
                  type="button"
                  className="AD_btn-copy"
                  onClick={handleCopyPassword}
                  title="Sao chép mật khẩu"
                >
                  {passwordCopied ? <FaCheck /> : <FaCopy />}
                </button>
              </div>
              {passwordCopied && <span className="AD_copy-success">Đã sao chép!</span>}
            </div>
          )}

          {!formData.autoGeneratePassword && (
            <>
              <div className="AD_form-group">
                <label htmlFor="password">Cài đặt mật khẩu *</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="AD_form-group">
                <label htmlFor="confirmPassword">Nhập lại mật khẩu *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="AD_form-group AD_checkbox-group">
            <label>
              <input 
                type="checkbox" 
                name="sendEmail"
                checked={formData.sendEmail}
                onChange={handleChange}
                disabled={!formData.email}
              />
              <span>Gửi thông tin tài khoản qua email (mật khẩu sẽ được gửi qua email)</span>
            </label>
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
            Tạo người dùng
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ThemNguoiDung;
