// src/api/mockApi.js

// Giả lập một database người dùng
const MOCK_USERS = [
  // =================================================================
  // --- 3 Tài khoản Admin ---
  // =================================================================
  {
    username: "admin",
    password: "123",
    userData: {
      fullName: "Trần Đại Đức (Admin)",
      role: "Admin",
      email: "duc.tran.admin@husc.edu.vn",
    },
  },
  {
    username: "admin02",
    password: "111111",
    userData: {
      fullName: "Nguyễn Thị Quản Trị",
      role: "Admin",
      email: "quantri.nguyen@husc.edu.vn",
    },
  },
  {
    username: "admin03",
    password: "111",
    userData: {
      fullName: "Lê Văn Hệ Thống",
      role: "Admin",
      email: "hethong.le@husc.edu.vn",
    },
  },

  // =================================================================
  // --- 5 Tài khoản Chuyên viên khảo thí ---
  // =================================================================
  {
    username: "cvkt01",
    password: "111",
    userData: {
      fullName: "Phan Thị Khảo Thí",
      role: "Chuyên viên khảo thí",
      email: "22T1020575@husc.edu.vn",
    },
  },
  {
    username: "cvkt02",
    password: "111",
    userData: {
      fullName: "Đỗ Minh Giám Sát",
      role: "Chuyên viên khảo thí",
      email: "giamsat.do@husc.edu.vn",
    },
  },
  {
    username: "cvkt03",
    password: "111",
    userData: {
      fullName: "Võ Ngọc Chất Lượng",
      role: "Chuyên viên khảo thí",
      email: "chatluong.vo@husc.edu.vn",
    },
  },
  {
    username: "cvkt04",
    password: "111",
    userData: {
      fullName: "Hoàng Kim Đảm Bảo",
      role: "Chuyên viên khảo thí",
      email: "dambao.hoang@husc.edu.vn",
    },
  },
  {
    username: "cvkt05",
    password: "111",
    userData: {
      fullName: "Trịnh Văn Thanh Tra",
      role: "Chuyên viên khảo thí",
      email: "thanhtra.trinh@husc.edu.vn",
    },
  },

  // =================================================================
  // --- 5 Tài khoản Trợ lý đào tạo ---
  // =================================================================
  {
    username: "tldt01",
    password: "111",
    userData: {
      fullName: "Mai Anh Đào Tạo",
      role: "Trợ lý đào tạo",
      email: "daotao.mai@husc.edu.vn",
    },
  },
  {
    username: "tldt02",
    password: "111",
    userData: {
      fullName: "Bùi Văn Giáo Vụ",
      role: "Trợ lý đào tạo",
      email: "giaovu.bui@husc.edu.vn",
    },
  },
  {
    username: "tldt03",
    password: "111",
    userData: {
      fullName: "Đặng Thị Kế Hoạch",
      role: "Trợ lý đào tạo",
      email: "kehoach.dang@husc.edu.vn",
    },
  },
  {
    username: "tldt04",
    password: "111",
    userData: {
      fullName: "Lý Thanh Lịch",
      role: "Trợ lý đào tạo",
      email: "lich.ly@husc.edu.vn",
    },
  },
  {
    username: "tldt05",
    password: "111",
    userData: {
      fullName: "Phạm Hữu Học Vụ",
      role: "Trợ lý đào tạo",
      email: "hocvu.pham@husc.edu.vn",
    },
  },

  // =================================================================
  // --- 3 Tài khoản Phòng Đào tạo ---
  // =================================================================
  {
    username: "pdt01",
    password: "111",
    userData: {
      fullName: "Nguyễn Văn Đào Tạo",
      role: "Phòng Đào tạo",
      email: "daotao.nguyen@husc.edu.vn",
    },
  },
  {
    username: "pdt02",
    password: "111",
    userData: {
      fullName: "Trần Thị Học Vụ",
      role: "Phòng Đào tạo",
      email: "hocvu.tran@husc.edu.vn",
    },
  },
  {
    username: "pdt03",
    password: "111",
    userData: {
      fullName: "Lê Văn Quản Lý",
      role: "Phòng Đào tạo",
      email: "quanly.le@husc.edu.vn",
    },
  },

  // =================================================================
  // --- 15 Tài khoản Sinh viên ---
  // =================================================================
  {
    username: "sv01",
    password: "111",
    userData: {
      fullName: "Nguyễn An (CNTT)",
      role: "Sinh viên",
      department: "Công nghệ thông tin",
      email: "sv01@husc.edu.vn",
    },
  },
  {
    username: "sv02",
    password: "111",
    userData: {
      fullName: "Trần Bình (KTPM)",
      role: "Sinh viên",
      department: "Kỹ thuật phần mềm",
      email: "sv02@husc.edu.vn",
    },
  },
  {
    username: "sv03",
    password: "111",
    userData: {
      fullName: "Lê Châu (KHMT)",
      role: "Sinh viên",
      department: "Khoa học máy tính",
      email: "sv03@husc.edu.vn",
    },
  },
  {
    username: "sv04",
    password: "111",
    userData: {
      fullName: "Phạm Dũng (Toán)",
      role: "Sinh viên",
      department: "Toán học",
      email: "sv04@husc.edu.vn",
    },
  },
  {
    username: "sv05",
    password: "111",
    userData: {
      fullName: "Võ Giang (Vật lý)",
      role: "Sinh viên",
      department: "Vật lý",
      email: "sv05@husc.edu.vn",
    },
  },
  {
    username: "sv06",
    password: "111",
    userData: {
      fullName: "Hoàng Hiếu (Hóa)",
      role: "Sinh viên",
      department: "Hóa học",
      email: "sv06@husc.edu.vn",
    },
  },
  {
    username: "sv07",
    password: "111",
    userData: {
      fullName: "Ngô Kiên (Sinh)",
      role: "Sinh viên",
      department: "Sinh học",
      email: "sv07@husc.edu.vn",
    },
  },
  {
    username: "sv08",
    password: "111",
    userData: {
      fullName: "Đỗ Long (Địa lý)",
      role: "Sinh viên",
      department: "Địa lý",
      email: "sv08@husc.edu.vn",
    },
  },
  {
    username: "sv09",
    password: "111",
    userData: {
      fullName: "Lý My (Văn học)",
      role: "Sinh viên",
      department: "Văn học",
      email: "sv09@husc.edu.vn",
    },
  },
  {
    username: "sv10",
    password: "111",
    userData: {
      fullName: "Bùi Nam (Lịch sử)",
      role: "Sinh viên",
      department: "Lịch sử",
      email: "sv10@husc.edu.vn",
    },
  },
  {
    username: "sv11",
    password: "111",
    userData: {
      fullName: "Hà Oanh (Triết)",
      role: "Sinh viên",
      department: "Triết học",
      email: "sv11@husc.edu.vn",
    },
  },
  {
    username: "sv12",
    password: "111",
    userData: {
      fullName: "Vũ Phong (Báo chí)",
      role: "Sinh viên",
      department: "Báo chí",
      email: "sv12@husc.edu.vn",
    },
  },
  {
    username: "sv13",
    password: "111",
    userData: {
      fullName: "Đinh Quang (CNSH)",
      role: "Sinh viên",
      department: "Công nghệ sinh học",
      email: "sv13@husc.edu.vn",
    },
  },
  {
    username: "sv14",
    password: "111",
    userData: {
      fullName: "Tạ Tú (Môi trường)",
      role: "Sinh viên",
      department: "Khoa học môi trường",
      email: "sv14@husc.edu.vn",
    },
  },
  {
    username: "sv15",
    password: "111",
    userData: {
      fullName: "Mai Uyên (Kiến trúc)",
      role: "Sinh viên",
      department: "Kiến trúc",
      email: "sv15@husc.edu.vn",
    },
  },
];

/**
 * Hàm giả lập việc gọi API đăng nhập.
 * @param {string} username - Tên đăng nhập người dùng nhập vào.
 * @param {string} password - Mật khẩu người dùng nhập vào.
 * @returns {Promise<object>} - Một Promise sẽ resolve với dữ liệu người dùng nếu thành công, hoặc reject với một lỗi nếu thất bại.
 */
export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find((u) => u.username === username);

      if (user && user.password === password) {
        console.log("Đăng nhập thành công cho user:", username);

        // --- QUAN TRỌNG: Đảm bảo object trả về có cấu trúc như thế này ---
        resolve({
          success: true,
          token: "fake-jwt-token-for-" + user.username,
          user: user.userData, // <-- Phải có key "user" ở đây
        });
        // -----------------------------------------------------------------
      } else {
        console.error("Sai tên đăng nhập hoặc mật khẩu.");
        reject({
          success: false,
          message: "Tên đăng nhập hoặc mật khẩu không chính xác.",
        });
      }
    }, 1000);
  });
};
