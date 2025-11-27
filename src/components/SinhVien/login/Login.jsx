import React from "react";
import "./Login.css";
import logo from "../../../img/logo.png";
import sinhvien from "../../../img/student.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="LG-content">
        <div className="LG-center">
          <div className="LG-logo">
            <img src={logo} alt="ảnh đại diện" width={112} height="100%" />
          </div>
          <div className="LG-trangbia">
            <img src={sinhvien} alt="trang bìa" width={432} height={299} />
          </div>
        </div>
        <div className="signin">
          <div className="LG-group">
            <h2 className="LG-heading">Sinh Viên</h2>
            <div className="LG-from">
              <label htmlFor=""> Mã sinh viên:</label>
              <input
                type="text"
                placeholder="Mã sinh viên"
                className="LG-input"
              />
            </div>
            <div className="LG-from">
              <label htmlFor="">Mật khẩu: </label>
              <input type="text" placeholder="mật khẩu" className="LG-input" />
            </div>
            <button
              className="LG-btn"
              onClick={() => navigate("/student")}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <a href="#">Trường Đại học Khoa học, Đại học Huế</a>
        <p>
          {" "}
          77 Nguyễn Huệ, Thành phố Huế, Phường Phú Nhuận, Quận Thuận Hóa, Thành
          phố Huế
        </p>
        <p> Điện thoại: (+84) 0234.3823290 – Fax: (+84) 0234.3824901</p>
      </div>
    </div>
  );
};

export default Login;
