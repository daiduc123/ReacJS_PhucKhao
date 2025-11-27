// API Service cho hệ thống phúc khảo
// Sử dụng API thực tế từ Spring Boot backend
import apiClient from "./apiClient";

// Helper function để lấy student ID từ user context
const getStudentId = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      // Nếu user có id hoặc username là student ID
      return user.id || user.username || null;
    }
  } catch (err) {
    // Silent fail, return null
  }
  return null;
};

// Helper function để map backend response sang frontend format
const mapMonHocResponse = (backendData) => {
  return backendData.map((item) => ({
    id: item.idHocPhan?.toString() || item.maHocPhan,
    code: item.maHocPhan,
    name: item.tenHocPhan,
    score: item.diemCu || null,
    canSubmit: item.trangThai === "CO_THE_PHUC_KHAO",
    status:
      item.trangThai === "CO_THE_PHUC_KHAO"
        ? "Đủ điều kiện"
        : "Không đủ điều kiện",
    // Default values for compatibility
    faculty: "CNTT",
    credits: 3,
    teacher: "N/A",
    resultDate: new Date().toISOString().split("T")[0],
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  }));
};

// Fallback mock delay (chỉ dùng khi API không khả dụng)
const mockDelay = (ms) => new Promise((res) => setTimeout(res, ms));

// ==================== MOCK DATA ====================

