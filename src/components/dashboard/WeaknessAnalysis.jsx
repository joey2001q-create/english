const weaknessData = [
  { name: '词汇记忆', score: 40, level: 'mid', status: '进行中' },
  { name: '语法结构', score: 75, level: 'high', status: '已掌握' },
  { name: '完形填空', score: 25, level: 'low', status: '待提升' },
  { name: '听力理解', score: 55, level: 'mid', status: '进行中' },
];

export default function WeaknessAnalysis() {
  return (
    <div className="card">
      <div className="card-title">
        <i className="fas fa-chart-line"></i>
        薄弱点分析
      </div>
      <div className="weakness-grid">
        {weaknessData.map((item, idx) => (
          <div key={idx} className="weakness-item">
            <div className="weakness-header">
              <span className="weakness-name">{item.name}</span>
              <span className={`weakness-score score-${item.level}`}>
                {item.status}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill progress-${item.level}`}
                style={{ width: `${item.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="weakness-tip">
        <i className="fas fa-lightbulb"></i>
        <p>
          <strong>提示：</strong>完成练习后系统自动分析薄弱点，生成个性化学习建议。坚持使用，越学越精准！
        </p>
      </div>
    </div>
  );
}
