import React from "react";

const TabPhiPhucKhao = () => {
  return (
    <form className="AD_form">
      <div className="AD_form-group">
        <label>Phí phúc khảo</label>
        <div className="AD_input-with-suffix">
          <input type="text" defaultValue="20.000" />
          <span>VND</span>
        </div>
      </div>
      <h3>Phương thức thanh toán</h3>
      <div className="AD_form-group">
        <label>Tên tài khoản</label>
        <input type="text" />
      </div>
      <div className="AD_form-group">
        <label>Số tài khoản</label>
        <input type="text" />
      </div>
      <div className="AD_form-group">
        <label>Ngân hàng</label>
        <input type="text" />
      </div>
      <div className="AD_form-group">
        <label>Mã QR Code</label>
        <div>
          {/* TODO: Thay thế bằng ảnh thật */}
          <img
            src="https://placehold.co/150x150/007bff/FFFFFF?text=QR+Code"
            alt="QR Code"
          />
        </div>
      </div>
      <div
        className="AD_form-actions"
        style={{
          justifyContent: "flex-start",
          borderTop: "none",
          paddingTop: 0,
        }}
      >
        <button type="submit" className="AD_btn AD_btn-primary">
          Cập nhật cấu hình
        </button>
      </div>
    </form>
  );
};

export default TabPhiPhucKhao;