// Mock học phần với điểm - Mở rộng danh sách
const mockCoursesWithScores = [
  {
    id: "CNTT001",
    code: "TIN4253",
    name: "Mẫu thiết kế",
    faculty: "CNTT",
    credits: 3,
    teacher: "Nguyễn Hoàng Hà",
    score: 6.7,
    resultDate: "2024-01-15",
    canSubmit: true,
    deadline: "2024-01-30",
  },
  {
    id: "TOM001",
    code: "TIN1093",
    name: "Nhập Môn Lập Trình",
    faculty: "CNTT",
    credits: 4,
    teacher: "Nguyễn Văn A",
    score: 9.8,
    resultDate: "2024-01-20",
    canSubmit: false, // Không đủ điều kiện (có thể do thi máy tính)
    deadline: "2024-02-04",
  },
  {
    id: "KHMT001",
    code: "LLCTKT2",
    name: "Kinh tế chính trị",
    faculty: "KHMT",
    credits: 3,
    teacher: "Trần Thị Thúy",
    score: 2.3,
    resultDate: "2024-01-10",
    canSubmit: true,
    deadline: "2024-01-25",
  },
  {
    id: "CNTT002",
    code: "TIN4012",
    name: "Thiết kế cơ sở dữ liệu",
    faculty: "CNTT",
    credits: 3,
    teacher: "Lê Thúy Hằng",
    score: null, // Chưa có điểm
    resultDate: "2024-01-18",
    canSubmit: false,
    deadline: "2024-02-02",
  },
  {
    id: "CNTT003",
    code: "TIN3023",
    name: "Toán học rời rạc",
    faculty: "CNTT",
    credits: 3,
    teacher: "Nguyễn Văn C",
    score: 9.5,
    resultDate: "2024-01-22",
    canSubmit: true,
    deadline: "2025-12-31", // Cập nhật deadline để đảm bảo có thể phúc khảo
  },
  {
    id: "CNTT004",
    code: "CNTT004",
    name: "Cơ sở dữ liệu",
    faculty: "CNTT",
    credits: 3,
    teacher: "Phạm Thị Lan",
    score: 5.5,
    resultDate: "2024-01-25",
    canSubmit: true,
    deadline: "2025-12-31", // Cập nhật deadline để đảm bảo có thể phúc khảo
  },
  {
    id: "CNTT005",
    code: "CNTT005",
    name: "Lập trình hướng đối tượng",
    faculty: "CNTT",
    credits: 4,
    teacher: "Trần Văn Đức",
    score: 6.8,
    resultDate: "2024-01-19",
    canSubmit: true,
    deadline: "2025-12-31", // Cập nhật deadline để đảm bảo có thể phúc khảo
  },
  {
    id: "TOAN001",
    code: "TOAN001",
    name: "Giải tích 1",
    faculty: "Toán",
    credits: 3,
    teacher: "Nguyễn Thị Hoa",
    score: 7.2,
    resultDate: "2024-01-16",
    canSubmit: true,
    deadline: "2024-01-31",
  },
  {
    id: "TOAN002",
    code: "TOAN002",
    name: "Đại số tuyến tính",
    faculty: "Toán",
    credits: 3,
    teacher: "Lê Văn Minh",
    score: 6.3,
    resultDate: "2024-01-21",
    canSubmit: true,
    deadline: "2024-02-05",
  },
  {
    id: "VL001",
    code: "VL001",
    name: "Vật lý đại cương",
    faculty: "Vật lý",
    credits: 3,
    teacher: "Phạm Văn B",
    score: 7.8,
    resultDate: "2024-01-17",
    canSubmit: true,
    deadline: "2024-02-01",
  },
  {
    id: "HOA001",
    code: "HOA001",
    name: "Hóa học đại cương",
    faculty: "Hóa học",
    credits: 3,
    teacher: "Hoàng Thị Mai",
    score: 6.7,
    resultDate: "2024-01-23",
    canSubmit: true,
    deadline: "2024-02-07",
  },
  {
    id: "ANH001",
    code: "ANH001",
    name: "Tiếng Anh cơ bản",
    faculty: "Ngoại ngữ",
    credits: 2,
    teacher: "Nguyễn Thị Lan",
    score: 5.9,
    resultDate: "2024-01-24",
    canSubmit: true,
    deadline: "2024-02-08",
  },
  {
    id: "TRIET001",
    code: "TRIET001",
    name: "Triết học Mác - Lênin",
    faculty: "Lý luận chính trị",
    credits: 2,
    teacher: "Trần Văn Sơn",
    score: 7.1,
    resultDate: "2024-01-14",
    canSubmit: true,
    deadline: "2024-01-29",
  },
  {
    id: "CNTT006",
    code: "CNTT006",
    name: "Công nghệ phần mềm",
    faculty: "CNTT",
    credits: 3,
    teacher: "Võ Thị Hương",
    score: 6.4,
    resultDate: "2024-01-26",
    canSubmit: true,
    deadline: "2025-12-31", // Cập nhật deadline để đảm bảo có thể phúc khảo
  },
  {
    id: "CNTT007",
    code: "CNTT007",
    name: "An toàn thông tin",
    faculty: "CNTT",
    credits: 3,
    teacher: "Đỗ Văn Long",
    score: 7.3,
    resultDate: "2024-01-12",
    canSubmit: false,
    deadline: "2024-01-27",
  },
];

