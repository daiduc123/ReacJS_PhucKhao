import axios from "axios";

// Cấu hình URL cơ sở của backend
const API_URL = "http://localhost:8080/api/admin"; // Vui lòng điều chỉnh theo backend của bạn

// Axios instance để dễ dàng thêm header, interceptor...
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Thêm token nếu cần
  },
});

// --- Hàm giả lập (Mock Data) ---
const mockDelay = (ms) => new Promise((res) => setTimeout(res, ms));

const mockDashboardStats = {
  status: "Hoạt động",
  onlineUsers: 200,
  openEvents: 6,
  todaySubmissions: 70,
  infoCards: [
    { title: "Tổng đơn phúc khảo", value: 300, color: "#e0f7fa" }, // Màu nền nhẹ hơn
    { title: "Đã xử lý", value: 300, color: "#ffe0b2" },
    { title: "Đang xử lý", value: 300, color: "#c8e6c9" },
    { title: "Tỷ lệ thành công", value: 300, color: "#bbdefb" },
  ],
  recentActivities: [
    {
      id: 1,
      action: "Duyệt đợt phúc khảo HK1 2024-2025",
      timestamp: "1 giờ trước",
    },
    { id: 2, action: "Cập nhật cấu hình hệ thống", timestamp: "3 giờ trước" },
    {
      id: 3,
      action: "Thêm 15 tài khoản sinh viên vào hệ thống",
      timestamp: "5 giờ trước",
    },
    {
      id: 4,
      action: "Tạo đợt phúc khảo cho CTĐT mới",
      timestamp: "1 ngày trước",
    },
    {
      id: 5,
      action: "Chỉnh sửa quy trình duyệt thông báo",
      timestamp: "2 ngày trước",
    },
    {
      id: 6,
      action: "Chỉnh sửa nội dung NPP hệ thống thông báo",
      timestamp: "3 ngày trước",
    },
  ],
};

const mockUsers = [
  {
    id: "22T100001",
    username: "sv001",
    fullName: "Trần Đại Đức",
    email: "duc.tran@husc.edu.vn",
    phone: "0901234567",
    dob: "2000-01-01",
    role: "Admin",
    lastLogin: "Trực tiếp",
    status: "Hoạt động",
  },
  {
    id: "22T100002",
    username: "sv002",
    fullName: "Nguyễn Văn A",
    email: "a.nguyen@husc.edu.vn",
    phone: "0902345678",
    dob: "2001-02-02",
    role: "Sinh viên",
    lastLogin: "2 giờ trước",
    status: "Bị khóa",
  },
  {
    id: "22T100003",
    username: "sv003",
    fullName: "Phạm Thị B",
    email: "b.pham@husc.edu.vn",
    phone: "0903456789",
    dob: "2002-03-03",
    role: "Giảng viên",
    lastLogin: "5 giờ trước",
    status: "Hoạt động",
  },
  {
    id: "22T100004",
    username: "sv004",
    fullName: "Lê Văn C",
    email: "c.le@husc.edu.vn",
    phone: "0904567890",
    dob: "2003-04-04",
    role: "Admin",
    lastLogin: "1 ngày trước",
    status: "Hoạt động",
  },
  {
    id: "22T100005",
    username: "sv005",
    fullName: "Trần Duy Hưng",
    email: "hung.tran@husc.edu.vn",
    phone: "0905678901",
    dob: "2000-05-05",
    role: "Sinh viên",
    lastLogin: "3 ngày trước",
    status: "Hoạt động",
  },
  {
    id: "22T100006",
    username: "sv006",
    fullName: "Nguyễn Đình K",
    email: "k.nguyen@husc.edu.vn",
    phone: "0906789012",
    dob: "2001-06-06",
    role: "Chuyên viên THI",
    lastLogin: "5 ngày trước",
    status: "Không hoạt động",
  },
];

