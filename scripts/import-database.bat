@echo off
REM Script để import database PhucKhao cho Windows
REM Sử dụng: import-database.bat [username] [password]

setlocal

set DB_USER=%1
if "%DB_USER%"=="" set DB_USER=root

set DB_PASS=%2
if "%DB_PASS%"=="" set DB_PASS=

set DB_NAME=PhucKhao
set SQL_FILE=..\database\phuc_khao.sql

echo ==========================================
echo Import Database PhucKhao
echo ==========================================
echo Database: %DB_NAME%
echo User: %DB_USER%
echo SQL File: %SQL_FILE%
echo ==========================================

REM Kiểm tra file SQL có tồn tại không
if not exist "%SQL_FILE%" (
    echo ❌ Lỗi: Không tìm thấy file %SQL_FILE%
    exit /b 1
)

REM Kiểm tra MySQL có sẵn không
where mysql >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Lỗi: MySQL client chưa được cài đặt
    echo Vui lòng cài đặt MySQL client hoặc sử dụng MySQL Workbench để import thủ công
    exit /b 1
)

echo Đang import database...
if "%DB_PASS%"=="" (
    mysql -u %DB_USER% ^< "%SQL_FILE%"
) else (
    mysql -u %DB_USER% -p%DB_PASS% ^< "%SQL_FILE%"
)

if %ERRORLEVEL% equ 0 (
    echo ✅ Import database thành công!
    echo Database '%DB_NAME%' đã được tạo và import dữ liệu.
) else (
    echo ❌ Lỗi khi import database
    echo Vui lòng kiểm tra:
    echo 1. MySQL đã được cài đặt và đang chạy
    echo 2. Username và password đúng
    echo 3. User có quyền tạo database
    exit /b 1
)

endlocal