// Mock đơn phúc khảo
const mockReviewRequests = [
  {
    id: "PK001",
    studentId: "sv01",
    studentName: "Nguyễn An (CNTT)",
    courseId: "CNTT001",
    courseName: "Mẫu hình thiết kế",
    oldScore: 7.5,
    newScore: null,
    status: "Chờ xử lý",
    submittedDate: "2024-01-16",
    paymentStatus: "Đã thanh toán",
    paymentDate: "2024-01-16",
    eventId: 1,
    semester: "1",
    year: "2024-2025",
    // Thông tin thi
    ngayThi: "2024-01-10",
    gioThi: "08:00",
    phongThi: "P101",
    soTui: "T001",
    soPhach: "PH001",
  },
  {
    id: "PK002",
    studentId: "sv02",
    studentName: "Trần Bình (KTPM)",
    courseId: "TOM001",
    courseName: "Cấu trúc dữ liệu",
    oldScore: 6.0,
    newScore: null,
    status: "Chờ xử lý",
    submittedDate: "2024-01-21",
    paymentStatus: "Chưa thanh toán",
    paymentDate: null,
    eventId: 1,
    semester: "1",
    year: "2024-2025",
    ngayThi: "2024-01-15",
    gioThi: "14:00",
    phongThi: "P205",
    soTui: "T002",
    soPhach: "PH002",
  },
  {
    id: "PK003",
    studentId: "sv01",
    studentName: "Nguyễn An (CNTT)",
    courseId: "KHMT001",
    courseName: "Kinh tế chính trị",
    oldScore: 2.3,
    newScore: null,
    status: "Đang xử lý",
    submittedDate: "2024-07-29",
    paymentStatus: "Đã thanh toán",
    paymentDate: "2024-07-29",
    eventId: 1,
    semester: "2",
    year: "2023-2024",
    sentToTLDTDate: "2024-02-01",
    ngayThi: "2024-01-10",
    gioThi: "08:00",
    phongThi: "P101",
    soTui: "T001",
    soPhach: "PH003",
  },
  {
    id: "PK004",
    studentId: "sv01",
    studentName: "Nguyễn An (CNTT)",
    courseId: "CNTT002",
    courseName: "Mạng máy tính",
    oldScore: 6.5,
    newScore: 7.5,
    status: "Hoàn thành",
    submittedDate: "2024-07-20",
    paymentStatus: "Đã thanh toán",
    paymentDate: "2024-07-20",
    eventId: 1,
    semester: "2",
    year: "2023-2024",
    ngayThi: "2024-01-12",
    gioThi: "10:00",
    phongThi: "P302",
    soTui: "T003",
    soPhach: "PH004",
  },
  {
    id: "PK005",
    studentId: "sv01",
    studentName: "Nguyễn An (CNTT)",
    courseId: "CNTT003",
    courseName: "Hệ điều hành",
    oldScore: 7.0,
    newScore: 7.0,
    status: "Hoàn thành",
    submittedDate: "2024-07-15",
    paymentStatus: "Đã thanh toán",
    paymentDate: "2024-07-15",
    eventId: 1,
    semester: "2",
    year: "2023-2024",
    ngayThi: "2024-01-08",
    gioThi: "14:00",
    phongThi: "P205",
    soTui: "T002",
    soPhach: "PH005",
  },
  {
    id: "PK006",
    studentId: "sv01",
    studentName: "Nguyễn An (CNTT)",
    courseId: "CNTT004",
    courseName: "Cơ sở dữ liệu",
    oldScore: 5.5,
    newScore: 6.0,
    status: "Hoàn thành",
    submittedDate: "2024-07-10",
    paymentStatus: "Đã thanh toán",
    paymentDate: "2024-07-10",
    eventId: 1,
    semester: "2",
    year: "2023-2024",
    ngayThi: "2024-01-05",
    gioThi: "08:00",
    phongThi: "P101",
    soTui: "T001",
    soPhach: "PH006",
  },
  {
    id: "PK007",
    studentId: "sv01",
    studentName: "Nguyễn An (CNTT)",
    courseId: "CNTT005",
    courseName: "Lập trình hướng đối tượng",
    oldScore: 6.8,
    newScore: 6.8,
    status: "Hoàn thành",
    submittedDate: "2024-07-05",
    paymentStatus: "Đã thanh toán",
    paymentDate: "2024-07-05",
    eventId: 1,
    semester: "2",
    year: "2023-2024",
    ngayThi: "2024-01-03",
    gioThi: "10:00",
    phongThi: "P302",
    soTui: "T003",
    soPhach: "PH007",
  },
];

// Mock sự kiện phúc khảo
const mockEvents = [
  {
    id: 1,
    name: "Phúc khảo HK1 2024-2025",
    semester: "HK1 (2024-2025)",
    startDate: "2024-01-15",
    endDate: "2025-12-31", // Cập nhật để đảm bảo event còn mở
    fee: 20000,
    status: "Đang mở",
    resultDate: "2024-01-10",
  },
];

// ==================== API FUNCTIONS ====================

// ===== SINH VIÊN =====

