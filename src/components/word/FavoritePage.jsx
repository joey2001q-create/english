import { useState, useMemo } from 'react';
import useWordStore from '../../store/useWordStore';

export default function FavoritePage() {
  const { setMode, favoriteWords, removeFavoriteWord } = useWordStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWords = useMemo(() => {
    if (!searchTerm) return favoriteWords || [];
    return (favoriteWords || []).filter(w => 
      w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.meaning?.includes(searchTerm)
    );
  }, [favoriteWords, searchTerm]);

  const handleRemove = (word) => {
    if (confirm(`确定要移除 "${word}" 吗？`)) {
      removeFavoriteWord(word);
    }
  };

  const handleSpeak = (word) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
      }, 100);
    }
  };

  return (
    <div className="favorite-page">
      <div className="favorite-header">
        <button className="back-btn" onClick={() => setMode('cards')}>← 返回</button>
        <h2 className="page-title">⭐ 我的收藏</h2>
      </div>

      <div className="favorite-search">
        <input
          type="text"
          placeholder="搜索单词..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="favorite-stats">
        <span className="stats-text">共 {filteredWords.length} 个收藏单词</span>
      </div>

      {filteredWords.length > 0 ? (
        <div className="favorite-list">
          {filteredWords.map((item, idx) => (
            <div key={idx} className="favorite-card">
              <div className="favorite-card-header">
                <div className="word-info">
                  <span className="word-text">{item.word}</span>
                  {item.phonetic && <span className="word-phonetic">/{item.phonetic}/</span>}
                </div>
                <div className="word-actions">
                  <button className="speak-btn" onClick={() => handleSpeak(item.word)}>🔊</button>
                  <button className="remove-btn" onClick={() => handleRemove(item.word)}>✕</button>
                </div>
              </div>
              <div className="favorite-card-body">
                {item.type && <span className="word-type">{item.type}</span>}
                <span className="word-meaning">{item.meaning}</span>
              </div>
              {item.example && (
                <div className="favorite-card-example">
                  <p className="example-text">{item.example}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p className="empty-text">
            {searchTerm ? '没有找到匹配的单词' : '还没有收藏任何单词'}
          </p>
          {!searchTerm && (
            <button className="go-study-btn" onClick={() => setMode('study')}>
              去学习单词
            </button>
          )}
        </div>
      )}
    </div>
  );
}
