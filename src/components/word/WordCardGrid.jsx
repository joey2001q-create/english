import useWordStore from '../../store/useWordStore';

const subCards = [
  { key: 'listen', icon: '📻', title: '单词随身听', desc: '通勤/睡前循环播放，碎片时间高效复习', tag: 'TTS播放' },
  { key: 'fill', icon: '📄', title: '短文填词', desc: '语境还原练习，告别翻译式背词，用英文思维匹配', tag: '语境能力' },
  { key: 'story', icon: '🎭', title: '个性剧场', desc: 'AI用王者荣耀/三体故事把生词变活，加深情感记忆', tag: '词文串学' },
  { key: 'favorite', icon: '⭐', title: '收藏夹', desc: '收藏喜欢的单词，随时复习巩固', tag: '个人收藏' },
];

export default function WordCardGrid() {
  const { setMode, currentBook, vocabularyBooks } = useWordStore();
  const currentBookData = vocabularyBooks.find(b => b.key === currentBook);

  const handleWordListClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMode('wordlist');
  };

  const handleStudyClick = (e) => {
    e.stopPropagation();
    setMode('study');
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    setMode('settings');
  };

  return (
    <div className="word-cards-container">
      <div className="word-cards-main">
        <div className="word-card word-card-main" onClick={handleStudyClick}>
          <div className="main-card-header">
            <button type="button" className="book-name-btn" onClick={handleBookClick}>
              {currentBookData?.icon} {currentBookData?.name}
            </button>
            <button
              type="button"
              className="word-list-badge"
              onClick={handleWordListClick}
            >
              词表
            </button>
          </div>
          <div className="word-card-icon">🔗</div>
          <h3>单词速记</h3>
          <p>用谐音，词根，例句，出题等多维闭环记忆</p>
          <div className="word-card-tag">核心学习</div>
        </div>
      </div>
      <div className="word-cards-sub">
        {subCards.map((card) => (
          <div key={card.key} className="word-card" onClick={() => setMode(card.key)}>
            <div className="word-card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <div className="word-card-tag">{card.tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
