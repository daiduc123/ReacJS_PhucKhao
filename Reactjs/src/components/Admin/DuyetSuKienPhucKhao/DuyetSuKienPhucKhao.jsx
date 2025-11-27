import React from "react";
// Import CSS chung
import "./DuyetSuKienPhucKhao.css";

const DuyetSuKienPhucKhao = () => {
  return (
    <div className="AD_container">
      <h1 className="AD_page-title">Duyệt sự kiện phúc khảo</h1>
      <div className="AD_toolbar">
        {/* Bộ lọc theo trạng thái (Đang chờ, Đã duyệt, Đã đóng) */}
      </div>
      <div className="AD_table-container">
        <table className="AD_table">
          <thead>
            <tr>
              <th>Tên sự kiện</th>
              <th>Học kỳ</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {/* Dữ liệu sẽ được map ở đây */}
            <tr>
              <td>Phúc khảo HK2 2025-2026</td>
              <td>Học kỳ 2</td>
              <td>24/09/2025 - 24/11/2025</td>
              <td>Đang chờ duyệt</td>
              <td className="AD_actions">
                <button>Xem chi tiết</button>
                <button>Duyệt</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DuyetSuKienPhucKhao;
