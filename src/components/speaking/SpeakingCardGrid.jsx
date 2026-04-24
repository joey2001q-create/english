import useSpeakingStore from '../../store/useSpeakingStore';

const cards = [
  { key: 'pron', icon: '🔊', title: '发音纠错', desc: '音标级纠错，逐音节标注发音问题，对比教学 tongue position', tag: '音标教学' },
  { key: 'scenario', icon: '🎭', title: '情境模拟', desc: '伦敦问路/点餐/购物...5轮真实对话，告别"哑巴英语"', tag: '突破开口难' },
  { key: 'exam', icon: '📋', title: '考试模拟舱', desc: '中高考口语人机对话全真模拟，朗读短文+情景问答', tag: '备考冲刺' },
];

export default function SpeakingCardGrid() {
  const setMode = useSpeakingStore((s) => s.setMode);

  return (
    <div className="speaking-cards-grid">
      {cards.map((card) => (
        <div
          key={card.key}
          className="speaking-card"
          onClick={() => setMode(card.key)}
        >
          <div className="speaking-card-icon">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
          <div className="speaking-card-tag">{card.tag}</div>
        </div>
      ))}
    </div>
  );
}
