import React from "react";
import "./Modal.css";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, title, children, maxWidth = "600px" }) => {
  // Thêm maxWidth prop
  if (!isOpen) {
    return null;
  }

  return (
    <div className="AD_modal-overlay" onClick={onClose}>
      <div
        className="AD_modal-content"
        style={{ maxWidth: maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="AD_modal-header">
          <h3 className="AD_modal-title">{title}</h3>
          <button onClick={onClose} className="AD_modal-close-btn">
            <FaTimes />
          </button>
        </div>
        <div className="AD_modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
