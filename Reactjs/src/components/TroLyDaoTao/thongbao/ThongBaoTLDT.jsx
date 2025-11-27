import React, { useState, useEffect } from "react";
import "./ThongBaoTLDT.css";
import {
  FaBell,
  FaExclamationCircle,
  FaInfoCircle,
  FaCheckCircle,
  FaTimes,
  FaFilter,
} from "react-icons/fa";

const ThongBaoTLDT = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); // all, unread, read
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    // Mock data
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: "info",
          title: "Nhận đơn phúc khảo mới",
          message: "Bạn đã nhận 3 đơn phúc khảo mới từ Chuyên viên khảo thí cho học phần Mẫu hình thiết kế",
          time: "2 giờ trước",
          read: false,
        },
        {
          id: 2,
          type: "success",
          title: "Nhập điểm thành công",
          message: "Đã nhập điểm phúc khảo thành công cho 5 sinh viên. Đơn đã được chuyển về Khảo thí.",
          time: "5 giờ trước",
          read: false,
        },
        {
          id: 3,
          type: "warning",
          title: "Cần xử lý đơn",
          message: "Có 2 học phần đang chờ bạn xử lý. Vui lòng kiểm tra và xử lý sớm.",
          time: "1 ngày trước",
          read: true,
        },
        {
          id: 4,
          type: "info",
          title: "Xuất file Excel thành công",
          message: "Đã xuất file Excel danh sách phúc khảo cho giảng viên học phần Cấu trúc dữ liệu",
          time: "2 ngày trước",
          read: true,
        },
        {
          id: 5,
          type: "success",
          title: "Hoàn tất xử lý",
          message: "Đã hoàn tất xử lý đơn phúc khảo cho học phần Mạng máy tính. Tất cả điểm đã được nhập.",
          time: "3 ngày trước",
          read: true,
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return <FaInfoCircle />;
      case "success":
        return <FaCheckCircle />;
      case "warning":
        return <FaExclamationCircle />;
      default:
        return <FaBell />;
    }
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.read);

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="thongbao-tldt">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải thông báo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="thongbao-tldt">
      <div className="thongbao-header">
        <div>
          <h1>Thông báo</h1>
          <p className="subtitle">
            {unreadCount > 0
              ? `Bạn có ${unreadCount} thông báo chưa đọc`
              : "Tất cả thông báo đã được đọc"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="btn-mark-all" onClick={markAllAsRead}>
            Đánh dấu tất cả đã đọc
          </button>
        )}
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          <FaFilter /> Tất cả ({notifications.length})
        </button>
        <button
          className={`filter-tab ${filter === "unread" ? "active" : ""}`}
          onClick={() => setFilter("unread")}
        >
          <FaBell /> Chưa đọc ({unreadCount})
        </button>
        <button
          className={`filter-tab ${filter === "read" ? "active" : ""}`}
          onClick={() => setFilter("read")}
        >
          <FaCheckCircle /> Đã đọc ({notifications.length - unreadCount})
        </button>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications">
            <FaBell className="empty-icon" />
            <p>Không có thông báo nào</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${notif.read ? "read" : "unread"} ${notif.type}`}
            >
              <div className="notification-icon">{getNotificationIcon(notif.type)}</div>
              <div className="notification-content">
                <div className="notification-header">
                  <h3>{notif.title}</h3>
                  {!notif.read && <span className="unread-badge"></span>}
                </div>
                <p>{notif.message}</p>
                <span className="notification-time">{notif.time}</span>
              </div>
              <div className="notification-actions">
                {!notif.read && (
                  <button
                    className="btn-mark-read"
                    onClick={() => markAsRead(notif.id)}
                    title="Đánh dấu đã đọc"
                  >
                    <FaCheckCircle />
                  </button>
                )}
                <button
                  className="btn-delete"
                  onClick={() => deleteNotification(notif.id)}
                  title="Xóa"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ThongBaoTLDT;
























