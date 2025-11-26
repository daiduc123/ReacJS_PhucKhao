import React, { useState, useEffect } from "react";
import "./QuanLyHocPhan.css";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ThemHocPhan from "./ThemHocPhan";
import ChinhSuaHocPhan from "./ChinhSuaHocPhan";
import ChiTietHocPhan from "./ChiTietHocPhan";
import ConfirmationModal from "../Shared/ConfirmationModal";
import { getCourses, deleteCourse } from "../../../services/adminApiService"; // <-- IMPORT MỚI

const QuanLyHocPhan = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // States cho modals
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalProps, setConfirmModalProps] = useState({});

  // Hàm để tải lại dữ liệu
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses(); // <-- GỌI API
      setCourses(data);
    } catch (err) {
      setError("Không thể tải danh sách học phần.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleViewDetail = (course) => {
    setSelectedCourse(course);
    setDetailModalOpen(true);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setEditModalOpen(true);
  };

  const handleDelete = (course) => {
    setSelectedCourse(course);
    setConfirmModalProps({
      title: "Xác nhận xóa học phần",
      message: `Bạn có chắc chắn muốn xóa học phần "${course.name || course.tenHp}" (Mã: ${course.id || course.maHp})? Hành động này không thể hoàn tác.`,
      onConfirm: async () => {
        try {
          const result = await deleteCourse(course.id || course.maHp);
          setConfirmModalOpen(false);
          // Hiển thị thông báo thành công (có thể dùng toast notification)
          alert(result.message || "Học phần đã được xóa thành công!");
          fetchCourses(); // Tải lại danh sách sau khi xóa
        } catch (err) {
          // Lỗi sẽ được hiển thị trong modal
          throw err;
        }
      },
      confirmText: "Xóa",
      type: "danger"
    });
    setConfirmModalOpen(true);
  };

  // Lọc học phần theo tìm kiếm và filter
  const filteredCourses = courses.filter(course => {
    // Tìm kiếm
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        course.id?.toLowerCase().includes(searchLower) ||
        course.name?.toLowerCase().includes(searchLower) ||
        course.faculty?.toLowerCase().includes(searchLower) ||
        course.code?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    
    // Filter Khoa
    if (filterFaculty !== "all" && course.faculty !== filterFaculty) {
      return false;
    }
    
    // Filter Loại HP
    if (filterType !== "all" && course.type !== filterType) {
      return false;
    }
    
    // Filter Trạng thái
    if (filterStatus !== "all") {
      if (filterStatus === "active" && course.status !== "Hoạt động") return false;
      if (filterStatus === "inactive" && course.status === "Hoạt động") return false;
    }
    
    return true;
  });

  // Tính toán thống kê
  const stats = {
    total: courses.length,
    active: courses.filter(c => c.status === "Hoạt động").length,
    inactive: courses.filter(c => c.status !== "Hoạt động").length,
    today: courses.filter(c => {
      const today = new Date().toDateString();
      return c.dateCreated === today || c.createdAt === today;
    }).length
  };

  if (loading) return <div className="AD_loading">Đang tải...</div>;
  if (error) return <div className="AD_error">{error}</div>;

  return (
    <div className="AD_container">
      <h1 className="AD_page-title">Quản lý học phần</h1>

      {/* Thống kê */}
      <div className="AD_stats-grid">
        <div className="AD_stat-card">
          <div className="AD_stat-title">Tổng học phần</div>
          <div className="AD_stat-value">{stats.total}</div>
        </div>
        <div className="AD_stat-card" style={{ borderLeftColor: "#28a745" }}>
          <div className="AD_stat-title">Đang hoạt động</div>
          <div className="AD_stat-value" style={{ color: "#28a745" }}>{stats.active}</div>
        </div>
        <div className="AD_stat-card" style={{ borderLeftColor: "#6c757d" }}>
          <div className="AD_stat-title">Không hoạt động</div>
          <div className="AD_stat-value" style={{ color: "#6c757d" }}>{stats.inactive}</div>
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
              placeholder="Mã HP, Tên HP...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="AD_search-icon" />
          </div>
          
          <div className="AD_filter-item">
            <label className="AD_filter-label">Khoa:</label>
            <select
              className="AD_filter-select"
              value={filterFaculty}
              onChange={(e) => setFilterFaculty(e.target.value)}
            >
              <option value="all">Tất cả các khoa</option>
              <option value="CNTT">Công nghệ thông tin</option>
              <option value="Toán">Toán học</option>
              <option value="Lý">Vật lý</option>
              <option value="Hóa">Hóa học</option>
            </select>
          </div>
          
          <div className="AD_filter-item">
            <label className="AD_filter-label">Loại HP:</label>
            <select
              className="AD_filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Tất cả các loại</option>
              <option value="Bắt buộc">Bắt buộc</option>
              <option value="Tự chọn">Tự chọn</option>
              <option value="Tự chọn có điều kiện">Tự chọn có điều kiện</option>
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
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
        </div>
      </div>

      <div className="AD_action-bar">
        <button
          className="AD_btn AD_btn-primary"
          onClick={() => setAddModalOpen(true)}
        >
          Thêm học phần
        </button>
      </div>
      <div className="AD_table-container">
        <table className="AD_table">
          <thead>
            <tr>
              <th>Mã học phần</th>
              <th>Tên học phần</th>
              <th>Khoa/Bộ môn</th>
              <th>Số tín chỉ</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.faculty}</td>
                <td>{course.credits}</td>
                <td>
                  <span
                    className={`AD_status-badge AD_status-${
                      course.status === "Hoạt động" ? "active" : "locked"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="AD_actions">
                  <button 
                    className="AD_action-btn"
                    title="Xem chi tiết"
                    onClick={() => handleViewDetail(course)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="AD_action-btn"
                    title="Chỉnh sửa"
                    onClick={() => handleEdit(course)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="AD_action-btn AD_action-btn-delete"
                    title="Xóa"
                    onClick={() => handleDelete(course)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="6" className="AD_no-data">
                  {searchTerm ? "Không tìm thấy học phần nào phù hợp." : "Không có dữ liệu học phần."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ThemHocPhan
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={fetchCourses}
      />
      <ChinhSuaHocPhan
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        course={selectedCourse}
        onSave={fetchCourses}
      />
      <ChiTietHocPhan
        isOpen={isDetailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedCourse(null);
        }}
        courseId={selectedCourse?.id}
      />
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        {...confirmModalProps}
      />
    </div>
  );
};

export default QuanLyHocPhan;
