#!/bin/bash

# Script để dừng toàn bộ hệ thống PhucKhao

echo "=========================================="
echo "🛑 Dừng hệ thống PhucKhao"
echo "=========================================="

# Tìm và kill các process
echo "Đang tìm các process..."

# Kill Backend (Spring Boot trên port 8080)
BACKEND_PID=$(lsof -ti:8080 2>/dev/null)
if [ ! -z "$BACKEND_PID" ]; then
    echo "Dừng Backend (PID: $BACKEND_PID)..."
    kill $BACKEND_PID
    echo "✅ Backend đã dừng"
else
    echo "⚠️  Không tìm thấy Backend process"
fi

# Kill Frontend (Vite trên port 5173)
FRONTEND_PID=$(lsof -ti:5173 2>/dev/null)
if [ ! -z "$FRONTEND_PID" ]; then
    echo "Dừng Frontend (PID: $FRONTEND_PID)..."
    kill $FRONTEND_PID
    echo "✅ Frontend đã dừng"
else
    echo "⚠️  Không tìm thấy Frontend process"
fi

# Kill các Java process liên quan đến Spring Boot
JAVA_PIDS=$(pgrep -f "spring-boot:run" 2>/dev/null)
if [ ! -z "$JAVA_PIDS" ]; then
    echo "Dừng các Java process liên quan..."
    kill $JAVA_PIDS
fi

# Kill các Node process liên quan đến Vite
NODE_PIDS=$(pgrep -f "vite" 2>/dev/null)
if [ ! -z "$NODE_PIDS" ]; then
    echo "Dừng các Node process liên quan..."
    kill $NODE_PIDS
fi

echo ""
echo "✅ Đã dừng tất cả các service"


















