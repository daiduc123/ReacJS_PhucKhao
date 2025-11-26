import React, { useState, useEffect } from "react";
import "./TabThoiGianPhucKhao.css";

const TabThoiGianPhucKhao = () => {
  const [timeConfig, setTimeConfig] = useState({
    student: {
      submitDays: 15,
      waitDays: 0 // Sẽ được tính tự động
    },
    specialist: {
      approveDays: 3,
      checkScoreDays: 3
    },
    assistant: {
      searchDays: 3,
      enterScoreDays: 7
    }
  });

  const [totalDays, setTotalDays] = useState(0);
  const [waitDays, setWaitDays] = useState(0);

  // Tính thời gian chờ đợi tự động = tổng thời gian của chuyên viên + trợ lý
  useEffect(() => {
    const calculatedWaitDays = 
      timeConfig.specialist.approveDays +
      timeConfig.specialist.checkScoreDays +
      timeConfig.assistant.searchDays +
      timeConfig.assistant.enterScoreDays;
    setWaitDays(calculatedWaitDays);
    
    // Cập nhật vào state
    setTimeConfig(prev => ({
      ...prev,
      student: {
        ...prev.student,
        waitDays: calculatedWaitDays
      }
    }));
  }, [timeConfig.specialist.approveDays, timeConfig.specialist.checkScoreDays, 
      timeConfig.assistant.searchDays, timeConfig.assistant.enterScoreDays]);

  useEffect(() => {
    // Tính tổng thời gian: nộp đơn + duyệt đơn + kiểm tra điểm + tìm hồ sơ + nhập điểm (KHÔNG tính thời gian chờ kết quả)
    const total = 
      timeConfig.student.submitDays +
      timeConfig.specialist.approveDays +
      timeConfig.specialist.checkScoreDays +
      timeConfig.assistant.searchDays +
      timeConfig.assistant.enterScoreDays;
    setTotalDays(total);
  }, [timeConfig.student.submitDays, timeConfig.specialist, timeConfig.assistant]);

  const handleChange = (role, field, value) => {
    setTimeConfig(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: parseInt(value) || 0
      }
    }));
  };

  return (
    <div>
      <h3>Cấu hình thời gian phúc khảo</h3>
      <div className="AD_timeline-cards">
        <div className="AD_timeline-card AD_card-student">
          <h4>Sinh viên</h4>
          <div className="AD_form-group">
            <label>Thời gian nộp đơn phúc khảo</label>
            <div className="AD_input-with-suffix">
              <input 
                type="number" 
                value={timeConfig.student.submitDays}
                onChange={(e) => handleChange('student', 'submitDays', e.target.value)}
                min="0"
              />
              <span>ngày sau khi có kết quả</span>
            </div>
          </div>
          <div className="AD_form-group">
            <label>Thời gian chờ kết quả</label>
            <div className="AD_input-with-suffix">
              <input 
                type="number" 
                value={waitDays}
                readOnly
                disabled
                className="AD_input-readonly"
                title="Tự động tính từ tổng thời gian của Chuyên viên khảo thí và Trợ lý đào tạo"
              />
              <span>ngày làm việc</span>
            </div>
            <div className="AD_calculation-note">
              = {timeConfig.specialist.approveDays} (duyệt đơn) + {timeConfig.specialist.checkScoreDays} (kiểm tra điểm) + {timeConfig.assistant.searchDays} (tìm hồ sơ) + {timeConfig.assistant.enterScoreDays} (nhập điểm)
            </div>
          </div>
        </div>
        <div className="AD_timeline-card AD_card-specialist">
          <h4>Chuyên viên khảo thí</h4>
          <div className="AD_form-group">
            <label>Thời gian duyệt đơn</label>
            <div className="AD_input-with-suffix">
              <input 
                type="number" 
                value={timeConfig.specialist.approveDays}
                onChange={(e) => handleChange('specialist', 'approveDays', e.target.value)}
                min="0"
              />
              <span>ngày làm việc</span>
            </div>
          </div>
          <div className="AD_form-group">
            <label>Thời gian kiểm tra điểm sau phúc khảo</label>
            <div className="AD_input-with-suffix">
              <input 
                type="number" 
                value={timeConfig.specialist.checkScoreDays}
                onChange={(e) => handleChange('specialist', 'checkScoreDays', e.target.value)}
                min="0"
              />
              <span>ngày làm việc</span>
            </div>
          </div>
        </div>
        <div className="AD_timeline-card AD_card-assistant">
          <h4>Trợ lý đào tạo</h4>
          <div className="AD_form-group">
            <label>Thời gian tìm kiếm hồ sơ</label>
            <div className="AD_input-with-suffix">
              <input 
                type="number" 
                value={timeConfig.assistant.searchDays}
                onChange={(e) => handleChange('assistant', 'searchDays', e.target.value)}
                min="0"
              />
              <span>ngày làm việc</span>
            </div>
          </div>
          <div className="AD_form-group">
            <label>Thời gian nhập điểm sau phúc khảo</label>
            <div className="AD_input-with-suffix">
              <input 
                type="number" 
                value={timeConfig.assistant.enterScoreDays}
                onChange={(e) => handleChange('assistant', 'enterScoreDays', e.target.value)}
                min="0"
              />
              <span>ngày làm việc</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tổng thời gian */}
      <div className="AD_total-time-box">
        <div className="AD_total-time-content">
          <h4>Tổng thời gian hoàn thành 1 đơn phúc khảo</h4>
          <div className="AD_total-time-value">
            <span className="AD_total-days">{totalDays}</span>
            <span className="AD_total-label">ngày làm việc</span>
          </div>
          <div className="AD_total-breakdown">
            <span>Sinh viên: {timeConfig.student.submitDays + waitDays} ngày ({timeConfig.student.submitDays} nộp đơn + {waitDays} chờ kết quả)</span>
            <span> • </span>
            <span>Chuyên viên: {timeConfig.specialist.approveDays + timeConfig.specialist.checkScoreDays} ngày</span>
            <span> • </span>
            <span>Trợ lý: {timeConfig.assistant.searchDays + timeConfig.assistant.enterScoreDays} ngày</span>
          </div>
        </div>
      </div>

      <div
        className="AD_form-actions"
        style={{
          justifyContent: "flex-start",
          borderTop: "none",
          paddingTop: "20px",
        }}
      >
        <button type="button" className="AD_btn AD_btn-primary">
          Cập nhật cấu hình
        </button>
      </div>
    </div>
  );
};
export default TabThoiGianPhucKhao;
