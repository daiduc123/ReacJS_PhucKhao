import React, { useState } from "react";

const TabThongBao = () => {
  const [formData, setFormData] = useState({
    title: "",
    audience: "all",
    content: "",
    sendEmail: true,
    sendInApp: true,
    emailTemplate: "default"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gọi API gửi thông báo
    // Sending notification...
    alert("Thông báo đã được gửi thành công!");
  };

  return (
    <div>
      <form className="AD_form" onSubmit={handleSubmit}>
        <h3>Cấu hình thông báo email cho sinh viên</h3>
        
        <div className="AD_form-group">
          <label htmlFor="title">Tiêu đề thông báo *</label>
          <input 
            type="text" 
            id="title" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ví dụ: Thông báo lịch phúc khảo học kỳ 1"
            required
          />
        </div>

        <div className="AD_form-group">
          <label htmlFor="audience">Đối tượng nhận thông báo *</label>
          <select 
            id="audience" 
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            required
          >
            <option value="all">Tất cả người dùng</option>
            <option value="student">Sinh viên</option>
            <option value="lecturer">Giảng viên</option>
            <option value="cvkt">Chuyên viên khảo thí</option>
            <option value="tldt">Trợ lý đào tạo</option>
          </select>
        </div>

        <div className="AD_form-group">
          <label htmlFor="content">Nội dung thông báo *</label>
          <textarea 
            id="content" 
            name="content"
            rows="8"
            value={formData.content}
            onChange={handleChange}
            placeholder="Nhập nội dung thông báo..."
            required
          />
        </div>

        <div className="AD_form-group">
          <label htmlFor="emailTemplate">Mẫu email</label>
          <select 
            id="emailTemplate" 
            name="emailTemplate"
            value={formData.emailTemplate}
            onChange={handleChange}
          >
            <option value="default">Mẫu mặc định</option>
            <option value="event">Thông báo sự kiện</option>
            <option value="reminder">Nhắc nhở</option>
            <option value="result">Kết quả phúc khảo</option>
          </select>
        </div>

        <div className="AD_form-group AD_form-checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="sendEmail"
              checked={formData.sendEmail}
              onChange={handleChange}
            />
            <span>Gửi thông báo qua email</span>
          </label>
          <label>
            <input 
              type="checkbox" 
              name="sendInApp"
              checked={formData.sendInApp}
              onChange={handleChange}
            />
            <span>Gửi thông báo trong ứng dụng</span>
          </label>
        </div>

        {formData.sendEmail && (
          <div className="AD_email-preview">
            <h4>Xem trước email:</h4>
            <div className="AD_preview-box">
              <p><strong>Tiêu đề:</strong> {formData.title || "(Chưa có tiêu đề)"}</p>
              <p><strong>Nội dung:</strong></p>
              <div className="AD_preview-content">
                {formData.content || "(Chưa có nội dung)"}
              </div>
            </div>
          </div>
        )}

        <div className="AD_form-actions" style={{ justifyContent: "flex-start", borderTop: "none", paddingTop: 0 }}>
          <button type="submit" className="AD_btn AD_btn-primary">
            Gửi thông báo
          </button>
          <button type="button" className="AD_btn AD_btn-secondary">
            Lưu nháp
          </button>
        </div>
      </form>
    </div>
  );
};

export default TabThongBao;
