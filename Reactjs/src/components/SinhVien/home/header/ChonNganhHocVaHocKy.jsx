import React, { useState } from "react";
import "./ChonNganhHocVaHocKy.css";

const ChonNganhHocVaHocKy = ({
  isOpen,
  onClose,
  onConfirm,
  role = "Sinh viên",
}) => {
  const [selectedMajor, setSelectedMajor] = useState("CÔNG NGHỆ THÔNG TIN");
  const [selectedSemester, setSelectedSemester] = useState({
    semester: "1",
    year: "2025-2026",
    course: "46 (2022-2026)",
  });

  const majors = [
    "CÔNG NGHỆ THÔNG TIN",
    "CÔNG NGHỆ PHẦN MỀM",
    "TOÁN HỌC",
    "VẬT LÝ",
    "HÓA HỌC",
  ];

  const semesters = [
    { semester: "1", year: "2025-2026", course: "46 (2022-2026)" },
    { semester: "hè", year: "2024-2025", course: "46 (2022-2026)" },
    { semester: "2", year: "2024-2025", course: "46 (2022-2026)" },
    { semester: "1", year: "2024-2025", course: "46 (2022-2026)" },
    { semester: "hè", year: "2023-2024", course: "46 (2022-2026)" },
    { semester: "2", year: "2023-2024", course: "46 (2022-2026)" },
    { semester: "1", year: "2023-2024", course: "46 (2022-2026)" },
    { semester: "hè", year: "2022-2023", course: "46 (2022-2026)" },
    { semester: "2", year: "2022-2023", course: "46 (2022-2026)" },
    { semester: "1", year: "2022-2023", course: "46 (2022-2026)" },
  ];

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm({
        major: selectedMajor,
        semester: selectedSemester,
      });
    }
    if (onClose) {
      onClose();
    }
  };

  // Nội dung theo từng role
  const getRoleContent = () => {
    switch (role) {
      case "Admin":
        return {
          title: "CHỌN HỌC KỲ TÁC NGHIỆP",
          notes: [
            "Quản trị viên phải chọn đúng học kỳ cần tác nghiệp trước khi thực hiện mọi thao tác quản lý trên hệ thống;",
            "Quản trị viên chỉ được phép tác nghiệp trên những học kỳ đã được Nhà trường bố trí;",
            "Đánh dấu chọn vào học kỳ tương ứng, nhấn nút Tác nghiệp với học kỳ được chọn để thiết lập học kỳ tác nghiệp (nhấn nút Bỏ qua nếu không muốn thay đổi học kỳ tác nghiệp)."
          ],
          showMajor: false
        };
      case "CVKT":
        return {
          title: "CHỌN HỌC KỲ TÁC NGHIỆP",
          notes: [
            "Chuyên viên khảo thí phải chọn đúng học kỳ cần tác nghiệp trước khi thực hiện mọi thao tác xử lý phúc khảo trên hệ thống;",
            "Chuyên viên khảo thí chỉ được phép tác nghiệp trên những học kỳ đã được Nhà trường bố trí;",
            "Đánh dấu chọn vào học kỳ tương ứng, nhấn nút Tác nghiệp với học kỳ được chọn để thiết lập học kỳ tác nghiệp (nhấn nút Bỏ qua nếu không muốn thay đổi học kỳ tác nghiệp)."
          ],
          showMajor: false
        };
      case "TLDT":
        return {
          title: "CHỌN HỌC KỲ TÁC NGHIỆP",
          notes: [
            "Trợ lý đào tạo phải chọn đúng học kỳ cần tác nghiệp trước khi thực hiện mọi thao tác xử lý đơn phúc khảo trên hệ thống;",
            "Trợ lý đào tạo chỉ được phép tác nghiệp trên những học kỳ đã được Nhà trường bố trí;",
            "Đánh dấu chọn vào học kỳ tương ứng, nhấn nút Tác nghiệp với học kỳ được chọn để thiết lập học kỳ tác nghiệp (nhấn nút Bỏ qua nếu không muốn thay đổi học kỳ tác nghiệp)."
          ],
          showMajor: false
        };
      default: // Sinh viên
        return {
          title: "CHỌN NGÀNH HỌC VÀ HỌC KỲ TÁC NGHIỆP",
          notes: [
            "Bạn phải chọn đúng ngành học và học kỳ cần tác nghiệp trước khi thực hiện mọi thao tác khác trên hệ thống;",
            "Bạn chỉ được phép tác nghiệp trên những học kỳ đã được Nhà trường bố trí học;",
            "Đánh dấu chọn vào học kỳ tương ứng với ngành học, nhấn nút Tác nghiệp với ngành và học kỳ được chọn để thiết lập học kỳ tác nghiệp (nhấn nút Bỏ qua nếu không muốn thay đổi học kỳ và ngành học tác nghiệp)."
          ],
          showMajor: true
        };
    }
  };

  const roleContent = getRoleContent();

  if (!isOpen) return null;

  return (
    <div className="chon-nganh-hoc-content">
      {/* Tiêu đề chính */}
      <div className="chon-nganh-hoc-header">
        <h2>{roleContent.title}</h2>
      </div>

      <div className="chon-nganh-hoc-body">
        {/* Phần Lưu ý */}
        <div className="chon-nganh-hoc-note">
          <strong>Lưu ý:</strong>
          <ul>
            {roleContent.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>

        {/* Phần Ngành học - chỉ hiển thị cho sinh viên */}
        {roleContent.showMajor && (
          <div className="chon-nganh-hoc-section">
            <div className="chon-nganh-hoc-current-major">
              Ngành học: <strong>{selectedMajor}</strong>
            </div>
          </div>
        )}

        {/* Danh sách học kỳ */}
        <div className="chon-nganh-hoc-section">
          <div className="chon-nganh-hoc-semester-list">
            {semesters.map((sem, index) => (
              <label key={index} className="chon-nganh-hoc-semester-item">
                <input
                  type="radio"
                  name="semester"
                  value={index}
                  checked={
                    selectedSemester.semester === sem.semester &&
                    selectedSemester.year === sem.year &&
                    selectedSemester.course === sem.course
                  }
                  onChange={() => setSelectedSemester(sem)}
                />
                <span className="chon-nganh-hoc-semester-text">
                  {roleContent.showMajor 
                    ? `Học kỳ: ${sem.semester}, Năm học: ${sem.year}, Khóa: ${sem.course}`
                    : `Học kỳ: ${sem.semester}, Năm học: ${sem.year}`
                  }
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer với 2 nút */}
      <div className="chon-nganh-hoc-footer">
        <button className="chon-nganh-hoc-btn-confirm" onClick={handleConfirm}>
          {roleContent.showMajor 
            ? "Tác nghiệp với Ngành và Học kỳ được chọn"
            : "Tác nghiệp với Học kỳ được chọn"
          }
        </button>
        <button className="chon-nganh-hoc-btn-cancel" onClick={onClose}>
          Bỏ qua
        </button>
      </div>
    </div>
  );
};

export default ChonNganhHocVaHocKy;
