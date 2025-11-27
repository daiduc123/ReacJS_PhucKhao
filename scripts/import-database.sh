#!/bin/bash

# Script để import database PhucKhao
# Sử dụng: ./import-database.sh [username] [password]

DB_USER=${1:-root}
DB_PASS=${2:-}
DB_NAME="PhucKhao"
SQL_FILE="../FE/database/phuc_khao.sql"

echo "=========================================="
echo "Import Database PhucKhao"
echo "=========================================="
echo "Database: $DB_NAME"
echo "User: $DB_USER"
echo "SQL File: $SQL_FILE"
echo "=========================================="

# Kiểm tra file SQL có tồn tại không
if [ ! -f "$SQL_FILE" ]; then
    echo "❌ Lỗi: Không tìm thấy file $SQL_FILE"
    exit 1
fi

# Kiểm tra MySQL có sẵn không
if ! command -v mysql &> /dev/null; then
    echo "❌ Lỗi: MySQL client chưa được cài đặt"
    echo "Vui lòng cài đặt MySQL client hoặc sử dụng MySQL Workbench để import thủ công"
    exit 1
fi

echo "Đang import database..."
if [ -z "$DB_PASS" ]; then
    mysql -u "$DB_USER" < "$SQL_FILE"
else
    mysql -u "$DB_USER" -p"$DB_PASS" < "$SQL_FILE"
fi

if [ $? -eq 0 ]; then
    echo "✅ Import database thành công!"
    echo "Database '$DB_NAME' đã được tạo và import dữ liệu."
else
    echo "❌ Lỗi khi import database"
    echo "Vui lòng kiểm tra:"
    echo "1. MySQL đã được cài đặt và đang chạy"
    echo "2. Username và password đúng"
    echo "3. User có quyền tạo database"
    exit 1
fi