/**
 * Lấy danh sách học phần có thể phúc khảo
 * @param {string|number} studentId - ID sinh viên
 * @param {string} semester - Học kỳ (ví dụ: "1", "2")
 * @returns {Promise<Array>} Danh sách môn học có thể phúc khảo
 */
export const getAvailableCourses = async (studentId, semester = "1") => {
  try {
    // Lấy student ID từ parameter hoặc từ localStorage
    const idSv = studentId || getStudentId();
    if (!idSv) {
      throw new Error("Không tìm thấy ID sinh viên. Vui lòng đăng nhập lại.");
    }

    const response = await apiClient.get("/sinhvien/phuckhao/monhoc", {
      params: {
        idSv: typeof idSv === "string" ? parseInt(idSv) || idSv : idSv,
        hocKy: semester,
      },
    });

    // Map backend response sang frontend format
    const mappedData = mapMonHocResponse(response.data || []);

    // Chỉ lấy 6 môn học đầu tiên để test (theo yêu cầu)
    return mappedData.slice(0, 6);
  } catch (error) {
    // Fallback to mock data nếu API không khả dụng (development only)
    if (import.meta.env.VITE_ENABLE_MOCK_DATA === "true") {
      console.warn("API không khả dụng, sử dụng mock data:", error.message);
      await mockDelay(500);
      return mockCoursesWithScores.slice(0, 6).map((course) => ({
        ...course,
        status: course.canSubmit ? "Đủ điều kiện" : "Không đủ điều kiện",
      }));
    }
    throw new Error(
      error.response?.data?.message ||
        "Lỗi khi tải danh sách môn học. Vui lòng thử lại."
    );
  }
};

/**
 * Nộp đơn phúc khảo
 * @param {Object} requestData - Dữ liệu đơn phúc khảo
 * @param {Array} requestData.courses - Danh sách môn học muốn phúc khảo
 * @param {string} requestData.semester - Học kỳ
 * @returns {Promise<Object>} Kết quả nộp đơn
 */
export const submitReviewRequest = async (requestData) => {
  try {
    const studentId = getStudentId();
    if (!studentId) {
      throw new Error("Không tìm thấy ID sinh viên. Vui lòng đăng nhập lại.");
    }

    // Map frontend format sang backend format
    const danhSachMon = requestData.courses.map((course) => ({
      idHocPhan:
        typeof course.id === "string"
          ? parseInt(course.id) || course.id
          : course.id,
      diemCu: course.score || course.diemCu,
      ngayThi: course.ngayThi || course.resultDate || null,
      gioThi: course.gioThi || null,
      phongThi: course.phongThi || null,
    }));

    const semester = requestData.semester || "1";
    const response = await apiClient.post(
      "/sinhvien/phuckhao/tao-don",
      {
        danhSachMon,
      },
      {
        params: {
          idSv:
            typeof studentId === "string"
              ? parseInt(studentId) || studentId
              : studentId,
          hocKy: semester,
        },
      }
    );

    return {
      success: true,
      data: response.data,
      message:
        response.data?.message || "Đơn phúc khảo đã được nộp thành công.",
    };
  } catch (error) {
    if (import.meta.env.VITE_ENABLE_MOCK_DATA === "true") {
      console.warn("API không khả dụng, sử dụng mock data:", error.message);
      await mockDelay(800);
      // Fallback mock logic...
      return {
        success: true,
        data: { id: `PK${Date.now()}` },
        message: "Đơn phúc khảo đã được nộp thành công (mock).",
      };
    }
    throw new Error(
      error.response?.data?.message ||
        "Lỗi khi nộp đơn phúc khảo. Vui lòng thử lại."
    );
  }
};

/**
 * Lấy lịch sử đơn phúc khảo của sinh viên
 * @param {string|number} studentId - ID sinh viên
 * @returns {Promise<Array>} Danh sách đơn phúc khảo
 */
