# Hệ thống Quản lý Phúc khảo - NCKH

## Tổng quan dự án

Hệ thống quản lý phúc khảo được xây dựng để quản lý toàn bộ quy trình phúc khảo điểm thi của sinh viên, từ khi nộp đơn đến khi hoàn tất nhập điểm vào hệ thống.

## Các vai trò trong hệ thống

1. **Sinh viên (SV)**: Nộp đơn phúc khảo, xem lịch sử, thanh toán phí
2. **Chuyên viên khảo thí (CVKT)**: Quản lý yêu cầu, chuyển đơn, xác nhận kết quả
3. **Trợ lý đào tạo (TLĐT)**: Tìm kiếm bài thi, xuất Excel, nhập điểm phúc khảo
4. **Phòng Đào tạo (PĐT)**: Nhập điểm cuối cùng vào hệ thống
5. **Admin**: Quản lý người dùng, học phần, sự kiện phúc khảo, cấu hình hệ thống

## Cấu trúc dự án

### Frontend (React + Vite)

```
FE/
├── src/
│   ├── components/
│   │   ├── Admin/              # Module Admin
│   │   ├── SinhVien/           # Module Sinh viên
│   │   │   ├── phuckhao/       # Các component phúc khảo
│   │   │   │   ├── NopDonPhucKhao.jsx
│   │   │   │   ├── LichSuDon.jsx
│   │   │   │   ├── ThanhToan.jsx
│   │   │   │   └── ChiTietDon.jsx
│   │   ├── ChuyenVienKhaoThi/  # Module CVKT
│   │   │   ├── dashboard/
│   │   │   ├── duyetxukien/
│   │   │   ├── thongke/
│   │   │   └── Layout/
│   │   ├── TroLyDaoTao/        # Module TLĐT
│   │   │   ├── dashboard/
│   │   │   ├── xulydon/
│   │   │   ├── kholuutru/
│   │   │   └── Layout/
│   │   └── PhongDaoTao/        # Module PĐT
│   │       ├── dashboard/
│   │       └── Layout/
│   ├── services/
│   │   ├── mockApi.js          # API mock cho đăng nhập
│   │   ├── adminApiService.js  # API service cho Admin
│   │   └── phuckhaoApiService.js # API service cho phúc khảo
│   ├── contexts/
│   │   └── AuthContext.jsx     # Context quản lý authentication
│   └── App.jsx                 # Routing chính
```

## Quy trình nghiệp vụ

### 1. Sinh viên nộp đơn
- SV đăng nhập và chọn học phần muốn phúc khảo
- Hệ thống kiểm tra thời hạn (15 ngày sau khi công bố điểm)
- SV nộp đơn và thanh toán phí phúc khảo

### 2. CVKT xử lý
- CVKT xem danh sách đơn theo học phần
- Sau khi hết hạn nộp đơn, CVKT chuyển đơn đến TLĐT
- Khi nhận kết quả từ TLĐT, CVKT xác nhận và chuyển đến PĐT

### 3. TLĐT xử lý
- TLĐT nhận đơn từ CVKT
- Tìm kiếm bài thi trong kho lưu trữ
- Xuất file Excel và gửi cho Giảng viên chấm lại
- Nhập điểm phúc khảo và gửi về CVKT

### 4. PĐT hoàn tất
- PĐT nhận đơn từ CVKT
- Nhập điểm vào hệ thống đào tạo chính thức
- Xác nhận hoàn tất

## Các tính năng chính

### Module Sinh viên
- ✅ Nộp đơn phúc khảo
- ✅ Xem lịch sử đơn
- ✅ Thanh toán phí phúc khảo
- ✅ Xem chi tiết đơn

### Module Chuyên viên khảo thí
- ✅ Dashboard với thống kê
- ✅ Quản lý yêu cầu phúc khảo
- ✅ Xem chi tiết học phần
- ✅ Chuyển đơn đến TLĐT
- ✅ Chuyển đơn đến PĐT
- ✅ Thống kê

### Module Trợ lý đào tạo
- ✅ Dashboard
- ✅ Xử lý đơn phúc khảo
- ✅ Tìm kiếm bài thi
- ✅ Xuất file Excel
- ✅ Nhập điểm phúc khảo
- ✅ Kho lưu trữ

### Module Phòng Đào tạo
- ✅ Dashboard
- ✅ Xem danh sách đơn chờ nhập điểm
- ✅ Hoàn tất nhập điểm

### Module Admin
- ✅ Quản lý người dùng
- ✅ Quản lý học phần
- ✅ Tạo sự kiện phúc khảo
- ✅ Duyệt sự kiện
- ✅ Cấu hình hệ thống

## Cài đặt và chạy dự án

### Yêu cầu
- Node.js >= 16
- npm hoặc yarn

### Cài đặt
```bash
cd FE
npm install
```

### Chạy development server
```bash
npm run dev
```

### Build production
```bash
npm run build
```

## Tài khoản mẫu

### Admin
- Username: `admin`, Password: `123`
- Username: `admin02`, Password: `111111`
- Username: `admin03`, Password: `111`

### Chuyên viên khảo thí
- Username: `cvkt01` đến `cvkt05`, Password: `111`

### Trợ lý đào tạo
- Username: `tldt01` đến `tldt05`, Password: `111`

### Sinh viên
- Username: `sv01` đến `sv15`, Password: `111`

## Công nghệ sử dụng

- **React 19**: UI framework
- **React Router DOM 7**: Routing
- **Vite**: Build tool
- **Axios**: HTTP client (đã cài đặt, sẵn sàng cho backend)
- **React Icons**: Icon library

## Ghi chú

- Hiện tại hệ thống sử dụng mock API. Khi tích hợp backend thật, chỉ cần thay thế các hàm trong `services/` bằng API calls thực tế.
- Tất cả dữ liệu được lưu trong memory, sẽ mất khi refresh trang. Cần tích hợp backend để lưu trữ dữ liệu.

## Cải tiến có thể thêm

1. Thêm validation form đầy đủ
2. Thêm loading states và error handling tốt hơn
3. Thêm pagination cho các danh sách dài
4. Thêm export Excel/PDF
5. Thêm thông báo real-time
6. Thêm phân quyền chi tiết hơn
7. Thêm audit log
8. Thêm responsive design tốt hơn cho mobile





















