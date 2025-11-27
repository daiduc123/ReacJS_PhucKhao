import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./XuLyDon.css";
import {
  getRequestDetailForSearch,
  confirmPaperFound,
  exportToExcel,
  submitReviewScores,
} from "../../../services/phuckhaoApiService";
import { FaArrowLeft, FaCheck, FaFileExcel, FaSave, FaPrint } from "react-icons/fa";

const XuLyDon = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("search"); // search, export, enter-scores
  const [scores, setScores] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, [courseId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getRequestDetailForSearch(courseId);
      setRequests(data);
      // Initialize scores
      const initialScores = {};
      data.forEach((req) => {
        if (req.newScore !== null) {
          initialScores[req.id] = req.newScore;
        }
      });
      setScores(initialScores);
      // Determine current step
      if (data.every((r) => r.paperFound)) {
        if (data.some((r) => r.status === "Đã chuyển đến GV")) {
          setStep("enter-scores");
        } else {
          setStep("export");
        }
      }
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPaper = async (requestId) => {
    try {
      await confirmPaperFound(requestId);
      await loadData();
    } catch (err) {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleExportExcel = async () => {
    if (!window.confirm("Bạn có chắc muốn xuất file Excel và chuyển đến Giảng viên?")) {
      return;
    }

    try {
      await exportToExcel(courseId);
      alert("Đã xuất file Excel thành công!");
      await loadData();
      setStep("enter-scores");
    } catch (err) {
      alert("Có lỗi xảy ra khi xuất file. Vui lòng thử lại.");
    }
  };

  const handleScoreChange = (requestId, value) => {
    setScores({ ...scores, [requestId]: parseFloat(value) || "" });
  };

  const handleSubmitScores = async () => {
    const scoreEntries = Object.entries(scores).map(([requestId, newScore]) => ({
      requestId,
      newScore: parseFloat(newScore),
    }));

    if (scoreEntries.length !== requests.length) {
      alert("Vui lòng nhập đầy đủ điểm cho tất cả sinh viên.");
      return;
    }

    if (!window.confirm("Bạn có chắc muốn gửi kết quả về Khảo thí?")) {
      return;
    }

    try {
      setSaving(true);
      await submitReviewScores(courseId, scoreEntries);
      alert("Đã gửi kết quả về Khảo thí thành công!");
      navigate("/tldt/dashboard");
    } catch (err) {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const printContent = `
      <html>
        <head>
          <title>Danh sách phúc khảo - ${requests[0]?.courseName || ""}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h2>DANH SÁCH PHÚC KHẢO</h2>
          <p><strong>Học phần:</strong> ${requests[0]?.courseName || ""}</p>
          <p><strong>Ngày in:</strong> ${new Date().toLocaleDateString("vi-VN")}</p>
          <table>
            <thead>
              <tr>
                <th>Số túi</th>
                <th>Số phách</th>
                <th>Tên học phần</th>
                <th>Ngày thi</th>
                <th>Giờ thi</th>
                <th>Phòng thi</th>
                <th>Điểm</th>
                <th>Điểm phúc khảo</th>
              </tr>
            </thead>
            <tbody>
              ${requests.map((req) => `
                <tr>
                  <td>${req.soTui || "-"}</td>
                  <td>${req.soPhach || "-"}</td>
                  <td>${req.courseName}</td>
                  <td>${req.ngayThi ? new Date(req.ngayThi).toLocaleDateString("vi-VN") : "-"}</td>
                  <td>${req.gioThi || "-"}</td>
                  <td>${req.phongThi || "-"}</td>
                  <td>${req.oldScore}</td>
                  <td>${scores[req.id] || "-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const allPapersFound = requests.every((r) => r.paperFound);

  if (loading) {
    return (
      <div className="xulydon-container">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="xulydon-container">
      <div className="xulydon-header">
        <button className="btn-back" onClick={() => navigate("/tldt/dashboard")}>
          <FaArrowLeft /> Quay lại
        </button>
        <h1>Xử lý đơn phúc khảo</h1>
      </div>

      <div className="step-indicator">
        <div className={`step ${step === "search" ? "active" : step !== "search" ? "completed" : ""}`}>
          <span className="step-number">1</span>
          <span className="step-label">Tìm kiếm bài thi</span>
        </div>
        <div className={`step ${step === "export" ? "active" : step === "enter-scores" ? "completed" : ""}`}>
          <span className="step-number">2</span>
          <span className="step-label">Xuất file Excel</span>
        </div>
        <div className={`step ${step === "enter-scores" ? "active" : ""}`}>
          <span className="step-number">3</span>
          <span className="step-label">Nhập điểm</span>
        </div>
      </div>

      {step === "search" && (
        <div className="search-papers-section">
          <h2>Tìm kiếm bài thi của sinh viên</h2>
          <div className="papers-table">
            <table>
              <thead>
                <tr>
                  <th>Số túi</th>
                  <th>Số phách</th>
                  <th>Tên học phần</th>
                  <th>Ngày thi</th>
                  <th>Giờ thi</th>
                  <th>Phòng thi</th>
                  <th>Điểm</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.soTui || "-"}</td>
                    <td>{req.soPhach || "-"}</td>
                    <td>{req.courseName}</td>
                    <td>{req.ngayThi ? new Date(req.ngayThi).toLocaleDateString("vi-VN") : "-"}</td>
                    <td>{req.gioThi || "-"}</td>
                    <td>{req.phongThi || "-"}</td>
                    <td className="score-cell">{req.oldScore}</td>
                    <td>
                      {req.paperFound ? (
                        <span className="badge badge-success">Đã tìm thấy</span>
                      ) : (
                        <span className="badge badge-warning">Chưa tìm thấy</span>
                      )}
                    </td>
                    <td>
                      {!req.paperFound && (
                        <button
                          className="btn-confirm"
                          onClick={() => handleConfirmPaper(req.id)}
                        >
                          <FaCheck /> Xác nhận
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {allPapersFound && (
            <div className="action-section">
              <button className="btn-primary" onClick={() => setStep("export")}>
                Tiếp tục: Xuất file Excel
              </button>
            </div>
          )}
        </div>
      )}

      {step === "export" && (
        <div className="export-section">
          <h2>Xuất file Excel và chuyển cho Giảng viên</h2>
          <div className="info-box">
            <p>Đã tìm thấy tất cả bài thi. Bạn có thể xuất file Excel để gửi cho Giảng viên chấm lại.</p>
          </div>
          <div className="action-section">
            <button className="btn-export" onClick={handleExportExcel}>
              <FaFileExcel /> Xuất file Excel
            </button>
          </div>
        </div>
      )}

      {step === "enter-scores" && (
        <div className="enter-scores-section">
          <h2>Nhập điểm phúc khảo</h2>
          <div className="scores-table">
            <table>
              <thead>
                <tr>
                  <th>Số túi</th>
                  <th>Số phách</th>
                  <th>Tên học phần</th>
                  <th>Ngày thi</th>
                  <th>Giờ thi</th>
                  <th>Phòng thi</th>
                  <th>Điểm</th>
                  <th>Điểm phúc khảo</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.soTui || "-"}</td>
                    <td>{req.soPhach || "-"}</td>
                    <td>{req.courseName}</td>
                    <td>{req.ngayThi ? new Date(req.ngayThi).toLocaleDateString("vi-VN") : "-"}</td>
                    <td>{req.gioThi || "-"}</td>
                    <td>{req.phongThi || "-"}</td>
                    <td className="score-cell">{req.oldScore}</td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={scores[req.id] || ""}
                        onChange={(e) => handleScoreChange(req.id, e.target.value)}
                        className="score-input"
                        placeholder="Nhập điểm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="action-section">
            <button
              className="btn-print"
              onClick={handlePrint}
              title="In tài liệu"
            >
              <FaPrint /> In tài liệu
            </button>
            <button
              className="btn-submit"
              onClick={handleSubmitScores}
              disabled={saving || Object.keys(scores).length !== requests.length}
            >
              <FaSave /> {saving ? "Đang lưu..." : "Xác nhận và gửi về Khảo thí"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default XuLyDon;

