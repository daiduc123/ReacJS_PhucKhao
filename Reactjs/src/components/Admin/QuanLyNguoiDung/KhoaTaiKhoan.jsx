import React, { useState } from "react";
import Modal from "../Shared/Modal";
import "./KhoaTaiKhoan.css";
import { toggleUserStatus } from "../../../services/adminApiService";

const KhoaTaiKhoan = ({ isOpen, onClose, user, onConfirmSuccess }) => {
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
      setError(err.message || "Có lỗi xảy ra khi khóa tài khoản. Vui lòng thử lại.");
      console.error("Lỗi khi khóa tài khoản:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Xác nhận khóa tài khoản">
      <div className="AD_confirmation-dialog AD_educational">
        <div className="AD_icon-wrapper">
          <span className="AD_icon-lock">🔒</span>
        </div>
        <h3 className="AD_dialog-title">Khóa tài khoản người dùng</h3>
        <p className="AD_dialog-message">
          Bạn đang thực hiện thao tác khóa tài khoản của:
        </p>
        <div className="AD_user-info-box">
          <p className="AD_user-name">{user.fullName}</p>
          <p className="AD_user-detail">{user.email || user.username}</p>
        </div>
        <div className="AD_educational-note">
          <p><strong>Lưu ý:</strong></p>
          <ul>
            <li>Tài khoản sẽ bị tạm khóa và không thể đăng nhập vào hệ thống</li>
            <li>Người dùng sẽ nhận được thông báo qua email về việc khóa tài khoản</li>
            <li>Bạn có thể mở khóa tài khoản bất cứ lúc nào nếu cần thiết</li>
            <li>Hành động này nhằm đảm bảo an toàn và quyền lợi của người dùng</li>
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
            className="AD_btn AD_btn-warning"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận khóa tài khoản"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default KhoaTaiKhoan;
