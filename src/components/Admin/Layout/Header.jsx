import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./Header.css";
import { FaUserCircle, FaCaretDown, FaSignOutAlt, FaKey, FaUser } from "react-icons/fa";
import ChangePasswordModal from "../Shared/ConfirmationModal";
import logoImage from "../../../assets/imgs/logo.png";
import Mu from "../../../icons/icon_cap.png";
import Sach from "../../../icons/icon_Book.png";
import Lich from "../../../icons/icon_calander.png";

const Header = ({ currentInfo, onHocKyClick }) => {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const navigate = useNavigate();
  const hockyRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.AD_user-dropdown') && !event.target.closest('.AD_dropdown-menu')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const formatDate = (date) => {
    // Kiểm tra xem date có hợp lệ không trước khi định dạng
    if (!date || isNaN(date.getTime())) {
      return "Đang tải thời gian..."; // Hoặc trả về chuỗi trống
    }

    const options = {
      weekday: "long", // -> "Thứ Hai"
      year: "numeric", // -> "2025"
      month: "long", // -> "tháng 10"
      day: "numeric", // -> "3"
      timeZone: "Asia/Ho_Chi_Minh",
    };

    // toLocaleDateString sẽ tự động ghép lại thành chuỗi hoàn chỉnh
    return date.toLocaleDateString("vi-VN", options);
  };
  const handleLogout = () => {
    if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
      logout();
      navigate("/canbo");
    }
  };

  const displayUser = user || {
    fullName: "Admin",
    role: "Quản trị viên",
  };

  return (
    <header className="AD_header-wrapper">
      <div className="AD_top-bar">
        <span>TRƯỜNG ĐẠI HỌC KHOA HỌC - ĐẠI HỌC HUẾ</span>
        <span>{formatDate(currentTime)}</span>
      </div>
      <div className="AD_main-header">
        <div className="AD_logo-container">
          <img src={logoImage} alt="Logo HUSC" className="AD_logo" />
          <div className="AD_system-name">
            <h2>hệ thống phúc khảo husc</h2>
            <span>Người quản lý hệ thống (Admin)</span>
          </div>
        </div>
        <div className="AD_user-dropdown-wrapper">
          <div
            className="AD_user-dropdown"
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <FaUserCircle size={24} />
            <div className="AD_user-info">
              <span>{displayUser.fullName}</span>
              <small>{displayUser.role}</small>
            </div>
            <FaCaretDown
              className={`AD_dropdown-icon ${isDropdownOpen ? "open" : ""}`}
            />
          </div>
          
          {isDropdownOpen && (
            <div className="AD_dropdown-menu" onClick={(e) => e.stopPropagation()}>
              <div className="AD_dropdown-header">
                <FaUserCircle size={40} className="AD_dropdown-avatar" />
                <div className="AD_dropdown-user-info">
                  <span className="AD_dropdown-name">{displayUser.fullName}</span>
                  <span className="AD_dropdown-role">{displayUser.role}</span>
                </div>
                <FaCaretDown className="AD_dropdown-header-icon" />
              </div>
              <div className="AD_dropdown-divider"></div>
              <button
                className="AD_dropdown-item"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Navigate to personal profile
                  setIsDropdownOpen(false);
                }}
              >
                <FaUser className="AD_dropdown-item-icon" />
                <span>Lý lịch cá nhân</span>
              </button>
              <button
                className="AD_dropdown-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChangePasswordModalOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                <FaKey className="AD_dropdown-item-icon" />
                <span>Đổi mật khẩu</span>
              </button>
              <button 
                className="AD_dropdown-item AD_dropdown-item-logout"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                  setIsDropdownOpen(false);
                }}
              >
                <FaSignOutAlt className="AD_dropdown-item-icon" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="AD_hocky" ref={hockyRef} onClick={onHocKyClick}>
        <img src={Lich} alt="học kì" />
        Học kỳ {currentInfo?.hocky || "1"}, năm học: {currentInfo?.namhoc || "2025-2026"}
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </header>
  );
};

export default Header;
