@echo off
REM Script để chạy toàn bộ hệ thống PhucKhao cho Windows
REM Bao gồm: Database, Backend (Spring Boot), Frontend (React)

echo ==========================================
echo 🚀 Khởi động hệ thống PhucKhao
echo ==========================================

REM Kiểm tra MySQL
echo 📊 Kiểm tra MySQL...
where mysql >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ MySQL chưa được cài đặt hoặc chưa có trong PATH
    echo Vui lòng cài đặt MySQL và đảm bảo MySQL service đang chạy
    pause
    exit /b 1
)

REM Kiểm tra Java
echo ☕ Kiểm tra Java...
where java >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Java chưa được cài đặt
    echo Vui lòng cài đặt Java 21 hoặc cao hơn
    pause
    exit /b 1
)

REM Kiểm tra Node.js
echo 📦 Kiểm tra Node.js...
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js chưa được cài đặt
    echo Vui lòng cài đặt Node.js 16 hoặc cao hơn
    pause
    exit /b 1
)

REM Kiểm tra Maven
echo 🔨 Kiểm tra Maven...
where mvn >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ⚠️  Maven chưa được cài đặt, sẽ sử dụng Maven Wrapper
)

echo ✅ Tất cả dependencies đã sẵn sàng
echo.

REM Kiểm tra database
echo 📊 Kiểm tra database PhucKhao...
mysql -u root -e "SHOW DATABASES LIKE 'PhucKhao';" >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ⚠️  Database chưa tồn tại, đang import...
    cd scripts
    call import-database.bat root
    cd ..
    if %ERRORLEVEL% neq 0 (
        echo ❌ Không thể import database
        pause
        exit /b 1
    )
) else (
    echo ✅ Database đã tồn tại
)

echo.
echo 🚀 Đang khởi động Backend (Spring Boot)...
cd ..\spring_src

REM Sử dụng Maven Wrapper nếu có, nếu không dùng mvn
if exist "mvnw.cmd" (
    start "Backend" cmd /c "mvnw.cmd spring-boot:run"
) else (
    start "Backend" cmd /c "mvn spring-boot:run"
)

cd ..\..

REM Đợi backend khởi động
echo ⏳ Đợi backend khởi động (30 giây)...
timeout /t 30 /nobreak >nul

echo.
echo 🚀 Đang khởi động Frontend (React + Vite)...
cd ..\Reactjs

REM Kiểm tra node_modules
if not exist "node_modules" (
    echo 📦 Đang cài đặt dependencies cho Frontend...
    call npm install
)

start "Frontend" cmd /c "npm run dev"

cd ..\..

echo.
echo ==========================================
echo ✅ Hệ thống đã được khởi động!
echo ==========================================
echo.
echo 📍 Backend API: http://localhost:8080
echo 📍 Frontend: http://localhost:5173
echo.
echo 🛑 Để dừng hệ thống, chạy: stop.bat
echo.
echo Đang mở trình duyệt...
timeout /t 5 /nobreak >nul
start http://localhost:5173

pause

