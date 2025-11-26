import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- Các component của Sinh viên ---
import Login from "./components/SinhVien/login/Login";
import Home from "./components/SinhVien/home/Home";

// --- Component đăng nhập cho cán bộ ---
import DangNhap from "./components/ChucNangChung/dangnhap/DangNhap";

// --- Import các component của Admin ---
import AdminLayout from "./components/Admin/Layout/AdminLayout";
import TongQuan from "./components/Admin/TongQuan/TongQuan";
import QuanLyNguoiDung from "./components/Admin/QuanLyNguoiDung/QuanLyNguoiDung";
import QuanLyHocPhan from "./components/Admin/QuanLyHocPhan/QuanLyHocPhan";
import TaoSuKienPhucKhao from "./components/Admin/TaoSukienPhucKhao/TaoSuKienPhucKhao";
import DuyetSuKienPhucKhao from "./components/Admin/DuyetSuKienPhucKhao/DuyetSuKienPhucKhao";
import CauHinhHeThong from "./components/Admin/CauHinhHeThong/CauHinhHeThong";

// --- Import các component của Chuyên viên khảo thí (CVKT) ---
import CVKTLayout from "./components/ChuyenVienKhaoThi/Layout/CVKTLayout";
import DashboardCVKT from "./components/ChuyenVienKhaoThi/dashboard/DashboardCVKT";
import QuanLyYeuCau from "./components/ChuyenVienKhaoThi/duyetxukien/QuanLyYeuCau";
import ChiTietHocPhanCVKT from "./components/ChuyenVienKhaoThi/duyetxukien/ChiTietHocPhan";
import ThongKe from "./components/ChuyenVienKhaoThi/thongke/ThongKe";

// --- Import các component của Trợ lý đào tạo (TLDT) ---
import TLDTLayout from "./components/TroLyDaoTao/Layout/TLDTLayout";
import TongQuanTLDT from "./components/TroLyDaoTao/tongquan/TongQuanTLDT";
import XuLyDon from "./components/TroLyDaoTao/xulydon/XuLyDon";
import KhoLuuTru from "./components/TroLyDaoTao/kholuutru/KhoLuuTru";
import ThongBaoTLDT from "./components/TroLyDaoTao/thongbao/ThongBaoTLDT";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Các route cho Sinh viên --- */}
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<Home />} />
        <Route path="/student/hosocanhan" element={<Home />} />
        <Route path="/student/nop-don" element={<Home />} />
        <Route path="/student/lich-su-don" element={<Home />} />
        <Route path="/student/chon-nganh-hoc" element={<Home />} />
        <Route path="/student/thanh-toan" element={<Home />} />
        <Route path="/student/thanh-toan/:requestId" element={<Home />} />
        <Route path="/student/chi-tiet-don/:requestId" element={<Home />} />

        {/* --- Route đăng nhập cho cán bộ --- */}
        <Route path="/canbo" element={<DangNhap />} />

        {/* --- Các route cho Admin --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<TongQuan />} />
          <Route path="tong-quan" element={<TongQuan />} />
          <Route path="quan-ly-nguoi-dung" element={<QuanLyNguoiDung />} />
          <Route path="quan-ly-hoc-phan" element={<QuanLyHocPhan />} />
          <Route path="tao-su-kien" element={<TaoSuKienPhucKhao />} />
          <Route path="duyet-su-kien" element={<DuyetSuKienPhucKhao />} />
          <Route path="cau-hinh-he-thong" element={<CauHinhHeThong />} />
        </Route>

        {/* --- Các route cho Chuyên viên khảo thí (CVKT) --- */}
        <Route path="/cvkt" element={<CVKTLayout />}>
          <Route index element={<DashboardCVKT />} />
          <Route path="dashboard" element={<DashboardCVKT />} />
          <Route path="quan-ly-yeu-cau" element={<QuanLyYeuCau />} />
          <Route
            path="quan-ly-yeu-cau/:courseId"
            element={<ChiTietHocPhanCVKT />}
          />
          <Route path="thong-ke" element={<ThongKe />} />
          <Route path="chon-nganh-hoc" element={<div />} />
        </Route>

        {/* --- Các route cho Trợ lý đào tạo (TLDT) --- */}
        <Route path="/tldt" element={<TLDTLayout />}>
          <Route index element={<TongQuanTLDT />} />
          <Route path="tong-quan" element={<TongQuanTLDT />} />
          <Route path="xu-ly-don" element={<XuLyDon />} />
          <Route path="xu-ly-don/:courseId" element={<XuLyDon />} />
          <Route path="kho-luu-tru" element={<KhoLuuTru />} />
          <Route path="thong-bao" element={<ThongBaoTLDT />} />
          <Route path="chon-nganh-hoc" element={<div />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
