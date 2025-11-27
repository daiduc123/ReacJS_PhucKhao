#!/bin/bash

# Script để chạy toàn bộ hệ thống PhucKhao
# Bao gồm: Database, Backend (Spring Boot), Frontend (React)

echo "=========================================="
echo "🚀 Khởi động hệ thống PhucKhao"
echo "=========================================="

# Màu sắc cho output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Kiểm tra MySQL
echo -e "${YELLOW}📊 Kiểm tra MySQL...${NC}"
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL chưa được cài đặt hoặc chưa có trong PATH${NC}"
    echo "Vui lòng cài đặt MySQL và đảm bảo MySQL service đang chạy"
    exit 1
fi

# Kiểm tra Java
echo -e "${YELLOW}☕ Kiểm tra Java...${NC}"
if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java chưa được cài đặt${NC}"
    echo "Vui lòng cài đặt Java 21 hoặc cao hơn"
    exit 1
fi

# Kiểm tra Node.js
echo -e "${YELLOW}📦 Kiểm tra Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js chưa được cài đặt${NC}"
    echo "Vui lòng cài đặt Node.js 16 hoặc cao hơn"
    exit 1
fi

# Kiểm tra Maven
echo -e "${YELLOW}🔨 Kiểm tra Maven...${NC}"
if ! command -v mvn &> /dev/null; then
    echo -e "${YELLOW}⚠️  Maven chưa được cài đặt, sẽ sử dụng Maven Wrapper${NC}"
fi

echo -e "${GREEN}✅ Tất cả dependencies đã sẵn sàng${NC}"
echo ""

# Kiểm tra database
echo -e "${YELLOW}📊 Kiểm tra database PhucKhao...${NC}"
DB_EXISTS=$(mysql -u root -e "SHOW DATABASES LIKE 'PhucKhao';" 2>/dev/null | grep PhucKhao)

if [ -z "$DB_EXISTS" ]; then
    echo -e "${YELLOW}⚠️  Database chưa tồn tại, đang import...${NC}"
    cd scripts
    ./import-database.sh root
    cd ..
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Không thể import database${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Database đã tồn tại${NC}"
fi

echo ""
echo -e "${GREEN}🚀 Đang khởi động Backend (Spring Boot)...${NC}"
cd FE/spring_src

# Sử dụng Maven Wrapper nếu có, nếu không dùng mvn
if [ -f "./mvnw" ]; then
    ./mvnw spring-boot:run > ../../logs/backend.log 2>&1 &
else
    mvn spring-boot:run > ../../logs/backend.log 2>&1 &
fi

BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
cd ../..

# Đợi backend khởi động
echo -e "${YELLOW}⏳ Đợi backend khởi động (30 giây)...${NC}"
sleep 30

# Kiểm tra backend có chạy không
if ! curl -s http://localhost:8080/api/admin/login > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Backend có thể chưa sẵn sàng, nhưng sẽ tiếp tục...${NC}"
fi

echo ""
echo -e "${GREEN}🚀 Đang khởi động Frontend (React + Vite)...${NC}"
cd FE/Reactjs

# Kiểm tra node_modules
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Đang cài đặt dependencies cho Frontend...${NC}"
    npm install
fi

npm run dev > ../../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
cd ../..

echo ""
echo -e "${GREEN}=========================================="
echo "✅ Hệ thống đã được khởi động!"
echo "==========================================${NC}"
echo ""
echo "📍 Backend API: http://localhost:8080"
echo "📍 Frontend: http://localhost:5173"
echo ""
echo "📝 Logs:"
echo "   - Backend: logs/backend.log"
echo "   - Frontend: logs/frontend.log"
echo ""
echo "🛑 Để dừng hệ thống, nhấn Ctrl+C hoặc chạy: ./stop.sh"
echo ""
echo "Đang mở trình duyệt..."
sleep 5

# Mở trình duyệt (Linux/Mac)
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:5173
elif command -v open &> /dev/null; then
    open http://localhost:5173
fi

# Giữ script chạy
wait



