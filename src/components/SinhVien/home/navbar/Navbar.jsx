import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import hoso from "../../../../icons/icon_use.png";
import doimatkhau from "../../../../icons/icon_doiMatKhau.png";
import dangxuat from "../../../../icons/icon_dangXuat.png";
import thongbao from "../../../../icons/icon_thongBao.png";
import Lich from "../../../../icons/icon_calander.png";
import tinnhan from "../../../../icons/icon_tinNhan.png";
import thudientu from "../../../../icons/icon_mail.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPhucKhaoMenu, setShowPhucKhaoMenu] = useState(false);

  // Tự động mở menu phúc khảo nếu đang ở trang liên quan
  useEffect(() => {
    if (location.pathname.includes("/student/nop-don") || location.pathname.includes("/student/lich-su-don")) {
      setShowPhucKhaoMenu(true);
    }
  }, [location.pathname]);

  return (
    <div>
      <div className="sv-signbar">
        <div>
          <h5>Trần Đại Đức</h5>
          <p>
            <img src={hoso} alt="hồ sơ cá nhân" />
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/student/hosocanhan"); }}>Hồ sơ cá nhân</a>
          </p>
          <p>
            <img src={doimatkhau} alt="đổi mật khẩu" />
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Chức năng đổi mật khẩu đang được phát triển."); }}>Đổi mật khẩu</a>
          </p>
          <p>
            <img src={dangxuat} alt="đăng xuất" />
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Đăng xuất</a>
          </p>
        </div>
        <div>
          <h5>CÁC CHỨC NĂNG CHUNG</h5>
          <p>
            <img src={thongbao} alt="Tin tức - thông báo" />
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Chức năng tin tức - thông báo đang được phát triển."); }}>Tin tức - thông báo</a>
          </p>
          <p>
            <img src={Lich} alt="thời khoá biểu" />
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Chức năng thời khóa biểu học tập đang được phát triển."); }}>Thời khoá biểu học tập</a>
          </p>
          <p 
            className={location.pathname.includes("/student/nop-don") || location.pathname.includes("/student/lich-su-don") ? "sv-active-menu" : ""}
            onClick={(e) => {
              e.preventDefault();
              setShowPhucKhaoMenu(!showPhucKhaoMenu);
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={thongbao} alt="Phúc khảo" />
            <a href="#" onClick={(e) => { e.preventDefault(); }}>Phúc khảo</a>
          </p>
          {showPhucKhaoMenu && (
            <div className="sv-sub-menu">
              <p className={location.pathname === "/student/nop-don" ? "sv-active-submenu" : ""}>
                <img src={thongbao} alt="Nộp đơn phúc khảo" style={{ marginLeft: "20px" }} />
                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/student/nop-don"); }}>Nộp đơn phúc khảo</a>
              </p>
              <p className={location.pathname === "/student/lich-su-don" ? "sv-active-submenu" : ""}>
                <img src={Lich} alt="Lịch sử đơn" style={{ marginLeft: "20px" }} />
                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/student/lich-su-don"); }}>Lịch sử Phúc khảo</a>
              </p>
            </div>
          )}
          <p>
            <img src={tinnhan} alt="tin nhắn" />
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Chức năng tin nhắn đang được phát triển."); }}>Tin nhắn</a>
          </p>
          <p>
            <img src={thudientu} alt="thư điện tử" />
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Chức năng thư điện tử đang được phát triển."); }}>Thư điện tử</a>
          </p>
        </div>
        <div className="sv-hotNews">
          <h5>TIN TỨC - THÔNG BÁO</h5>
          <ul>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Chi tiết thông báo đang được phát triển."); }}>
                {" "}
                [KHẨN] ĐĂNG KÝ THAM GIA TẬP HUẤN PHÒNG CHÁY, CHỮA CHÁY, CỨU NẠN,
                CỨU HỘ
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Chi tiết thông báo đang được phát triển."); }}>
                {" "}
                Thông báo về việc tham gia khảo sát đối với sinh viên thuộc các
                ngành (Truyền thông số, Hóa học, CN Kỹ thuật hóa học, Kỹ thuật
                môi trường, Khoa học môi trường, Công nghệ thông tin, Kỹ thuật
                phần mềm, Vật lý, Công nghệ kỹ thuật điện tử - viễn thông, C
                (02/07/2025)
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Chi tiết thông báo đang được phát triển."); }}>
                {" "}
                Quyết định về việc công nhận tốt nghiệp đại học hệ chính quy đợt
                2 bổ sung năm 2025 (30/06/2025)
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Chi tiết thông báo đang được phát triển."); }}>
                {" "}
                Sổ tay học vụ và Thời khóa biểu dự kiến học kỳ 1, năm học
                2025-2026 (23/06/2025)
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Chi tiết thông báo đang được phát triển."); }}>
                {" "}
                Quyết định về việc công nhận tốt nghiệp đại học hệ chính quy đợt
                2 năm 2025 (18/06/2025)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
