import { useState, useEffect } from 'react';

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('liubin_records') || '[]');
      setRecords(saved.slice(0, 10));
    } catch (e) {
      setRecords([]);
    }
  }, []);

  if (records.length === 0) {
    return (
      <div className="card">
        <div className="card-title">
          <i className="fas fa-history"></i>
          最近学习记录
        </div>
        <div className="record-list">
          <div className="record-item">
            <div className="record-item-title">暂无学习记录</div>
            <div className="record-item-footer">
              <span className="record-time">开始学习后自动记录</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-title">
        <i className="fas fa-history"></i>
        最近学习记录
      </div>
      <div className="record-list">
        {records.map((rec, idx) => (
          <div key={idx} className="record-item">
            <div className="record-item-title">{rec.title}</div>
            <div className="record-item-footer">
              <span className="record-time">{rec.time}</span>
              <span className="record-badge">{rec.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
