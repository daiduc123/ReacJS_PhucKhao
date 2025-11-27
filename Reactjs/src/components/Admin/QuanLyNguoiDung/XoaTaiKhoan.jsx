import React from "react";
import Modal from "../Shared/Modal";
import "./XoaTaiKhoan.css";

const XoaTaiKhoan = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Xác nhận xóa tài khoản">
      <div className="AD_confirmation-dialog AD_educational">
        <div className="AD_icon-wrapper">
          <span className="AD_icon-delete">⚠️</span>
        </div>
        <h3 className="AD_dialog-title">Xóa tài khoản vĩnh viễn</h3>
        <p className="AD_dialog-message">
          Bạn đang thực hiện thao tác xóa vĩnh viễn tài khoản của:
        </p>
        <div className="AD_user-info-box">
          <p className="AD_user-name">{user.fullName}</p>
          <p className="AD_user-detail">{user.email || user.username}</p>
        </div>

        <div className="AD_warning-box AD_educational-warning">
          <h4>⚠️ Cảnh báo quan trọng - Hành động không thể hoàn tác</h4>
          <p className="AD_warning-intro">
            Việc xóa tài khoản sẽ có những tác động sau đây:
          </p>
          <ul>
            <li><strong>Dữ liệu học tập:</strong> Tất cả thông tin liên quan đến quá trình học tập và phúc khảo sẽ bị xóa vĩnh viễn</li>
            <li><strong>Lịch sử hoạt động:</strong> Mọi hoạt động và lịch sử giao dịch của người dùng sẽ không thể khôi phục</li>
            <li><strong>Ảnh hưởng hệ thống:</strong> Các đơn phúc khảo và dữ liệu liên quan sẽ bị ảnh hưởng nghiêm trọng</li>
            <li><strong>Không thể khôi phục:</strong> Sau khi xóa, không có cách nào để khôi phục lại dữ liệu</li>
          </ul>
          <p className="AD_warning-suggestion">
            <strong>Gợi ý:</strong> Thay vì xóa, bạn có thể cân nhắc khóa tài khoản để bảo toàn dữ liệu và có thể khôi phục sau này.
          </p>
        </div>

        <div className="AD_form-actions">
          <button
            type="button"
            className="AD_btn AD_btn-secondary"
            onClick={onClose}
          >
            Hủy bỏ
          </button>
          <button type="button" className="AD_btn AD_btn-danger">
            Tôi hiểu rủi ro - Xác nhận xóa
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default XoaTaiKhoan;
