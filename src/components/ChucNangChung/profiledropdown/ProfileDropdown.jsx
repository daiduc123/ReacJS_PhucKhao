import React from "react";
import { Link } from "react-router-dom";
import "./ProfileDropdown.css"; // File CSS riêng cho component này
import { FiUser, FiLock, FiLogOut } from "react-icons/fi";

// Component này nhận một prop là hàm onLogout để xử lý việc đăng xuất
const ProfileDropdown = ({ onLogout }) => {
  return (
    <div className="profile-dropdown">
      <ul className="profile-dropdown__list">
        <li className="profile-dropdown__item">
          <Link to="/ho-so" className="profile-dropdown__link">
            <FiUser className="profile-dropdown__icon" />
            <span>Lý lịch cá nhân</span>
          </Link>
        </li>
        <li className="profile-dropdown__item">
          <Link to="/doi-mat-khau" className="profile-dropdown__link">
            <FiLock className="profile-dropdown__icon" />
            <span>Đổi mật khẩu</span>
          </Link>
        </li>
        <li className="profile-dropdown__separator"></li>
        <li className="profile-dropdown__item">
          {/* Dùng button vì đây là một hành động, không phải điều hướng trang đơn thuần */}
          <button
            onClick={onLogout}
            className="profile-dropdown__link profile-dropdown__link--logout"
          >
            <FiLogOut className="profile-dropdown__icon" />
            <span>Đăng Xuất</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