export const getStudentReviewHistory = async (studentId) => {
  try {
    const idSv = studentId || getStudentId();
    if (!idSv) {
      throw new Error("Không tìm thấy ID sinh viên. Vui lòng đăng nhập lại.");
    }

    const response = await apiClient.get("/sinhvien/ketqua", {
      params: {
        idSv: typeof idSv === "string" ? parseInt(idSv) || idSv : idSv,
      },
    });

    // Map backend response sang frontend format
    const ketQua = response.data?.danhSachKetQua || [];
    const currentSemester = "1";
    const currentYear = "2024-2025";

    return ketQua.map((item) => {
      // Map status từ backend sang frontend
      let status = "Chờ xử lý";
      if (item.trangThai === "HOANTHANH") {
        status = "Hoàn thành";
      } else if (item.trangThai === "DACHAM") {
        status = "Đã chấm";
      } else if (item.trangThai === "DANGCHAM") {
        status = "Đang chấm";
      }

      return {
        id: item.idDon?.toString() || `PK${item.idDon}`,
        studentId: idSv.toString(),
        studentName: "Sinh viên", // Có thể lấy từ user context
        courseId: item.maHocPhan,
        courseName: item.tenHocPhan,
        oldScore: item.diemCu,
        newScore: item.diemMoi,
        status: status,
        submittedDate: new Date().toISOString().split("T")[0],
        paymentStatus: "Đã thanh toán",
        paymentDate: new Date().toISOString().split("T")[0],
        semester: currentSemester,
        year: currentYear,
        // Nếu không phải học kỳ hiện tại, đặt về "Hoàn thành"
        ...(item.semester !== currentSemester || item.year !== currentYear
          ? { status: "Hoàn thành" }
          : {}),
      };
    });
  } catch (error) {
    if (import.meta.env.VITE_ENABLE_MOCK_DATA === "true") {
      console.warn("API không khả dụng, sử dụng mock data:", error.message);
      await mockDelay(500);
      // Fallback to mock data
      return mockReviewRequests.filter((req) => req.studentId === studentId);
    }
    throw new Error(
      error.response?.data?.message ||
        "Lỗi khi tải lịch sử đơn. Vui lòng thử lại."
    );
  }
};

/**
 * Thanh toán phí phúc khảo
 * @param {string|number} requestId - ID đơn phúc khảo
 * @param {Object} paymentData - Dữ liệu thanh toán
 * @param {string} paymentData.phuongThuc - Phương thức thanh toán
 * @param {string} paymentData.maGiaoDich - Mã giao dịch (nếu có)
 * @returns {Promise<Object>} Kết quả thanh toán
 */
export const payReviewFee = async (requestId, paymentData) => {
  try {
    const response = await apiClient.post("/sinhvien/thanh-toan", {
      idDonPhucKhao:
        typeof requestId === "string"
          ? parseInt(requestId.replace("PK", "")) || requestId
          : requestId,
      phuongThuc: paymentData?.phuongThuc || "CHUYEN_KHOAN",
      maGiaoDich: paymentData?.maGiaoDich || null,
    });

    return {
      success: true,
      message: response.data?.message || "Thanh toán thành công.",
      data: response.data,
    };
  } catch (error) {
    if (import.meta.env.VITE_ENABLE_MOCK_DATA === "true") {
      console.warn("API không khả dụng, sử dụng mock data:", error.message);
      await mockDelay(1000);
      return { success: true, message: "Thanh toán thành công (mock)." };
    }
    throw new Error(
      error.response?.data?.message || "Lỗi khi thanh toán. Vui lòng thử lại."
    );
  }
};

// ===== CHUYÊN VIÊN KHẢO THÍ =====

