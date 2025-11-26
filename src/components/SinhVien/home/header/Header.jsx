import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logosmall from "../../../../img/logo-small.png";
import Caret from "../../../../icons/icon_Caret.png";
import Mu from "../../../../icons/icon_cap.png";
import Sach from "../../../../icons/icon_Book.png";
import Lich from "../../../../icons/icon_calander.png";

const Header = ({ currentInfo: propCurrentInfo }) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenuLP, setOpenMenuLP] = useState(false);
  const menuLPRef = useRef(null);
  const hockyRef = useRef(null);
  const dropdownWrapperRef = useRef(null);

  // State cho thông tin học kỳ hiện tại - dùng từ props hoặc default
  const [currentInfo, setCurrentInfo] = useState(
    propCurrentInfo || {
      khoa: "46 (2022-2026)",
      nganh: "Công nghệ phần mềm",
      hocky: "1",
      namhoc: "2025-2026"
    }
  );

  // Cập nhật currentInfo khi prop thay đổi
  useEffect(() => {
    if (propCurrentInfo) {
      setCurrentInfo(propCurrentInfo);
    }
  }, [propCurrentInfo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownWrapperRef.current && !dropdownWrapperRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
      if (menuLPRef.current && !menuLPRef.current.contains(event.target)) {
        setOpenMenuLP(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHocKyClick = () => {
    // Navigate để hiển thị trong content
    navigate("/student/chon-nganh-hoc");
  };

  return (
    <div style={{ width: "100%", flexShrink: 0 }}>
      <div className="sv-HD-top">
        <h1 className="tentruong">TRƯỜNG ĐẠI HỌC KHOA HỌC - ĐẠI HỌC HUẾ</h1>
        <div className="datetime">{formatDate(time)}</div>
      </div>
      <div className="sv-HD-bottom">
        <div className="bottom-left">
          <a href="#" className="logosmall">
            <img src={logosmall} alt="student's" width={112} />
          </a>
        </div>

        <div className="bottom-right" ref={menuLPRef}>
          <div className="dropdown-wrapper" ref={dropdownWrapperRef}>
            <button
              className={`dropdown ${openMenu ? "active" : ""}`}
              onClick={() => {
                setOpenMenu(!openMenu);
                setOpenMenuLP(false);
              }}
            >
              hỗ trợ hoạt động học tập
              <span className="caret">
                <img src={Caret} alt="caret" width={10} />
              </span>
            </button>

            {openMenu && (
              <div className="dropdown-menu-container">
                <div className="dropdown-menu">
                  <div className="menu-section">
                    <h3>Kế hoạch học tập</h3>
                    <ul>
                      <li>
                        <a href="#">Đăng ký học tập</a>
                      </li>
                      <li>
                        <a href="#">Lớp học phần đã đăng ký</a>
                      </li>
                      <li>
                        <a href="#">Lịch trình học tập</a>
                      </li>
                      <li>
                        <a href="#">Lịch thi kết thúc học phần</a>
                      </li>
                    </ul>
                  </div>

                  <div className="menu-section">
                    <h3>Hỗ trợ - Tra cứu thông tin</h3>
                    <ul>
                      <li>
                        <a href="#">Chương trình đào tạo</a>
                      </li>
                    </ul>
                  </div>

                  <div className="menu-section">
                    <h3>Số liệu - Tổng hợp</h3>
                    <ul>
                      <li>
                        <a href="#">Lịch sử quá trình học tập</a>
                      </li>
                      <li>
                        <a href="#">Kết quả học tập</a>
                      </li>
                      <li>
                        <a href="#">Kết quả rèn luyện</a>
                      </li>
                      <li>
                        <a href="#">Bằng và chứng chỉ điều kiện</a>
                      </li>
                      <li>
                        <a href="#">Hồ sơ tốt nghiệp</a>
                      </li>
                    </ul>
                  </div>

                  <div className="menu-section">
                    <h3>Đảm bảo chất lượng giáo dục</h3>
                    <ul>
                      <li>
                        <a href="#">Khảo sát hoạt động giảng dạy</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            className={`dropdown_lp ${openMenuLP ? "active_lp" : ""}`}
            onClick={() => {
              setOpenMenuLP(!openMenuLP);
              setOpenMenu(false);
            }}
          >
            học phí - lệ phí
            <span className="caret">
              <img src={Caret} alt="caret" width={10} />
            </span>
          </button>

          {openMenuLP && (
            <div className="dropdown-menu-container dropdown-menu-lp">
              <div className="dropdown-menu">
                <div className="menu-section">
                  <ul>
                    <li>
                      <a href="#">Nộp học phí trực tuyến</a>
                    </li>
                    <li>
                      <a href="#">Tra cứu lịch sử nộp học phí</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hocky" ref={hockyRef} onClick={handleHocKyClick}>
        <img src={Mu} alt="khoá tốt nghiệp" />
        Khóa {currentInfo.khoa}
        <img src={Sach} alt="ngành học" />
        {currentInfo.nganh}
        <img src={Lich} alt="học kì" />
        Học kỳ {currentInfo.hocky}, năm học: {currentInfo.namhoc}
      </div>

    </div>
  );
};

export default Header;
