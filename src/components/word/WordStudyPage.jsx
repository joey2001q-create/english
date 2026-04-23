import { useState, useEffect, useRef } from 'react';
import useWordStore from '../../store/useWordStore';
import useStudyStore from '../../store/useStudyStore';
import { getVocabularyBook, loadVocabularyData } from '../../data/vocabulary1000';
import { splitSyllables, splitPhonemes } from '../../utils/wordSplit';

const STAGES = [
  { key: 'learn', label: '学' },
  { key: 'read', label: '读' },
  { key: 'practice', label: '练' },
  { key: 'spell', label: '拼' },
  { key: 'dictate', label: '默' },
];

const SORT_OPTIONS = [
  { key: 'content', label: '内容顺序', desc: '按词汇书原有顺序' },
  { key: 'random', label: '随机排序', desc: '打乱顺序随机学习' },
  { key: 'alphabet', label: '字母正序', desc: '按字母A-Z排序' },
];

export default function WordStudyPage({ showSettings: initialShowSettings = true }) {
  const setMode = useWordStore((s) => s.setMode);
  const currentBook = useWordStore((s) => s.currentBook);
  const setDailyGoal = useWordStore((s) => s.setDailyGoal);
  const markWordLearned = useWordStore((s) => s.markWordLearned);
  const markWordMastered = useWordStore((s) => s.markWordMastered);
  const todayLearned = useWordStore((s) => s.todayLearned);
  const learnedWords = useWordStore((s) => s.learnedWords);
  const setCurrentBook = useWordStore((s) => s.setCurrentBook);
  const studySettings = useWordStore((s) => s.studySettings);
  const saveStudySettings = useWordStore((s) => s.saveStudySettings);
  const addFavoriteWord = useWordStore((s) => s.addFavoriteWord);
  const removeFavoriteWord = useWordStore((s) => s.removeFavoriteWord);
  const addWords = useStudyStore((s) => s.addWords);
  
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showSettings, setShowSettings] = useState(initialShowSettings);
  const [tempDailyNew, setTempDailyNew] = useState(studySettings?.dailyNew || 20);
  const [tempDailyReview, setTempDailyReview] = useState(studySettings?.dailyReview || 20);
  const [tempSortOrder, setTempSortOrder] = useState(studySettings?.sortOrder || 'content');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [studyComplete, setStudyComplete] = useState(false);
  const [sessionWords, setSessionWords] = useState([]);
  
  const [currentStage, setCurrentStage] = useState('learn');
  const [phonicsTab, setPhonicsTab] = useState('syllable');
  const [isFavorited, setIsFavorited] = useState(false);
  const [isMastered, setIsMastered] = useState(false);

  const sessionStartedRef = useRef(false);

  const currentWord = sessionWords[currentWordIndex] || null;

  useEffect(() => {
    loadVocabularyData().then(() => setDataLoaded(true));
  }, []);

  useEffect(() => {
    if (studySettings) {
      setTempDailyNew(studySettings.dailyNew || 20);
      setTempDailyReview(studySettings.dailyReview || 20);
      setTempSortOrder(studySettings.sortOrder || 'content');
    }
  }, [studySettings]);

  useEffect(() => {
    console.log('useEffect triggered:', { showSettings, dataLoaded, sessionStarted: sessionStartedRef.current });
    
    if (!showSettings && dataLoaded && !sessionStartedRef.current) {
      sessionStartedRef.current = true;
      
      const dailyNew = studySettings?.dailyNew || tempDailyNew;
      const sortOrder = studySettings?.sortOrder || tempSortOrder;
      
      console.log('Starting session with:', { currentBook, dailyNew, sortOrder, learnedWords, todayLearned });
      
      try {
        const book = getVocabularyBook(currentBook);
        console.log('book:', book?.name, 'words:', book?.words?.length);
        const words = book.words || [];
        const learnedSet = new Set(learnedWords || []);
        const todaySet = new Set(todayLearned || []);
        
        let unlearnedWords = words.filter(w => !learnedSet.has(w.word) && !todaySet.has(w.word));
        console.log('unlearnedWords:', unlearnedWords.length);
        
        if (sortOrder === 'random') {
          unlearnedWords = [...unlearnedWords].sort(() => Math.random() - 0.5);
        } else if (sortOrder === 'alphabet') {
          unlearnedWords = [...unlearnedWords].sort((a, b) => a.word.localeCompare(b.word));
        }
        
        const finalWords = unlearnedWords.slice(0, dailyNew);
        console.log('finalWords:', finalWords.length);
        
        if (finalWords.length === 0) {
          setStudyComplete(true);
          setSessionWords([]);
        } else {
          setSessionWords(finalWords);
          setCurrentWordIndex(0);
          setStudyComplete(false);
          setCurrentStage('learn');
          setIsFavorited(false);
          setIsMastered(false);
        }
      } catch (error) {
        console.error('startStudySession error:', error);
        setStudyComplete(true);
      }
    }
  }, [showSettings, dataLoaded]);

  const handleSaveSettings = () => {
    saveStudySettings({
      dailyNew: tempDailyNew,
      dailyReview: tempDailyReview,
      sortOrder: tempSortOrder,
      savedAt: Date.now(),
    });
    setDailyGoal(tempDailyNew);
    setMode('cards');
  };

  const handleNextWord = () => {
    const nextIndex = currentWordIndex + 1;

    if (currentWord) {
      markWordLearned(currentWord.word);
      if (isMastered) {
        markWordMastered(currentWord.word);
      }
      addWords(1);
    }

    if (nextIndex >= sessionWords.length) {
      setStudyComplete(true);
    } else {
      setCurrentWordIndex(nextIndex);
      setCurrentStage('learn');
      setIsFavorited(false);
      setIsMastered(false);
    }
  };

  const handleMarkMastered = () => {
    const newStatus = !isMastered;
    setIsMastered(newStatus);
    if (currentWord && newStatus) {
      markWordMastered(currentWord.word);
    }
  };

  const handleFavorite = () => {
    const newStatus = !isFavorited;
    setIsFavorited(newStatus);
    if (currentWord) {
      if (newStatus) {
        addFavoriteWord({
          word: currentWord.word,
          phonetic: currentWord.phonetic,
          type: currentWord.type,
          meaning: currentWord.meaning,
          example: currentWord.example
        });
      } else {
        removeFavoriteWord(currentWord.word);
      }
    }
  };

  const handleBookChange = (bookKey) => {
    setCurrentBook(bookKey);
  };

  const getTypeColor = (type) => {
    const colors = {
      vowel: '#FF6B35',
      consonant: '#00B4D8',
      syllable: '#10B981',
      ending: '#8B5CF6',
      magic_e: '#F59E0B',
      consonant_cluster: '#EC4899',
    };
    return colors[type] || '#6B7280';
  };

  const generateExample = (word, type, meaning) => {
    if (!word) return 'Loading...';
    
    const templates = {
      'n.': [
        `The ${word} is very important in our daily life.`,
        `I saw a ${word} in the picture.`,
        `This ${word} represents ${meaning || 'something'}.`,
      ],
      'v.': [
        `I like to ${word} every day.`,
        `She decided to ${word} yesterday.`,
        `They will ${word} tomorrow.`,
      ],
      'adj.': [
        `The ${word} thing is beautiful.`,
        `She looks very ${word} today.`,
        `This is a ${word} example.`,
      ],
      'adv.': [
        `He speaks ${word} well.`,
        `She ${word} finished the work.`,
      ],
    };
    
    const category = (type && type.replace('.', '')) || 'n';
    const list = templates[category] || templates['n.'];
    return list[Math.floor(Math.random() * list.length)];
  };

  const renderSyllables = (word) => {
    if (!word) return null;
    
    const syllables = splitSyllables(word);
    
    return syllables.map((syl, idx) => (
      <span key={idx} style={{ color: idx % 2 === 0 ? '#FF6B35' : '#00B4D8' }}>
        {syl}
        {idx < syllables.length - 1 && <span style={{ color: '#ccc', margin: '0 2px' }}>-</span>}
      </span>
    ));
  };

  const renderExample = () => {
    if (!currentWord || !currentWord.word) {
      return 'Loading...';
    }
    
    const word = currentWord.word;
    const example = currentWord.example || generateExample(word, currentWord.type, currentWord.meaning);
    const parts = example.split(new RegExp(`(${word})`, 'gi'));
    
    return parts.map((part, idx) => {
      if (part.toLowerCase() === word.toLowerCase()) {
        return <span key={idx} className="highlight-word">{part}</span>;
      }
      return part;
    });
  };

  const currentPhonemes = () => {
    if (currentWord && currentWord.word) {
      return splitPhonemes(currentWord.word, currentWord.phonetic);
    }
    return ['?'];
  };

  const naturalPhonics = () => {
    if (!currentWord || !currentWord.word) {
      return [];
    }
    
    const word = currentWord.word.toLowerCase();
    const syllables = splitSyllables(word);
    
    const result = [];
    
    for (let i = 0; i < syllables.length; i++) {
      const syl = syllables[i];
      const isLast = i === syllables.length - 1;
      
      let type = 'syllable';
      let tip = '音节';
      
      const vowels = 'aeiou';
      const hasVowel = [...syl].some(c => vowels.includes(c));
      
      if (syl.length === 1) {
        const char = syl[0];
        if (vowels.includes(char)) {
          type = 'vowel';
          tip = isLast ? '结尾元音' : '元音';
        } else {
          type = 'consonant';
          tip = '辅音';
        }
      } else if (hasVowel) {
        type = 'syllable';
        tip = '音节';
      } else {
        type = 'consonant_cluster';
        tip = '辅音组合';
      }
      
      result.push({
        grapheme: syl,
        phoneme: `/${syl}/`,
        type,
        tip,
        color: getTypeColor(type),
      });
    }
    
    return result;
  };

  const getTotalWords = () => {
    const book = getVocabularyBook(currentBook);
    return (book.words || []).length;
  };

  const getLearnedCount = () => {
    const book = getVocabularyBook(currentBook);
    const words = book.words || [];
    const learnedSet = new Set(learnedWords || []);
    const todaySet = new Set(todayLearned || []);
    return words.filter(w => learnedSet.has(w.word) || todaySet.has(w.word)).length;
  };

  const totalWords = getTotalWords();
  const learnedCount = getLearnedCount();
  const remainingWords = totalWords - learnedCount;
  const daysNeeded = tempDailyNew > 0 ? Math.ceil(remainingWords / tempDailyNew) : 0;

  if (!dataLoaded) {
    return (
      <div className="study-page-loading">
        <div className="loading-text">加载词汇数据中...</div>
      </div>
    );
  }

  if (studyComplete) {
    return (
      <div className="study-complete-page">
        <div className="complete-card">
          <div className="complete-icon">🎉</div>
          <h2 className="complete-title">今日学习完成！</h2>
          <p className="complete-stats">已学习 {sessionWords.length} 个单词</p>
          <div className="complete-actions">
            <button className="continue-btn" onClick={() => {
              setStudyComplete(false);
              setSessionWords([]);
              sessionStartedRef.current = false;
              setShowSettings(true);
            }}>
              继续学习
            </button>
            <button className="back-home-btn" onClick={() => setMode('cards')}>
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showSettings) {
    return (
      <div className="study-settings-page">
        <div className="settings-header">
          <button className="back-btn" onClick={() => setMode('cards')}>← 返回</button>
        </div>

        <div className="settings-content">
          <h2 className="settings-title">📚 选择学习计划</h2>

          <div className="settings-section">
            <label className="section-label">选择词汇书</label>
            <div className="book-grid">
              {[
                { key: 'LiuBin_1000', name: '刘彬1000核心词', icon: '🎯', color: '#4CAF50', desc: '中考/高考核心词汇' },
                { key: 'LiuBin_3500', name: '刘彬3500词汇', icon: '🚀', color: '#2196F3', desc: '中考高考必考词汇' },
                { key: 'LiuBin_6000', name: '刘彬6000词汇', icon: '💎', color: '#9C27B0', desc: '托福雅思进阶词汇' },
              ].map((b) => (
                <div
                  key={b.key}
                  className={`book-card ${currentBook === b.key ? 'selected' : ''}`}
                  onClick={() => handleBookChange(b.key)}
                >
                  <div className="book-icon">{b.icon}</div>
                  <div className="book-info">
                    <div className="book-name">{b.name}</div>
                    <div className="book-desc">{b.desc}</div>
                  </div>
                  {currentBook === b.key && <span className="book-check">✓</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <label className="section-label">每日学习任务</label>
            <div className="task-cards">
              <div className="task-card">
                <div className="task-label">新词</div>
                <div className="task-control">
                  <button className="task-btn" onClick={() => setTempDailyNew(Math.max(5, tempDailyNew - 5))}>-</button>
                  <span className="task-value">{tempDailyNew}</span>
                  <button className="task-btn" onClick={() => setTempDailyNew(Math.min(100, tempDailyNew + 5))}>+</button>
                </div>
                <div className="task-unit">个/天</div>
              </div>
              
              <div className="task-card">
                <div className="task-label">复习</div>
                <div className="task-control">
                  <button className="task-btn" onClick={() => setTempDailyReview(Math.max(0, tempDailyReview - 10))}>-</button>
                  <span className="task-value">{tempDailyReview}</span>
                  <button className="task-btn" onClick={() => setTempDailyReview(Math.min(200, tempDailyReview + 10))}>+</button>
                </div>
                <div className="task-unit">个/天</div>
              </div>
              
              <div className="task-card highlight">
                <div className="task-label">需要</div>
                <div className="task-big-value">{daysNeeded}</div>
                <div className="task-unit">天</div>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <label className="section-label">背诵顺序</label>
            <div className="sort-list">
              {SORT_OPTIONS.map((opt) => (
                <div
                  key={opt.key}
                  className={`sort-item ${tempSortOrder === opt.key ? 'active' : ''}`}
                  onClick={() => setTempSortOrder(opt.key)}
                >
                  <div className="sort-radio">
                    {tempSortOrder === opt.key && <span className="sort-check">✓</span>}
                  </div>
                  <div className="sort-text">
                    <div className="sort-label">{opt.label}</div>
                    <div className="sort-desc">{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="settings-summary">
            <div className="summary-item">
              <span className="summary-label">词汇总量</span>
              <span className="summary-value">{totalWords} 词</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">已学习</span>
              <span className="summary-value">{learnedCount} 词</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">剩余</span>
              <span className="summary-value">{remainingWords} 词</span>
            </div>
          </div>

          <button className="start-btn" onClick={handleSaveSettings}>保存设置</button>
        </div>
      </div>
    );
  }

  if (sessionWords.length === 0) {
    return (
      <div className="study-page-loading">
        <div className="loading-text">准备学习中...</div>
      </div>
    );
  }

  return (
    <div className="word-learning-page">
      <div className="learning-header">
        <button className="header-back-btn" onClick={() => setMode('cards')}>
          ← 返回
        </button>
        <div className="stage-nav">
          {STAGES.map((stage) => (
            <span
              key={stage.key}
              className={`stage-item ${currentStage === stage.key ? 'active' : ''}`}
              onClick={() => setCurrentStage(stage.key)}
            >
              {stage.label}
            </span>
          ))}
        </div>
        <div className="quick-actions">
          <button className={`action-btn ${isMastered ? 'active' : ''}`} onClick={handleMarkMastered}>
            {isMastered ? '✓' : '熟'}
          </button>
          <button className={`action-btn ${isFavorited ? 'active' : ''}`} onClick={handleFavorite}>
            {isFavorited ? '★' : '☆'}
          </button>
        </div>
      </div>

      <div className="learning-content">
        <div className="word-display">
          <div className="word-main">
            {currentWord ? renderSyllables(currentWord.word) : '...'}
          </div>
          <div className="word-phonetic">
            <span className="phonetic-item">
              英 [{currentWord?.phonetic || '...'}] 
              <button className="speak-btn">🔊</button>
            </span>
            <span className="phonetic-divider">|</span>
            <span className="phonetic-item">
              美 [{currentWord?.phonetic || '...'}] 
              <button className="speak-btn">🔊</button>
            </span>
          </div>
        </div>

        <div className="meaning-card">
          <span className="word-type">{currentWord?.type || '...'}</span>
          <span className="word-meaning">{currentWord?.meaning || '...'}</span>
        </div>

        <div className="phonics-card">
          <div className="phonics-tabs">
            <button 
              className={`phonics-tab ${phonicsTab === 'syllable' ? 'active' : ''}`}
              onClick={() => setPhonicsTab('syllable')}
            >
              音节拆分
            </button>
            <button 
              className={`phonics-tab ${phonicsTab === 'natural' ? 'active' : ''}`}
              onClick={() => setPhonicsTab('natural')}
            >
              自然拼读
            </button>
          </div>
          <div className="phonics-content">
            {phonicsTab === 'syllable' ? (
              currentPhonemes().map((p, idx) => (
                <span key={idx} className="phoneme-item">/{p}/</span>
              ))
            ) : (
              <div className="natural-phonics-grid">
                {naturalPhonics().map((item, idx) => (
                  <div key={idx} className="natural-phonics-item" style={{ borderColor: item.color }}>
                    <div className="phonics-grapheme" style={{ color: item.color }}>
                      {item.grapheme}
                    </div>
                    <div className="phonics-phoneme">
                      {item.phoneme}
                    </div>
                    <div className="phonics-tip">
                      {item.tip}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="example-card">
          <div className="example-en">
            {renderExample()}
            <button className="speak-btn">🔊</button>
          </div>
          <div className="example-cn">{currentWord?.meaning || '...'}</div>
        </div>
      </div>

      <div className="learning-footer">
        <div className="footer-gradient"></div>
        <div className="progress-info">
          <span className="progress-current">{currentWordIndex + 1}</span>
          <span className="progress-divider">/</span>
          <span className="progress-total">{sessionWords.length}</span>
        </div>
        <button className="next-word-btn" onClick={handleNextWord}>
          下一词
        </button>
      </div>
    </div>
  );
}