// Lấy danh sách yêu cầu phúc khảo (theo học phần)
export const getReviewRequestsByCourse = async (courseId = null) => {
  await mockDelay(500);
  if (courseId) {
    return mockReviewRequests.filter((req) => req.courseId === courseId);
  }
  // Nhóm theo học phần
  const grouped = {};
  mockReviewRequests.forEach((req) => {
    if (!grouped[req.courseId]) {
      grouped[req.courseId] = {
        courseId: req.courseId,
        courseName: req.courseName,
        requests: [],
        status: "Chờ xử lý",
        deadline: mockEvents[0]?.endDate,
        resultDate: mockEvents[0]?.resultDate,
      };
    }
    grouped[req.courseId].requests.push(req);
  });
  return Object.values(grouped);
};

// Lấy chi tiết một học phần với tất cả đơn
export const getCourseDetail = async (courseId) => {
  await mockDelay(500);
  const requests = mockReviewRequests.filter(
    (req) => req.courseId === courseId
  );
  const course = mockCoursesWithScores.find((c) => c.id === courseId);
  const event = mockEvents[0];

  return {
    course,
    requests,
    event,
    canSend: checkCanSendToTLDT(event, requests),
  };
};

// Kiểm tra có thể gửi đến TLĐT không
const checkCanSendToTLDT = (event, requests) => {
  if (!event || !requests.length) return false;
  const today = new Date();
  const deadline = new Date(event.endDate);
  return today > deadline && requests.some((r) => r.status === "Chờ xử lý");
};

// Chuyển đơn đến Trợ lý đào tạo
export const sendToTLDT = async (courseId) => {
  await mockDelay(1000);
  const requests = mockReviewRequests.filter(
    (req) => req.courseId === courseId && req.status === "Chờ xử lý"
  );
  requests.forEach((req) => {
    req.status = "Đang xử lý";
    req.sentToTLDTDate = new Date().toISOString().split("T")[0];
  });
  return {
    success: true,
    message: `Đã chuyển ${requests.length} đơn đến Trợ lý đào tạo.`,
  };
};

// Cập nhật điểm phúc khảo (CVKT chỉnh sửa)
export const updateReviewScore = async (requestId, newScore) => {
  await mockDelay(500);
  const request = mockReviewRequests.find((r) => r.id === requestId);
  if (request) {
    request.newScore = newScore;
  }
  return { success: true, message: "Đã cập nhật điểm thành công." };
};

// Lấy thống kê cho CVKT
export const getCVKTStats = async () => {
  await mockDelay(500);
  const total = mockReviewRequests.length;
  const pending = mockReviewRequests.filter(
    (r) => r.status === "Chờ xử lý"
  ).length;
  const processing = mockReviewRequests.filter(
    (r) => r.status === "Đang xử lý"
  ).length;
  const waitingConfirm = mockReviewRequests.filter(
    (r) => r.status === "Chờ CVKT xác nhận"
  ).length;
  const completed = mockReviewRequests.filter(
    (r) => r.status === "Hoàn thành"
  ).length;

  return {
    total,
    pending,
    processing,
    waitingConfirm,
    completed,
    averageProcessingTime: 12, // ngày
  };
};

// ===== TRỢ LÝ ĐÀO TẠO =====

// Lấy danh sách đơn cần xử lý
export const getTLDTRequests = async () => {
  await mockDelay(500);
  // Nhóm theo học phần
  const grouped = {};
  mockReviewRequests
    .filter((req) =>
      ["Đang xử lý", "Đã chuyển đến GV", "Chờ chuyển đến CVKT"].includes(
        req.status
      )
    )
    .forEach((req) => {
      if (!grouped[req.courseId]) {
        grouped[req.courseId] = {
          courseId: req.courseId,
          courseName: req.courseName,
          requests: [],
          status: req.status,
        };
      }
      grouped[req.courseId].requests.push(req);
    });
  return Object.values(grouped);
};

// Lấy chi tiết đơn để tìm kiếm bài thi
export const getRequestDetailForSearch = async (courseId) => {
  await mockDelay(500);
  const requests = mockReviewRequests.filter(
    (req) => req.courseId === courseId
  );
  return requests.map((req) => ({
    ...req,
    paperFound: req.paperFound || false,
  }));
};

