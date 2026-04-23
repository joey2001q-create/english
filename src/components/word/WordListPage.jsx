import { useState, useMemo, useEffect } from 'react';
import useWordStore from '../../store/useWordStore';
import { getVocabularyBook, loadVocabularyData } from '../../data/vocabulary1000';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const mockWords = [
  { word: 'ability', phonetic: 'əˈbɪləti', type: 'n.', meaning: '能力；才能', highlight: [0, 1, 2, 3] },
  { word: 'about', phonetic: 'əˈbaʊt', type: 'prep./adv.', meaning: '关于；大约', highlight: [0, 1] },
  { word: 'apple', phonetic: 'ˈæpl', type: 'n.', meaning: '苹果', highlight: [0] },
  { word: 'banana', phonetic: 'bəˈnɑːnə', type: 'n.', meaning: '香蕉', highlight: [] },
  { word: 'cat', phonetic: 'kæt', type: 'n.', meaning: '猫', highlight: [] },
];

export default function WordListPage() {
  const { setMode, currentBook } = useWordStore();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const book = useMemo(() => getVocabularyBook(currentBook), [currentBook, dataLoaded]);
  const words = useMemo(() => book.words || [], [book]);
  
  const groupedWords = useMemo(() => {
    const groups = {};
    words.forEach(w => {
      const firstLetter = (w.word || '').charAt(0).toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(w);
    });
    return groups;
  }, [words]);

  const availableLetters = useMemo(() => {
    return ALPHABET.filter(letter => groupedWords[letter] && groupedWords[letter].length > 0);
  }, [groupedWords]);

  const currentWords = useMemo(() => {
    return groupedWords[selectedLetter] || [];
  }, [groupedWords, selectedLetter]);

  const totalWords = words.length;

  useEffect(() => {
    loadVocabularyData().then(() => setDataLoaded(true));
  }, []);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handleSpeedLearn = () => {
    setMode('study');
  };

  const handleStartLearn = () => {
    setMode('study');
  };

  const renderHighlightedWord = (word, highlightIndices) => {
    if (!highlightIndices || highlightIndices.length === 0) {
      return <span>{word}</span>;
    }
    return (
      <span>
        {word.split('').map((char, idx) => (
          <span 
            key={idx} 
            className={highlightIndices.includes(idx) ? 'word-highlight' : ''}
            style={highlightIndices.includes(idx) ? { color: idx % 2 === 0 ? '#FF6B35' : '#00B4D8' } : {}}
          >
            {char}
          </span>
        ))}
      </span>
    );
  };

  if (!dataLoaded) {
    return (
      <div className="word-list-page">
        <div className="word-list-loading">加载中...</div>
      </div>
    );
  }

  return (
    <div className="word-list-page">
      <div className="word-list-header">
        <button className="header-back-btn" onClick={() => setMode('cards')}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="header-title">{book.name || '词汇表'}</h1>
        <button className="header-more-btn" onClick={() => setShowMoreMenu(!showMoreMenu)}>
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>

      <div className="alphabet-bar">
        <div className="alphabet-scroll">
          {availableLetters.map((letter) => (
            <button
              key={letter}
              id={`letter-${letter}`}
              className={`alphabet-item ${selectedLetter === letter ? 'active' : ''}`}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      <div className="word-list-content">
        <div className="list-info-header">
          <span className="total-count">{currentWords.length}词</span>
          <button className="speed-learn-btn" onClick={handleSpeedLearn}>
            <i className="fas fa-bolt"></i>
            <span>极速刷词</span>
          </button>
        </div>

        <div className="word-cards-list">
          {currentWords.length > 0 ? currentWords.map((w, idx) => (
            <div key={idx} className="word-card-item">
              <button className="word-speak-btn">
                <i className="fas fa-volume-up"></i>
              </button>
              <div className="word-card-info">
                <div className="word-text">
                  {renderHighlightedWord(w.word, w.highlight)}
                </div>
                <div className="word-meaning">
                  {w.type && <span className="word-type">{w.type}</span>}
                  <span className="word-definition">{w.meaning}</span>
                </div>
              </div>
              <button className="word-detail-btn">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )) : (
            <div className="no-words-tip">
              <p>暂无 {selectedLetter} 开头的单词</p>
            </div>
          )}
        </div>
      </div>

      <div className="word-list-footer">
        <div className="footer-gradient"></div>
        <button className="start-learn-btn" onClick={handleStartLearn}>
          去背单词
        </button>
      </div>
    </div>
  );
}