const mockCourses = [
  {
    id: "CNTT001",
    name: "Mẫu hình thiết kế",
    faculty: "CNTT",
    type: "Chuyên ngành",
    credits: 3,
    teacher: "Nguyễn Hoàng Hà",
    status: "Hoạt động",
  },
  {
    id: "TOM001",
    name: "Cấu trúc dữ liệu",
    faculty: "CNTT",
    type: "Cơ sở ngành",
    credits: 4,
    teacher: "Nguyễn Văn A",
    status: "Tạm dừng",
  },
  {
    id: "KHMT001",
    name: "Xác suất thống kê",
    faculty: "KHMT",
    type: "Đại cương",
    credits: 3,
    teacher: "Trần Thị Thúy",
    status: "Hoạt động",
  },
  {
    id: "VL001",
    name: "Vật lý đại cương",
    faculty: "Vật lý",
    type: "Đại cương",
    credits: 3,
    teacher: "Phạm Văn B",
    status: "Hoạt động",
  },
  {
    id: "CNTT002",
    name: "Mạng máy tính",
    faculty: "CNTT",
    type: "Chuyên ngành",
    credits: 3,
    teacher: "Lê Thúy Hằng",
    status: "Hoạt động",
  },
  {
    id: "CNTT003",
    name: "Hệ điều hành",
    faculty: "CNTT",
    type: "Chuyên ngành",
    credits: 3,
    teacher: "Nguyễn Văn C",
    status: "Tạm dừng",
  },
];

// --- API Functions ---

// Dashboard
export const getDashboardStats = async () => {
  await mockDelay(500); // Giả lập độ trễ
  // try {
  //     const response = await api.get('/dashboard-stats');
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi lấy dữ liệu thống kê:", error);
  //     throw error;
  // }
  return mockDashboardStats;
};

// Users
export const getUsers = async () => {
  await mockDelay(500);
  // try {
  //     const response = await api.get('/users', { params: filters });
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi lấy danh sách người dùng:", error);
  //     throw error;
  // }
  return mockUsers;
};

export const addUser = async (userData) => {
  await mockDelay(500);
  // Adding user...
  // try {
  //     const response = await api.post('/users', userData);
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi thêm người dùng:", error);
  //     throw error;
  // }
  return { success: true, message: "Người dùng đã được thêm thành công." };
};

export const updateUser = async (userId, userData) => {
  await mockDelay(500);
  // Updating user...
  // try {
  //     const response = await api.put(`/users/${userId}`, userData);
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi cập nhật người dùng:", error);
  //     throw error;
  // }
  return { success: true, message: "Người dùng đã được cập nhật thành công." };
};

export const lockUser = async (userId, reason) => {
  await mockDelay(500);
  // Locking user...
  // try {
  //     const response = await api.post(`/users/${userId}/lock`, { reason });
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi khóa tài khoản:", error);
  //     throw error;
  // }
  return { success: true, message: "Tài khoản đã được khóa." };
};