// Xác nhận đã tìm thấy bài thi
export const confirmPaperFound = async (requestId) => {
  await mockDelay(300);
  const request = mockReviewRequests.find((r) => r.id === requestId);
  if (request) {
    request.paperFound = true;
  }
  return { success: true };
};

// Xuất file Excel
export const exportToExcel = async (courseId) => {
  await mockDelay(1000);
  const requests = mockReviewRequests.filter(
    (req) => req.courseId === courseId
  );
  // Cập nhật trạng thái
  requests.forEach((req) => {
    req.status = "Đã chuyển đến GV";
    req.exportedDate = new Date().toISOString().split("T")[0];
  });

  // Tạo file Excel với đầy đủ thông tin để gửi cho GV
  const excelData = requests.map((req) => ({
    "Số túi": req.soTui || "",
    "Số phách": req.soPhach || "",
    "Tên học phần": req.courseName,
    "Ngày thi": req.ngayThi
      ? new Date(req.ngayThi).toLocaleDateString("vi-VN")
      : "",
    "Giờ thi": req.gioThi || "",
    "Phòng thi": req.phongThi || "",
    Điểm: req.oldScore,
  }));

  // Tạo file CSV để download (chỉ khi có dữ liệu)
  if (excelData.length > 0 && typeof window !== "undefined") {
    try {
      const headers = Object.keys(excelData[0]);
      const csvContent = [
        headers.join(","),
        ...excelData.map((row) =>
          headers.map((header) => `"${row[header] || ""}"`).join(",")
        ),
      ].join("\n");

      // Tạo blob và download
      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `danh_sach_phuc_khao_${courseId}_${
          new Date().toISOString().split("T")[0]
        }.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Cleanup
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (err) {
      console.error("Lỗi khi xuất file:", err);
    }
  }

  return {
    success: true,
    data: excelData,
    message: "Đã xuất file Excel thành công.",
  };
};

// Nhập điểm phúc khảo
export const submitReviewScores = async (courseId, scores) => {
  await mockDelay(1000);
  scores.forEach((scoreData) => {
    const request = mockReviewRequests.find(
      (r) => r.id === scoreData.requestId
    );
    if (request) {
      request.newScore = scoreData.newScore;
      request.status = "Chờ chuyển đến CVKT";
      request.scoreEnteredDate = new Date().toISOString().split("T")[0];
    }
  });

  // Cập nhật trạng thái tất cả đơn trong học phần
  const allRequests = mockReviewRequests.filter(
    (req) => req.courseId === courseId
  );
  const allHaveScores = allRequests.every((req) => req.newScore !== null);
  if (allHaveScores) {
    allRequests.forEach((req) => {
      req.status = "Chờ CVKT xác nhận";
    });
  }

  return { success: true, message: "Đã nhập điểm thành công." };
};

// Lấy kho lưu trữ
export const getArchive = async () => {
  await mockDelay(500);
  return mockReviewRequests.filter((req) => req.status === "Hoàn thành");
};

// ===== SỰ KIỆN PHÚC KHẢO =====

// Lấy sự kiện đang mở
export const getActiveEvent = async () => {
  await mockDelay(500);
  return mockEvents.find((e) => e.status === "Đang mở") || null;
};

// Lấy tất cả sự kiện
export const getAllEvents = async () => {
  await mockDelay(500);
  return mockEvents;
};

export default {
  // Sinh viên
  getAvailableCourses,
  submitReviewRequest,
  getStudentReviewHistory,
  payReviewFee,
  // CVKT
  getReviewRequestsByCourse,
  getCourseDetail,
  sendToTLDT,
  getCVKTStats,
  // TLĐT
  getTLDTRequests,
  getRequestDetailForSearch,
  confirmPaperFound,
  exportToExcel,
  submitReviewScores,
  getArchive,
  // Sự kiện
  getActiveEvent,
  getAllEvents,
  // Cập nhật điểm
  updateReviewScore,
};
