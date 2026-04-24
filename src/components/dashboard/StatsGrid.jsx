import useStudyStore from '../../store/useStudyStore';

export default function StatsGrid() {
  const { todayWords, totalWords, totalQA } = useStudyStore();

  const stats = [
    {
      label: '今日学习',
      value: todayWords,
      desc: '个单词已收录',
      icon: 'fa-clock',
      color: 'blue',
    },
    {
      label: '做题正确率',
      value: '--',
      desc: '暂无数据',
      icon: 'fa-check-double',
      color: 'green',
    },
    {
      label: '已掌握单词',
      value: totalWords,
      desc: '个核心词汇',
      icon: 'fa-star',
      color: 'orange',
    },
    {
      label: '累计提问',
      value: totalQA,
      desc: '次AI答疑',
      icon: 'fa-comment-dots',
      color: 'red',
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item, idx) => (
        <div key={idx} className="stats-card">
          <div className="stats-card-top">
            <h4>{item.label}</h4>
            <div className={`stats-icon ${item.color}`}>
              <i className={`fas ${item.icon}`}></i>
            </div>
          </div>
          <div className="num">{item.value}</div>
          <div className="desc">{item.desc}</div>
        </div>
      ))}
    </div>
  );
}
