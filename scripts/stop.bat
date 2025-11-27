@echo off
REM Script để dừng toàn bộ hệ thống PhucKhao cho Windows

echo ==========================================
echo 🛑 Dừng hệ thống PhucKhao
echo ==========================================

echo Đang tìm các process...

REM Kill Backend (Spring Boot trên port 8080)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080 ^| findstr LISTENING') do (
    echo Dừng Backend (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
    echo ✅ Backend đã dừng
)

REM Kill Frontend (Vite trên port 5173)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173 ^| findstr LISTENING') do (
    echo Dừng Frontend (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
    echo ✅ Frontend đã dừng
)

REM Kill các Java process liên quan đến Spring Boot
taskkill /F /IM java.exe /FI "WINDOWTITLE eq Backend*" >nul 2>&1

REM Kill các Node process liên quan đến Vite
taskkill /F /IM node.exe /FI "WINDOWTITLE eq Frontend*" >nul 2>&1

echo.
echo ✅ Đã dừng tất cả các service
pause


















