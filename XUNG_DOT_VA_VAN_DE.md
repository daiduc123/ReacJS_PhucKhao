# Xung Đột và Vấn Đề Cần Xử Lý

## 📋 Tổng Quan

File này ghi lại các xung đột và vấn đề phát hiện được khi kiểm tra hệ thống dựa trên `spring_src` làm chuẩn.

---

## ✅ Đã Sửa

### 1. Đường dẫn trong Scripts

- **Vấn đề**: Scripts tham chiếu `FE/spring_src`, `FE/Reactjs`, `FE/database` nhưng cấu trúc thực tế là `spring_src`, `Reactjs`, `database` ở root
- **Đã sửa**:
  - `scripts/start.sh`: Sửa `FE/spring_src` → `../spring_src`, `FE/Reactjs` → `../Reactjs`
  - `scripts/start.bat`: Sửa `FE\spring_src` → `..\spring_src`, `FE\Reactjs` → `..\Reactjs`
  - `scripts/import-database.sh`: Sửa `../FE/database/phuc_khao.sql` → `../database/phuc_khao.sql`
  - `scripts/import-database.bat`: Sửa `..\FE\database\phuc_khao.sql` → `..\database\phuc_khao.sql`

### 2. File Cấu Hình Spring Boot

- **Vấn đề**: Thiếu file `application.properties` cho Spring Boot
- **Đã sửa**: Tạo file `spring_src/src/main/resources/application.properties` với các cấu hình cần thiết:
  - Database connection (MySQL)
  - JPA/Hibernate settings
  - File upload configuration
  - CORS configuration
  - Logging configuration
  - Mail configuration (template)
  - JWT configuration (template)

---

## ⚠️ Xung Đột và Vấn Đề Cần Xử Lý Thủ Công

### 1. Cấu Trúc Spring Boot Không Chuẩn ✅ ĐÃ SỬA

**Vấn đề**:

- Các file Java nằm trực tiếp trong `spring_src/` thay vì `spring_src/src/main/java/com/example/demo/`

**Đã sửa**:

- ✅ Đã di chuyển tất cả các file Java vào `src/main/java/com/example/demo/`
- ✅ Đã cập nhật `pom.xml` để chỉ định main class: `com.example.demo.Phuckhao1Application`
- ✅ Cấu trúc hiện tại đã đúng chuẩn Maven:
  ```
  spring_src/
    └── src/
      ├── main/
      │   ├── java/
      │   │   └── com/example/demo/
      │   │       ├── Phuckhao1Application.java
      │   │       ├── config/
      │   │       ├── controller/
      │   │       ├── entity/
      │   │       ├── repository/
      │   │       ├── service/
      │   │       ├── request/
      │   │       └── response/
      │   └── resources/
      │       ├── application.properties
      │       └── application-test.properties
      └── test/
  ```

---

### 2. Thư Mục Test Trống

**Vấn đề**:

- Thư mục `spring_src/src/test/java/service/` tồn tại nhưng trống

**Giải pháp**:

- Xóa thư mục trống hoặc thêm test files nếu cần

---

### 3. Cấu Hình Database

**Vấn đề**:

- File `application.properties` có cấu hình database mặc định:
  - `spring.datasource.username=root`
  - `spring.datasource.password=` (trống)

**Cần kiểm tra**:

- Đảm bảo MySQL đang chạy
- Kiểm tra username/password database có đúng không
- Kiểm tra database `PhucKhao` đã được tạo chưa

---

### 4. JWT Secret Key

**Vấn đề**:

- JWT secret key trong `application.properties` là giá trị mặc định: `your-secret-key-change-this-in-production`

**Cần thay đổi**:

- Thay đổi JWT secret key thành giá trị an toàn trong production

---

### 5. Mail Configuration

**Vấn đề**:

- Mail configuration trong `application.properties` chưa được điền:
  - `spring.mail.username=`
  - `spring.mail.password=`

**Cần điền**:

- Nếu hệ thống cần gửi email, cần cấu hình mail server

---

### 6. .gitignore Có Tham Chiếu FE/

**Vấn đề**:

- File `.gitignore` vẫn có tham chiếu đến `FE/`:
  - `FE/node_modules/`
  - `FE/dist/`
  - `FE/build/`

**Giải pháp**:

- Có thể giữ nguyên (không ảnh hưởng) hoặc xóa các dòng này nếu không cần

---

## 🔍 Kiểm Tra Bổ Sung

### 1. Package Structure

- Tất cả các file Java đều sử dụng package `com.example.demo` - **OK**
- Cần đảm bảo Maven có thể compile được với cấu trúc hiện tại

### 2. Frontend (React)

- Cấu trúc React trong `Reactjs/` có vẻ ổn
- API client đã được cấu hình đúng (`http://localhost:8080/api`)
- Vite proxy đã được cấu hình đúng

### 3. Giao Diện Người Dùng

- **Sinh viên**: Các component trong `Reactjs/src/components/SinhVien/` - **Giữ nguyên**
- **Trợ lý**: Các component trong `Reactjs/src/components/TroLyDaoTao/` - **Giữ nguyên**
- **Chuyên viên**: Các component trong `Reactjs/src/components/ChuyenVienKhaoThi/` - **Giữ nguyên**
- **Admin**: Các component trong `Reactjs/src/components/Admin/` - **Giữ nguyên**

---

## 📝 Hướng Dẫn Chạy Dự Án

### Yêu Cầu

- Java 21+
- Node.js 16+
- MySQL
- Maven (hoặc Maven Wrapper)

### Các Bước

1. Import database: `scripts/import-database.bat` (Windows) hoặc `scripts/import-database.sh` (Linux/Mac)
2. Cấu hình `application.properties` nếu cần (database password, JWT secret, mail config)
3. Chạy hệ thống: `scripts/start.bat` (Windows) hoặc `scripts/start.sh` (Linux/Mac)

---

## 🎯 Ưu Tiên Xử Lý

1. **Cao**: Kiểm tra và sửa cấu trúc Spring Boot (nếu cần)
2. **Cao**: Cấu hình database password trong `application.properties`
3. **Trung bình**: Thay đổi JWT secret key
4. **Trung bình**: Xóa thư mục test trống
5. **Thấp**: Cấu hình mail (nếu cần)
6. **Thấp**: Dọn dẹp `.gitignore`

---

## 📌 Lưu Ý

- Tất cả các giao diện của Sinh viên, Trợ lý, Chuyên viên, và Admin đã được giữ nguyên
- Các script đã được sửa để phù hợp với cấu trúc thư mục hiện tại
- File `application.properties` đã được tạo với các cấu hình mặc định, cần điều chỉnh theo môi trường thực tế
