import React, { useState } from "react";
import Modal from "../Shared/Modal";
import "./KhoaTaiKhoan.css";
import { toggleUserStatus } from "../../../services/adminApiService";

const MoKhoaTaiKhoan = ({ isOpen, onClose, user, onConfirmSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!user) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError(null);
      await toggleUserStatus(user.id);
      if (onConfirmSuccess) {
        onConfirmSuccess();
      }
      onClose();
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi mở khóa tài khoản. Vui lòng thử lại.");
      console.error("Lỗi khi mở khóa tài khoản:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Xác nhận mở khóa tài khoản">
      <div className="AD_confirmation-dialog AD_educational">
        <div className="AD_icon-wrapper">
          <span className="AD_icon-lock">🔓</span>
        </div>
        <h3 className="AD_dialog-title">Mở khóa tài khoản người dùng</h3>
        <p className="AD_dialog-message">
          Bạn đang thực hiện thao tác mở khóa tài khoản của:
        </p>
        <div className="AD_user-info-box">
          <p className="AD_user-name">{user.fullName}</p>
          <p className="AD_user-detail">{user.email || user.username}</p>
        </div>
        <div className="AD_educational-note">
          <p><strong>Lưu ý:</strong></p>
          <ul>
            <li>Tài khoản sẽ được kích hoạt lại và có thể đăng nhập vào hệ thống</li>
            <li>Người dùng sẽ nhận được thông báo qua email về việc mở khóa tài khoản</li>
            <li>Người dùng có thể tiếp tục sử dụng các chức năng của hệ thống</li>
            <li>Hành động này nhằm khôi phục quyền truy cập cho người dùng</li>
          </ul>
        </div>
        {error && (
          <div className="AD_error-message" style={{ 
            color: "#dc3545", 
            padding: "10px", 
            margin: "10px 0", 
            backgroundColor: "#f8d7da", 
            borderRadius: "4px" 
          }}>
            {error}
          </div>
        )}
        <div className="AD_form-actions">
          <button
            type="button"
            className="AD_btn AD_btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Hủy bỏ
          </button>
          <button 
            type="button" 
            className="AD_btn AD_btn-success"
            onClick={handleConfirm}
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
              color: "#ffffff",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
              transition: "all 0.3s ease"
            }}
          >
            {loading ? "Đang xử lý..." : "Xác nhận mở khóa tài khoản"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MoKhoaTaiKhoan;













