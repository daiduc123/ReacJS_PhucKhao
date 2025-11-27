import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./Header.css";
import { FaUserCircle, FaCaretDown, FaSignOutAlt, FaKey } from "react-icons/fa";
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
    fullName: "Trợ lý đào tạo",
    role: "Trợ lý đào tạo",
  };

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.TLDT_user-dropdown-wrapper')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <header className="TLDT_header-wrapper">
      <div className="TLDT_top-bar">
        <span>TRƯỜNG ĐẠI HỌC KHOA HỌC - ĐẠI HỌC HUẾ</span>
        <span>{formatDate(currentTime)}</span>
      </div>
      <div className="TLDT_main-header">
        <div className="TLDT_logo-container">
          <img src={logoImage} alt="Logo HUSC" className="TLDT_logo" />
          <div className="TLDT_system-name">
            <h2>hệ thống phúc khảo husc</h2>
            <span>Trợ lý đào tạo</span>
          </div>
        </div>
        <div className="TLDT_user-dropdown-wrapper">
          <div
            className="TLDT_user-dropdown"
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <FaUserCircle size={24} />
            <div className="TLDT_user-info">
              <span>{displayUser.fullName}</span>
              <small>{displayUser.role}</small>
            </div>
            <FaCaretDown
              className={`TLDT_dropdown-icon ${isDropdownOpen ? "open" : ""}`}
            />
          </div>

          {isDropdownOpen && (
            <div className="TLDT_dropdown-menu" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChangePasswordModalOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                <FaKey /> Đổi mật khẩu
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                  setIsDropdownOpen(false);
                }}
              >
                <FaSignOutAlt /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="TLDT_hocky" ref={hockyRef} onClick={onHocKyClick}>
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








