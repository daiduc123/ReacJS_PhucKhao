import React, { useState } from "react";
import Modal from "./Modal";
import "./ConfirmationModal.css";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  title = "Xác nhận", 
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  onConfirm,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  type = "warning" // warning, danger, info
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (!onConfirm) {
      onClose();
      return;
    }

    try {
      setLoading(true);
      setError("");
      await onConfirm();
      // Không tự động đóng, để component cha quyết định
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại.");
      console.error("Lỗi khi xác nhận:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const iconColor = type === "danger" ? "#dc3545" : type === "info" ? "#17a2b8" : "#ffc107";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="AD_confirmation-modal-content">
        <div className="AD_confirmation-icon" style={{ color: iconColor }}>
          <FaExclamationTriangle />
        </div>
        <p className="AD_confirmation-message">{message}</p>
        
        {error && (
          <div className="AD_error-message" style={{ 
            marginTop: "12px",
            padding: "10px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderRadius: "4px",
            border: "1px solid #f5c6cb"
          }}>
            {error}
          </div>
        )}

        <div className="AD_confirmation-actions">
          <button
            type="button"
            className="AD_btn AD_btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`AD_btn ${type === "danger" ? "AD_btn-danger" : "AD_btn-warning"}`}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
