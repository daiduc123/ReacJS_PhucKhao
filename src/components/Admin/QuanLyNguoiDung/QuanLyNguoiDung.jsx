import React, { useState, useEffect } from "react";
import "./QuanLyNguoiDung.css";
import { FaSearch, FaEdit, FaLock, FaUnlock, FaTrash, FaPlus, FaFileExcel, FaDownload } from "react-icons/fa";
import ThemNguoiDung from "./ThemNguoiDung";
import ChinhSuaNguoiDung from "./ChinhSuaNguoiDung";
import KhoaTaiKhoan from "./KhoaTaiKhoan";
import MoKhoaTaiKhoan from "./MoKhoaTaiKhoan";
import XoaTaiKhoan from "./XoaTaiKhoan";
import { getUsers } from "../../../services/adminApiService"; // Import API service

const QuanLyNguoiDung = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // States để điều khiển các modal
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isLockModalOpen, setLockModalOpen] = useState(false);
  const [isUnlockModalOpen, setUnlockModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all"); // all, name, email, username, major
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("fullName");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers({
        searchTerm,
        role: filterRole,
        status: filterStatus,
      });
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách người dùng. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, filterRole, filterStatus]); // Fetch lại khi filter thay đổi

  // Các hàm xử lý modal
  const handleAddUser = () => {
    setAddModalOpen(true);
  };
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };
  const handleLockUser = (user) => {
    setSelectedUser(user);
    setLockModalOpen(true);
  };
  const handleUnlockUser = (user) => {
    setSelectedUser(user);
    setUnlockModalOpen(true);
  };
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // Sau khi thêm/sửa/xóa thành công, gọi lại API để refresh dữ liệu
  const handleActionSuccess = () => {
    fetchUsers();
    setAddModalOpen(false);
    setEditModalOpen(false);
    setLockModalOpen(false);
    setUnlockModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedUser(null);
  };

  // Export to Excel
  const handleExportExcel = () => {
    const filteredUsers = users.filter((user) => {
      const matchesSearch = 
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "all" || user.role.toLowerCase().includes(filterRole.toLowerCase());
      const statusValue = user.status || user.trangThai || "";
      const matchesStatus = filterStatus === "all" || 
        (filterStatus === "active" && (statusValue === "Hoạt động" || statusValue === "HOATDONG")) ||
        (filterStatus === "locked" && (statusValue === "Bị khóa" || statusValue === "BIKHOA")) ||
        (filterStatus === "inactive" && statusValue === "Không hoạt động");
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Tạo CSV content
    const headers = ["Tên đăng nhập", "Họ tên", "Email", "Vai trò", "Trạng thái", "Số điện thoại", "Ngày sinh"];
    const rows = filteredUsers.map(user => [
      user.username || "",
      user.fullName || "",
      user.email || "",
      user.role || "",
      user.status || "",
      user.phone || "",
      user.dob || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    // Tạo blob và download
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `danh_sach_nguoi_dung_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sort users
  const sortedUsers = [...users].sort((a, b) => {
    let aValue = a[sortBy] || "";
    let bValue = b[sortBy] || "";
    
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  // Filter users
  const filteredUsers = sortedUsers.filter((user) => {
    let matchesSearch = true;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      switch (searchType) {
        case "name":
          matchesSearch = user.fullName?.toLowerCase().includes(searchLower) || false;
          break;
        case "email":
          matchesSearch = user.email?.toLowerCase().includes(searchLower) || false;
          break;
        case "username":
          matchesSearch = user.username?.toLowerCase().includes(searchLower) || 
                         user.id?.toLowerCase().includes(searchLower) || false;
          break;
        case "major":
          matchesSearch = user.major?.toLowerCase().includes(searchLower) || 
                         user.specialization?.toLowerCase().includes(searchLower) || false;
          break;
        default: // "all"
          matchesSearch = 
            user.fullName?.toLowerCase().includes(searchLower) ||
            user.email?.toLowerCase().includes(searchLower) ||
            user.username?.toLowerCase().includes(searchLower) ||
            user.id?.toLowerCase().includes(searchLower) ||
            user.major?.toLowerCase().includes(searchLower) ||
            user.specialization?.toLowerCase().includes(searchLower) || false;
      }
    }
    const matchesRole = filterRole === "all" || 
      user.role?.toLowerCase().includes(filterRole.toLowerCase());
    const statusValue = user.status || user.trangThai || "";
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "active" && (statusValue === "Hoạt động" || statusValue === "HOATDONG")) ||
      (filterStatus === "locked" && (statusValue === "Bị khóa" || statusValue === "BIKHOA")) ||
      (filterStatus === "inactive" && statusValue === "Không hoạt động");
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return <div className="AD_loading">Đang tải dữ liệu người dùng...</div>;
  }

  if (error) {
    return <div className="AD_error">{error}</div>;
  }

  // Tính toán thống kê
  const stats = {
    total: users.length,
    active: users.filter(u => {
      const status = u.status || u.trangThai || "";
      return status === "Hoạt động" || status === "HOATDONG";
    }).length,
    locked: users.filter(u => {
      const status = u.status || u.trangThai || "";
      return status === "Bị khóa" || status === "BIKHOA";
    }).length,
    inactive: users.filter(u => {
      const status = u.status || u.trangThai || "";
      return status === "Không hoạt động";
    }).length,
    today: users.filter(u => {
      // Giả sử có trường createdAt hoặc dateCreated
      const today = new Date().toDateString();
      return u.dateCreated === today || u.createdAt === today;
    }).length
  };

  return (
    <div className="AD_container">
      <h1 className="AD_page-title">Quản lý người dùng</h1>

      {/* Thống kê */}
      <div className="AD_stats-grid">
        <div className="AD_stat-card">
          <div className="AD_stat-title">Tổng người dùng</div>
          <div className="AD_stat-value">{stats.total}</div>
        </div>
        <div className="AD_stat-card" style={{ borderLeftColor: "#28a745" }}>
          <div className="AD_stat-title">Đang hoạt động</div>
          <div className="AD_stat-value" style={{ color: "#28a745" }}>{stats.active}</div>
        </div>
        <div className="AD_stat-card" style={{ borderLeftColor: "#dc3545" }}>
          <div className="AD_stat-title">Bị khóa</div>
          <div className="AD_stat-value" style={{ color: "#dc3545" }}>{stats.locked}</div>
        </div>
        <div className="AD_stat-card" style={{ borderLeftColor: "#ffc107" }}>
          <div className="AD_stat-title">Mới hôm nay</div>
          <div className="AD_stat-value" style={{ color: "#ffc107" }}>{stats.today}</div>
        </div>
      </div>

      <div className="AD_search-filter-container">
        <div className="AD_search-filter-row">
          <div className="AD_search-input-wrapper">
            <input
              type="text"
              className="AD_search-input"
              placeholder="Tên, Email, Mã số..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  fetchUsers();
                }
              }}
            />
            <FaSearch className="AD_search-icon" />
          </div>
          
          <div className="AD_filter-item">
            <label className="AD_filter-label">Vai trò:</label>
            <select
              className="AD_filter-select"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Admin</option>
              <option value="sinhvien">Sinh viên</option>
              <option value="giangvien">Giảng viên</option>
              <option value="chuyên viên">Chuyên viên khảo thí</option>
              <option value="trợ lý">Trợ lý đào tạo</option>
            </select>
          </div>
          
          <div className="AD_filter-item">
            <label className="AD_filter-label">Trạng thái:</label>
            <select
              className="AD_filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="locked">Bị khóa</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
          
          <div className="AD_filter-item">
            <label className="AD_filter-label">Sắp xếp:</label>
            <select
              className="AD_filter-select"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}
            >
              <option value="fullName-asc">Tên A-Z</option>
              <option value="fullName-desc">Tên Z-A</option>
              <option value="email-asc">Email A-Z</option>
              <option value="email-desc">Email Z-A</option>
              <option value="role-asc">Vai trò A-Z</option>
              <option value="role-desc">Vai trò Z-A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="AD_action-bar">
        <div className="AD_action-buttons-left">
          <button 
            className="AD_btn AD_btn-success" 
            onClick={handleExportExcel}
            title="Xuất file Excel"
          >
            <FaFileExcel /> Xuất Excel
          </button>
        </div>
        <div className="AD_action-buttons-right">
          <button className="AD_btn AD_btn-primary" onClick={handleAddUser}>
            <FaPlus /> Thêm người dùng
          </button>
        </div>
      </div>

      <div className="AD_table-container">
        <table className="AD_table">
          <thead>
            <tr>
              <th>Tên đăng nhập</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`AD_role-badge AD_role-${user.role
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {(() => {
                      const statusValue = user.status || user.trangThai || "";
                      const isActive = statusValue === "Hoạt động" || statusValue === "HOATDONG";
                      return (
                        <span
                          className={`AD_status-badge AD_status-${isActive ? "active" : "locked"}`}
                        >
                          {statusValue === "HOATDONG" ? "Hoạt động" : 
                           statusValue === "BIKHOA" ? "Bị khóa" : statusValue}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="AD_actions">
                    <button
                      title="Chỉnh sửa"
                      onClick={() => handleEditUser(user)}
                    >
                      <FaEdit />
                    </button>
                    {(() => {
                      const isActive = user.status === "Hoạt động" || 
                                      user.status === "HOATDONG" ||
                                      user.trangThai === "HOATDONG";
                      return isActive ? (
                        <button 
                          title="Khóa tài khoản" 
                          onClick={() => handleLockUser(user)}
                          style={{ color: "#ff9800" }}
                        >
                          <FaLock />
                        </button>
                      ) : (
                        <button 
                          title="Mở khóa tài khoản" 
                          onClick={() => handleUnlockUser(user)}
                          style={{ color: "#28a745" }}
                        >
                          <FaUnlock />
                        </button>
                      );
                    })()}
                    <button title="Xóa" onClick={() => handleDeleteUser(user)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="AD_no-data">
                  {searchTerm || filterRole !== "all" || filterStatus !== "all"
                    ? "Không tìm thấy người dùng nào phù hợp với bộ lọc."
                    : "Không có dữ liệu người dùng nào."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Thông tin kết quả */}
        <div className="AD_table-info">
          <span>Hiển thị {filteredUsers.length} / {users.length} người dùng</span>
        </div>
      </div>

      {/* Các Modal */}
      <ThemNguoiDung
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSaveSuccess={handleActionSuccess}
      />
      <ChinhSuaNguoiDung
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={selectedUser}
        onSaveSuccess={handleActionSuccess}
      />
      <KhoaTaiKhoan
        isOpen={isLockModalOpen}
        onClose={() => setLockModalOpen(false)}
        user={selectedUser}
        onConfirmSuccess={handleActionSuccess}
      />
      <MoKhoaTaiKhoan
        isOpen={isUnlockModalOpen}
        onClose={() => setUnlockModalOpen(false)}
        user={selectedUser}
        onConfirmSuccess={handleActionSuccess}
      />
      <XoaTaiKhoan
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        user={selectedUser}
        onConfirmSuccess={handleActionSuccess}
      />
    </div>
  );
};

export default QuanLyNguoiDung;