export const toggleUserStatus = async (userId) => {
  try {
    const response = await api.put(`/users/${userId}/toggle-status`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thay đổi trạng thái tài khoản:", error);
    throw new Error(error.response?.data?.message || "Không thể thay đổi trạng thái tài khoản. Vui lòng thử lại.");
  }
};

export const deleteUser = async (userId) => {
  await mockDelay(500);
  // Deleting user...
  // try {
  //     const response = await api.delete(`/users/${userId}`);
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi xóa tài khoản:", error);
  //     throw error;
  // }
  return { success: true, message: "Tài khoản đã được xóa." };
};

// Courses (Học phần)
export const getCourses = async () => {
  await mockDelay(500);
  // try {
  //     const response = await api.get('/courses', { params: filters });
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi lấy danh sách học phần:", error);
  //     throw error;
  // }
  return mockCourses;
};

export const addCourse = async (courseData) => {
  await mockDelay(500);
  // Adding course...
  // try {
  //     const response = await api.post('/courses', courseData);
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi thêm học phần:", error);
  //     throw error;
  // }
  return { success: true, message: "Học phần đã được thêm thành công." };
};

export const updateCourse = async (courseId, courseData) => {
  await mockDelay(500);
  // Updating course...
  // try {
  //     const response = await api.put(`/courses/${courseId}`, courseData);
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi cập nhật học phần:", error);
  //     throw error;
  // }
  return { success: true, message: "Học phần đã được cập nhật thành công." };
};

export const deleteCourse = async (courseId) => {
  await mockDelay(500);
  // Deleting course...
  
  // Thử gọi API thật trước
  try {
    const response = await api.delete(`/hocphan/delete/${courseId}`);
    return { success: true, message: "Học phần đã được xóa thành công." };
  } catch (error) {
    // Nếu API thật lỗi, sử dụng mock (cho development)
    // API không khả dụng, sử dụng mock data
    // Giả lập xóa thành công
    return { success: true, message: "Học phần đã được xóa thành công." };
  }
};

export const getCourseDetail = async (courseId) => {
  await mockDelay(500);
  // Tìm học phần trong mock data
  const course = mockCourses.find(c => c.id === courseId || c.id?.toString() === courseId?.toString());
  
  if (course) {
    // Trả về dữ liệu chi tiết với format phù hợp
    return {
      id: course.id,
      maHp: course.id,
      tenHp: course.name,
      soTinChi: course.credits,
      tenKhoa: course.faculty,
      loaiHp: course.type === "Chuyên ngành" ? "CHUYEN_NGANH" : 
              course.type === "Cơ sở ngành" ? "CO_SO" : "KHAC",
      tenTruongKhoa: course.teacher,
      trangThai: course.status === "Hoạt động" ? "HOATDONG" : 
                 course.status === "Tạm dừng" ? "TAMDUNG" : "XOA",
      // Giữ lại format cũ để tương thích
      name: course.name,
      code: course.id,
      faculty: course.faculty,
      credits: course.credits,
      type: course.type,
      teacher: course.teacher,
      status: course.status
    };
  }
  
  // Nếu không tìm thấy trong mock, thử gọi API thật
  try {
    const response = await api.get(`/hocphan/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết học phần:", error);
    throw new Error(error.response?.data?.message || "Không tìm thấy học phần với ID này.");
  }
};

// Events (Sự kiện phúc khảo)
export const createReviewEvent = async (eventData) => {
  await mockDelay(500);
  // Creating review event...
  // try {
  //     const response = await api.post('/review-events', eventData);
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi tạo sự kiện phúc khảo:", error);
  //     throw error;
  // }
  return { success: true, message: "Sự kiện phúc khảo đã được tạo." };
};

export const getReviewEvents = async (filters) => {
  await mockDelay(500);
  // Fetching review events...
  // try {
  //     const response = await api.get('/review-events', { params: filters });
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi lấy sự kiện phúc khảo:", error);
  //     throw error;
  // }
  return [
    {
      id: 1,
      name: "Phúc khảo HK1 2024-2025",
      semester: "HK1 (2024-2025)",
      startDate: "2024-09-01",
      endDate: "2024-09-15",
      fee: "20.000",
      status: "Đang mở",
    },
    {
      id: 2,
      name: "Phúc khảo HK2 2023-2024",
      semester: "HK2 (2023-2024)",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      fee: "20.000",
      status: "Đã đóng",
    },
  ];
};

export const approveReviewEvent = async (eventId) => {
  await mockDelay(500);
  // Approving review event...
  // try {
  //     const response = await api.post(`/review-events/${eventId}/approve`);
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi duyệt sự kiện phúc khảo:", error);
  //     throw error;
  // }
  return { success: true, message: "Sự kiện phúc khảo đã được duyệt." };
};

// System Config
export const getSystemConfig = async () => {
  await mockDelay(500);
  // try {
  //     const response = await api.get('/system-config');
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi lấy cấu hình hệ thống:", error);
  //     throw error;
  // }
  return {
    reviewFee: 20000,
    paymentInfo: {
      bankName: "Vietcombank",
      accountNumber: "0123456789",
      accountHolder: "Trường ĐH Khoa học",
      qrCodeUrl: "/assets/images/qr-code-placeholder.png", // URL ảo
    },
    notifications: [
      {
        id: 1,
        title: "Thông báo lịch phúc khảo",
        audience: "Sinh viên",
        content: "Lịch phúc khảo HK1...",
        sendEmail: true,
        sendInApp: true,
      },
    ],
    reviewTimings: {
      studentSubmission: { daysAfterResult: 15, workDays: true },
      specialistReview: { workDays: 3, description: "Thời gian duyệt đơn" },
      supportStaffCollect: { workDays: 3, description: "Thời gian kiểm hồ sơ" },
      supportStaffEnterPoints: {
        workDays: 7,
        description: "Thời gian nhập điểm phúc khảo",
      },
    },
  };
};

export const updateSystemConfig = async (configData) => {
  await mockDelay(500);
  // Updating system config...
  // try {
  //     const response = await api.put('/system-config', configData);
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi cập nhật cấu hình hệ thống:", error);
  //     throw error;
  // }
  return { success: true, message: "Cấu hình hệ thống đã được cập nhật." };
};

export const sendNotification = async (notificationData) => {
  await mockDelay(500);
  // Sending notification...
  // try {
  //     const response = await api.post('/system-config/send-notification', notificationData);
  //     return response.data;
  // } catch (error) {
  //     console.error("Lỗi khi gửi thông báo:", error);
  //     throw error;
  // }
  return { success: true, message: "Thông báo đã được gửi." };
};
