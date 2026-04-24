import { useState } from 'react';
import useStudyStore from '../../store/useStudyStore';

export default function DailyQuote() {
  const { dailyQuote, streak, todayChecked, doCheckin } = useStudyStore();

  const handleCheckin = () => {
    if (!todayChecked) {
      const newStreak = doCheckin();
      alert(`🔥 打卡成功！已连续学习 ${newStreak} 天！`);
    }
  };

  return (
    <div className="daily-quote">
      <div className="quote-icon">
        <i className="fas fa-quote-left"></i>
      </div>
      <div className="quote-content">
        <p className="quote-text">💡 {dailyQuote}</p>
        <div className="quote-footer">
          <span className="quote-author">— 刘彬</span>
          <div className="checkin-area">
            <span className="streak-text">🔥 连续学习 {streak} 天</span>
            <button
              className={`checkin-btn${todayChecked ? ' done' : ''}`}
              onClick={handleCheckin}
              disabled={todayChecked}
            >
              <i className="fas fa-fire"></i>
              {todayChecked ? '今日已打卡' : '今日打卡'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
