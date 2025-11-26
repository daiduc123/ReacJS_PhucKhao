import React, { useState } from "react";
import "./Login.css";
import logo from "../../../img/logo.png";
import sinhvien from "../../../img/student.png";
import { useNavigate } from "react-router-dom";
import { loginSinhVien } from "../../../services/authApiService";
import { useAuth } from "../../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [maSinhVien, setMaSinhVien] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!maSinhVien || !matKhau) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginSinhVien(maSinhVien, matKhau);
      
      if (result.success) {
        // Lưu thông tin user vào AuthContext
        authLogin(result.user);
        // Chuyển hướng đến trang chủ sinh viên
        navigate("/student");
      } else {
        setError(result.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError(err.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      // Error đã được xử lý và hiển thị cho user
    } finally {
      setIsLoading(false);
    }
  };

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
            {error && <div className="LG-error" style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="LG-from">
                <label htmlFor="maSinhVien"> Mã sinh viên:</label>
                <input
                  type="text"
                  id="maSinhVien"
                  placeholder="Mã sinh viên"
                  className="LG-input"
                  value={maSinhVien}
                  onChange={(e) => setMaSinhVien(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="LG-from">
                <label htmlFor="matKhau">Mật khẩu: </label>
                <input
                  type="password"
                  id="matKhau"
                  placeholder="mật khẩu"
                  className="LG-input"
                  value={matKhau}
                  onChange={(e) => setMatKhau(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className="LG-btn"
                disabled={isLoading}
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>
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
