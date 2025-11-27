import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./Header.css";
import { FaUserCircle, FaCaretDown, FaSignOutAlt, FaKey, FaUser } from "react-icons/fa";
import ChangePasswordModal from "../../Admin/Shared/ConfirmationModal";
import logoImage from "../../../assets/imgs/logo.png";
import Mu from "../../../icons/icon_cap.png";
import Sach from "../../../icons/icon_Book.png";
import Lich from "../../../icons/icon_calander.png";

const Header = ({ currentInfo, onHocKyClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const hockyRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.CVKT_user-dropdown-wrapper') && !event.target.closest('.CVKT_dropdown-menu')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const formatDate = (date) => {
    if (!date || isNaN(date.getTime())) {
      return "Đang tải thời gian...";
    }

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Ho_Chi_Minh",
    };

    return date.toLocaleDateString("vi-VN", options);
  };

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
      logout();
      navigate("/canbo");
    }
  };

  const displayUser = user || {
    fullName: "Trần Đại Đức",
    role: "CVKT phúc khảo",
  };

  return (
    <header className="CVKT_header-wrapper">
      <div className="CVKT_top-bar">
        <span>TRƯỜNG ĐẠI HỌC KHOA HỌC - ĐẠI HỌC HUẾ</span>
        <span>{formatDate(currentTime)}</span>
      </div>
      <div className="CVKT_main-header">
        <div className="CVKT_logo-container">
          <img src={logoImage} alt="Logo HUSC" className="CVKT_logo" />
          <div className="CVKT_system-name">
            <h2>hệ thống phúc khảo husc</h2>
            <span>Chuyên viên khảo thí</span>
          </div>
        </div>
        <div className="CVKT_user-dropdown-wrapper">
          <div
            className="CVKT_user-dropdown"
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <FaUserCircle size={24} />
            <div className="CVKT_user-info">
              <span className="CVKT_user-name">{displayUser.fullName}</span>
              <small className="CVKT_user-role">{displayUser.role}</small>
            </div>
            <FaCaretDown
              className={`CVKT_dropdown-icon ${isDropdownOpen ? "open" : ""}`}
            />
          </div>

          {isDropdownOpen && (
            <div className="CVKT_dropdown-menu" onClick={(e) => e.stopPropagation()}>
              <div className="CVKT_dropdown-header">
                <FaUserCircle size={40} className="CVKT_dropdown-avatar" />
                <div className="CVKT_dropdown-user-info">
                  <span className="CVKT_dropdown-name">{displayUser.fullName}</span>
                  <span className="CVKT_dropdown-role">{displayUser.role}</span>
                </div>
                <FaCaretDown className="CVKT_dropdown-header-icon" />
              </div>
              <div className="CVKT_dropdown-divider"></div>
              <button
                className="CVKT_dropdown-item"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Navigate to personal profile
                  setIsDropdownOpen(false);
                }}
              >
                <FaUser className="CVKT_dropdown-item-icon" />
                <span>Lý lịch cá nhân</span>
              </button>
              <button
                className="CVKT_dropdown-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChangePasswordModalOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                <FaKey className="CVKT_dropdown-item-icon" />
                <span>Đổi mật khẩu</span>
              </button>
              <button 
                className="CVKT_dropdown-item CVKT_dropdown-item-logout"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                  setIsDropdownOpen(false);
                }}
              >
                <FaSignOutAlt className="CVKT_dropdown-item-icon" />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="CVKT_hocky" ref={hockyRef} onClick={onHocKyClick}>
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








