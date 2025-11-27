import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DangNhap.css";
import logo from "../../../img/logo.png";
import { loginCanBo } from "../../../services/authApiService";
import { useAuth } from "../../../contexts/AuthContext";

const DangNhap = () => {
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!tenDangNhap) {
      newErrors.tenDangNhap = "Tên đăng nhập không được để trống.";
    }
    if (!matKhau) {
      newErrors.matKhau = "Mật khẩu không được để trống.";
    }
    // Đã xóa check độ dài mật khẩu để phù hợp với mock data
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await loginCanBo(tenDangNhap, matKhau);

      if (!result.success) {
        throw new Error(result.message || "Đăng nhập thất bại");
      }

      // Lưu thông tin user vào AuthContext
      authLogin(result.user);

      // Kiểm tra vai trò và điều hướng
      const userRole = result.user.role;
      switch (userRole) {
        case "Admin":
          navigate("/admin/tong-quan");
          break;
        case "Chuyên viên khảo thí":
          navigate("/cvkt/dashboard");
          break;
        case "Trợ lý đào tạo":
          navigate("/tldt/tong-quan");
          break;
        default:
          throw new Error("Vai trò người dùng không được hỗ trợ.");
      }
    } catch (err) {
      const apiError = {};
      apiError.form = err.message || "Đã có lỗi xảy ra.";
      setErrors(apiError);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="dn-login">
      <div className="dn-login__card">
        <header className="dn-login__header">
          <img src={logo} alt="HUSC Logo" className="dn-login__logo" />
          <h1>Hệ thống phúc khảo</h1>
          {/* Thêm tiêu đề cho rõ ràng */}
          <h2>Dành cho cán bộ</h2>
        </header>

        <form onSubmit={handleSubmit} className="dn-login__form">
          {errors.form && (
            <p className="dn-login__error-message">{errors.form}</p>
          )}

          <div className="dn-login__form-group">
            <label htmlFor="username" className="dn-login__label">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              className="dn-login__input"
              value={tenDangNhap}
              onChange={(e) => setTenDangNhap(e.target.value)}
              disabled={isLoading}
            />
            {errors.tenDangNhap && (
              <p className="dn-login__error-text">{errors.tenDangNhap}</p>
            )}
          </div>

          <div className="dn-login__form-group">
            <label htmlFor="password" className="dn-login__label">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="dn-login__input"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              disabled={isLoading}
            />
            {errors.matKhau && (
              <p className="dn-login__error-text">{errors.matKhau}</p>
            )}
          </div>

          <button
            type="submit"
            className={`dn-login__button ${
              isLoading ? "dn-login__button--disabled" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
      </div>

      <footer className="dn-login__footer">
        <p>Trường Đại học Khoa Học, Đại học Huế</p>
        <p>77 Nguyễn Huệ, Thành phố Huế...</p>
        <p>Điện thoại: (+84) 0234.3823290 - Fax: (+84) 0234.3824901</p>
      </footer>
    </div>
  );
};

export default DangNhap;
