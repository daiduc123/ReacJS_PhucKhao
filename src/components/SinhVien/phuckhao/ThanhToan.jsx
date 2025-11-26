import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ThanhToan.css";
import {
  getStudentReviewHistory,
  payReviewFee,
  getAvailableCourses,
  submitReviewRequest,
} from "../../../services/phuckhaoApiService";
import { FaCheckCircle } from "react-icons/fa";

const ThanhToan = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [captcha, setCaptcha] = useState("");
  const [captchaCode, setCaptchaCode] = useState("WB18");
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  useEffect(() => {
    loadData();
    // Generate random captcha
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    setCaptchaCode(randomCode);
  }, [requestId]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Check if there are pending courses from sessionStorage
      const pendingCoursesStr = sessionStorage.getItem("pendingCoursesForPayment");
      
      if (pendingCoursesStr && !requestId) {
        // Load from sessionStorage (new selection)
        const pendingCourseIds = JSON.parse(pendingCoursesStr);
        const allCourses = await getAvailableCourses("sv01");
        const selectedCoursesData = allCourses.filter((c) =>
          pendingCourseIds.includes(c.id)
        );
        setCourses(selectedCoursesData);
      } else if (requestId) {
        // Load from requestId (already submitted)
        const history = await getStudentReviewHistory("sv01");
        const request = history.find((r) => r.id === requestId);
        if (request) {
          if (request.paymentStatus === "Đã thanh toán") {
            setAlreadyPaid(true);
          }
          setCourses([request]);
        } else {
          setError("Không tìm thấy đơn phúc khảo.");
        }
      } else {
        setError("Không có môn học nào được chọn.");
      }
    } catch (err) {
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!requestId) {
      // Clear sessionStorage and go back to selection
      sessionStorage.removeItem("pendingCoursesForPayment");
      navigate("/student/nop-don");
    } else {
      // Go back to history
      navigate("/student/lich-su-don");
    }
  };

  const handleAddMore = () => {
    // Keep current selection in sessionStorage and go back to selection
    navigate("/student/nop-don");
  };

  const handlePay = async () => {
    if (captcha.toUpperCase() !== captchaCode) {
      setError("Mã xác nhận không đúng. Vui lòng nhập lại.");
      return;
    }

    try {
      if (!requestId) {
        // Submit all pending requests first
        const pendingCoursesStr = sessionStorage.getItem("pendingCoursesForPayment");
        if (pendingCoursesStr) {
          const pendingCourseIds = JSON.parse(pendingCoursesStr);
          
          // Submit each course as a review request
          for (const courseId of pendingCourseIds) {
            await submitReviewRequest({
              studentId: "sv01",
              courseId: courseId,
            });
          }
        }
      }

      // Process payment for all courses
      for (const course of courses) {
        const courseRequestId = course.requestId || course.id;
        await payReviewFee(courseRequestId, {
          method: "bank_transfer",
          transactionCode: `TXN${Date.now()}`,
        });
      }

      // Clear sessionStorage
      sessionStorage.removeItem("pendingCoursesForPayment");

      // Navigate to history
      navigate("/student/lich-su-don");
    } catch (err) {
      setError("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
      console.error("Lỗi khi thanh toán:", err);
    }
  };

  const totalAmount = 20000; // Cố định 20,000 VNĐ

  if (loading) {
    return (
      <div className="thanhtoan-container">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error && !courses.length) {
    return (
      <div className="thanhtoan-container">
        <div className="error">{error}</div>
        <button className="btn-back" onClick={() => navigate("/student/nop-don")}>
          Quay lại
        </button>
      </div>
    );
  }

  if (alreadyPaid) {
    return (
      <div className="thanhtoan-container">
        <div className="already-paid">
          <h2>
            <FaCheckCircle /> Đã thanh toán
          </h2>
          <p>Đơn phúc khảo này đã được thanh toán thành công.</p>
          <button className="btn-back" onClick={() => navigate("/student/lich-su-don")}>
            Quay lại lịch sử
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="thanhtoan-container">
      <h1 className="page-title">NỘP PHÍ PHÚC KHẢO QUA NGÂN HÀNG VIETINBANK</h1>

      {/* Phần danh sách môn học */}
      <div className="courses-payment-section">
        <h2 className="section-title">Danh sách môn học cần nộp phí phúc khảo</h2>
        <p className="section-instruction">
          Sinh viên chọn môn cần nộp phí phúc khảo trong danh sách bên dưới.
        </p>
        
        <table className="payment-courses-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã học phần</th>
              <th>Tên học phần</th>
              <th>Lệ phí</th>
              <th>Đã nộp</th>
              <th>Còn lại</th>
              <th>Nộp phí phúc khảo</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id}>
                <td className="text-center">{index + 1}</td>
                <td>{course.id}</td>
                <td>{course.name || course.courseName}</td>
                <td className="text-right">{totalAmount.toLocaleString("vi-VN")}</td>
                <td className="text-right">0</td>
                <td className="text-right">{totalAmount.toLocaleString("vi-VN")}</td>
                <td className="text-center">
                  <input type="checkbox" checked readOnly />
                </td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="3" className="text-right"><strong>Tổng cộng</strong></td>
              <td className="text-right"><strong>{(totalAmount * courses.length).toLocaleString("vi-VN")}</strong></td>
              <td className="text-right"><strong>0</strong></td>
              <td className="text-right"><strong>{(totalAmount * courses.length).toLocaleString("vi-VN")}</strong></td>
              <td className="text-center total-amount">{((totalAmount * courses.length).toLocaleString("vi-VN"))}</td>
            </tr>
          </tbody>
        </table>
        
        {!requestId && (
          <a href="#" className="add-more-link" onClick={(e) => { e.preventDefault(); handleAddMore(); }}>
            + Thêm môn học khác
          </a>
        )}
      </div>

      {/* Phần nộp phí trực tuyến */}
      <div className="online-payment-section">
        <h2 className="section-title">Nộp phí phúc khảo trực tuyến</h2>
        
        {/* Phần Lưu ý */}
        <div className="payment-note-section">
          <div className="note-title">
            <strong>Lưu ý:</strong>
          </div>
          <ul className="note-list">
            <li>Sinh viên đọc kỹ các hướng dẫn dưới đây trước khi thực hiện giao dịch nộp phí phúc khảo</li>
            <li>Bạn phải có thẻ ATM của ngân hàng VietinBank và phải đăng ký sử dụng dịch vụ thanh toán trực tuyến;</li>
            <li>Kiểm tra danh sách các lớp học phần, học phí và số tiền phải nộp cho các lớp học phần mà bạn đã đăng ký trong học kỳ này;</li>
            <li>Nhập mã xác nhận vào ô bên dưới và nhấn nút <strong>Thanh toán phúc khảo</strong> để tiến hành thực hiện giao dịch;</li>
            <li>
              <span className="red-text">Tuyệt đối không đóng trình duyệt hoặc trang Web</span> trong quá trình đang thực hiện giao dịch. Nếu bạn không thực hiện giao dịch đầy đủ, bạn <span className="red-text">phải chờ 60 phút sau</span> mới có thể thực hiện lại giao dịch khác
            </li>
          </ul>
        </div>

        {/* Phần xác nhận thanh toán */}
        <div className="payment-confirmation-section">
          <div className="payment-amount-group">
            <label className="payment-amount-label">Số tiền thanh toán:</label>
            <span className="payment-amount-value">{((totalAmount * courses.length).toLocaleString("vi-VN"))} VNĐ</span>
          </div>

          <div className="captcha-group-new">
            <div className="captcha-label-row">
              <label className="captcha-label">Nhập mã xác nhận:</label>
              <input
                type="text"
                className="captcha-input-new"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                maxLength={4}
                placeholder=""
              />
            </div>
            <div className="captcha-image-row">
              <div className="captcha-image">
                <span className="captcha-text">{captchaCode}</span>
              </div>
            </div>
            <div className="captcha-buttons">
              <button
                className="btn-pay-new"
                onClick={handlePay}
                disabled={captcha.toUpperCase() !== captchaCode}
              >
                Thanh toán phúc khảo
              </button>
              <button
                className="btn-skip-new"
                onClick={handleCancel}
              >
                Bỏ qua
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Phần ngân hàng */}
      <div className="bank-section-new">
        <div className="bank-divider"></div>
        <div className="bank-title-new">Ngân hàng chấp nhận thanh toán</div>
        <div className="bank-logo-container">
          <div className="vietinbank-text-new">VietinBank.</div>
        </div>
      </div>
    </div>
  );
};

export default ThanhToan;
