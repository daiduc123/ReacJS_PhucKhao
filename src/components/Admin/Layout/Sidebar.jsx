import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaUsers,
  FaBook,
  FaCog,
  FaChevronLeft,
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: "/admin/tong-quan", label: "Tổng quan", icon: <FaTachometerAlt /> },
    {
      path: "/admin/tao-su-kien",
      label: "Tạo sự kiện",
      icon: <FaCalendarCheck />,
    },
    {
      path: "/admin/quan-ly-nguoi-dung",
      label: "Quản lý người dùng",
      icon: <FaUsers />,
    },
    {
      path: "/admin/quan-ly-hoc-phan",
      label: "Quản lý học phần",
      icon: <FaBook />,
    },
    {
      path: "/admin/cau-hinh-he-thong",
      label: "Cấu hình hệ thống",
      icon: <FaCog />,
    },
  ];

  return (
    <aside className={`AD_sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <nav className="AD_nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "AD_nav-link AD_active" : "AD_nav-link"
                }
                title={item.label}
              >
                <div className="AD_nav-icon">{item.icon}</div>
                {!isCollapsed && (
                  <span className="AD_nav-label">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className="AD_sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FaChevronLeft className="AD_toggle-icon" />
      </div>
    </aside>
  );
};

export default Sidebar;
