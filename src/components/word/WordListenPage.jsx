import { useState, useEffect, useRef, useMemo } from 'react';
import useWordStore from '../../store/useWordStore';
import { getVocabularyBook } from '../../data/vocabulary1000';
import { splitSyllables } from '../../utils/wordSplit';

export default function WordListenPage() {
  const { setMode, currentBook, todayLearned, learnedWords } = useWordStore();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMeaning, setShowMeaning] = useState(true);
  const [repeatCount, setRepeatCount] = useState(2);
  const [interval, setInterval] = useState(3);
  const [showSettings, setShowSettings] = useState(false);
  
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const currentRepeatRef = useRef(0);
  const phaseRef = useRef('word');
  const isPlayingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const voicesReadyRef = useRef(false);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) voicesReadyRef.current = true;
    };
    loadVoices();
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.addEventListener) {
      speechSynthesis.addEventListener('voiceschanged', loadVoices);
    }
    return () => {
      if (typeof speechSynthesis !== 'undefined' && speechSynthesis.removeEventListener) {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      }
    };
  }, []);

  const words = useMemo(() => {
    const book = getVocabularyBook(currentBook);
    const allWords = book.words || [];
    const todaySet = new Set(todayLearned || []);
    
    const todayWordsList = allWords.filter(w => todaySet.has(w.word));
    
    return todayWordsList.length > 0 ? todayWordsList : allWords.slice(0, 9);
  }, [currentBook, todayLearned]);

  const currentWord = words[currentIndex] || null;

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const syllables = useMemo(() => {
    if (!currentWord?.word) return [];
    return splitSyllables(currentWord.word);
  }, [currentWord]);

  const generateExample = (word, type, meaning) => {
    if (!word) return '';
    
    const templates = {
      'n.': [
        `The ${word} is very important.`,
        `I saw a ${word} yesterday.`,
        `This ${word} is beautiful.`,
      ],
      'v.': [
        `I like to ${word} every day.`,
        `She decided to ${word}.`,
        `They will ${word} tomorrow.`,
      ],
      'adj.': [
        `The ${word} thing is nice.`,
        `She looks very ${word}.`,
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

  const getExampleSentence = (wordData) => {
    if (!wordData) return '';
    if (wordData.example && wordData.example.trim()) {
      return wordData.example;
    }
    return generateExample(wordData.word, wordData.type, wordData.meaning);
  };

  const speak = (text, onEnd) => {
    if (!text || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.volume = 1;
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      const usVoice = voices.find(v => v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en')) || voices[0];
      if (usVoice) utterance.voice = usVoice;
    }
    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }
    window.speechSynthesis.speak(utterance);
  };

  const speakManual = (text) => {
    if (!text || !('speechSynthesis' in window)) return;
    const wasPlaying = isPlayingRef.current;
    if (wasPlaying) {
      isPlayingRef.current = false;
      clearTimeout(timerRef.current);
    }
    window.speechSynthesis.cancel();
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.volume = 1;
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        const usVoice = voices.find(v => v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en')) || voices[0];
        if (usVoice) utterance.voice = usVoice;
      }
      utterance.onend = () => {
        if (wasPlaying) {
          isPlayingRef.current = true;
          playNextPhase();
        }
      };
      utterance.onerror = () => {
        if (wasPlaying) {
          isPlayingRef.current = true;
          playNextPhase();
        }
      };
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  const stopAll = () => {
    isPlayingRef.current = false;
    clearTimeout(timerRef.current);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.getVoices();
    }
  };

  const playNextPhase = () => {
    if (!isPlayingRef.current) return;
    
    const idx = currentIndexRef.current;
    const wordData = words[idx];
    if (!wordData) return;
    
    if (phaseRef.current === 'word') {
      speak(wordData.word, () => {
        if (!isPlayingRef.current) return;
        currentRepeatRef.current++;
        
        if (currentRepeatRef.current < repeatCount) {
          timerRef.current = setTimeout(() => {
            if (isPlayingRef.current) {
              playNextPhase();
            }
          }, interval * 1000);
        } else {
          timerRef.current = setTimeout(() => {
            if (isPlayingRef.current) {
              phaseRef.current = 'example';
              playNextPhase();
            }
          }, 1500);
        }
      });
    } else if (phaseRef.current === 'example') {
      const example = getExampleSentence(wordData);
      speak(example, () => {
        if (!isPlayingRef.current) return;
        timerRef.current = setTimeout(() => {
          if (isPlayingRef.current) {
            goToNext();
          }
        }, 3000);
      });
    }
  };

  const goToNext = () => {
    if (!isPlayingRef.current) return;
    
    const nextIdx = currentIndexRef.current + 1;
    
    if (nextIdx < words.length) {
      setCurrentIndex(nextIdx);
      currentIndexRef.current = nextIdx;
      currentRepeatRef.current = 0;
      phaseRef.current = 'word';
      
      timerRef.current = setTimeout(() => {
        if (isPlayingRef.current) {
          playNextPhase();
        }
      }, 500);
    } else {
      setIsPlaying(false);
      isPlayingRef.current = false;
      setCurrentIndex(0);
      currentIndexRef.current = 0;
      currentRepeatRef.current = 0;
      phaseRef.current = 'word';
    }
  };

  const goToPrev = () => {
    const prevIdx = currentIndexRef.current - 1;
    if (prevIdx >= 0) {
      setCurrentIndex(prevIdx);
      currentIndexRef.current = prevIdx;
      currentRepeatRef.current = 0;
      phaseRef.current = 'word';
      
      if (isPlayingRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          if (isPlayingRef.current) {
            playNextPhase();
          }
        }, 500);
      }
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      stopAll();
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;
      currentRepeatRef.current = 0;
      phaseRef.current = 'word';
      playNextPhase();
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      setIsPlaying(false);
      clearTimeout(timerRef.current);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.getVoices();
      }
    };
  }, []);

  const renderSyllables = () => {
    if (!currentWord?.word) return null;
    
    return syllables.map((syl, idx) => (
      <span key={idx} className="syllable-part" style={{ 
        color: idx % 2 === 0 ? '#FF6B35' : '#00B4D8' 
      }}>
        {syl}
      </span>
    ));
  };

  const renderPhonetic = () => {
    if (!currentWord?.phonetic) return null;
    
    const phonetic = currentWord.phonetic;
    const parts = phonetic.split(/([ˈˌ])/);
    
    return (
      <span className="phonetic-text">
        {parts.map((part, idx) => {
          if (part === 'ˈ' || part === 'ˌ') {
            return <span key={idx} className="stress-mark">{part}</span>;
          }
          const syllableIdx = Math.floor(idx / 2);
          return (
            <span key={idx} style={{ 
              color: syllableIdx % 2 === 0 ? '#FF6B35' : '#00B4D8' 
            }}>
              {part}
            </span>
          );
        })}
      </span>
    );
  };

  const renderExample = () => {
    if (!currentWord?.word) return '';
    
    const example = getExampleSentence(currentWord);
    const word = currentWord.word;
    const parts = example.split(new RegExp(`(${word})`, 'gi'));
    
    return parts.map((part, idx) => {
      if (part.toLowerCase() === word.toLowerCase()) {
        return <span key={idx} className="example-highlight">{part}</span>;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  if (!currentWord) {
    return (
      <div className="word-listen-page">
        <div className="listen-empty">
          <div className="empty-icon">🎧</div>
          <p>暂无单词可播放</p>
          <button onClick={() => setMode('study')}>去学习单词</button>
        </div>
      </div>
    );
  }

  return (
    <div className="word-listen-page">
      <div className="listen-header">
        <button className="back-btn" onClick={() => {
          setIsPlaying(false);
          clearTimeout(timerRef.current);
          window.speechSynthesis?.cancel();
          setMode('cards');
        }}>
          ← 返回
        </button>
        <div className="header-controls">
          <button className="settings-capsule" onClick={() => setShowSettings(!showSettings)}>
            重复读{repeatCount}次·间隔{interval}秒 &gt;
          </button>
          <button className="share-btn">📤</button>
        </div>
      </div>

      {showSettings && (
        <div className="settings-panel">
          <div className="setting-row">
            <span>重复次数</span>
            <div className="setting-control">
              <button onClick={() => setRepeatCount(Math.max(1, repeatCount - 1))}>-</button>
              <span>{repeatCount}</span>
              <button onClick={() => setRepeatCount(Math.min(5, repeatCount + 1))}>+</button>
            </div>
          </div>
          <div className="setting-row">
            <span>间隔时间</span>
            <div className="setting-control">
              <button onClick={() => setInterval(Math.max(1, interval - 1))}>-</button>
              <span>{interval}秒</span>
              <button onClick={() => setInterval(Math.min(10, interval + 1))}>+</button>
            </div>
          </div>
        </div>
      )}

      <div className="listen-content">
        <div className="word-hero">
          <div className="four-lines-bg">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="word-display">
            {renderSyllables()}
          </div>
        </div>

        <div className="phonetic-section">
          <button className="speak-btn" onClick={() => speakManual(currentWord.word)}>🔊</button>
          <div className="phonetic-box">
            [{renderPhonetic()}]
          </div>
        </div>

        <div className="meaning-section">
          <span className="word-type">{currentWord.type}</span>
          <span className="word-meaning">{showMeaning ? currentWord.meaning : '••••••'}</span>
        </div>

        <div className="example-card">
          <div className="example-header">
            <span className="example-label">例句</span>
          </div>
          <div className="example-content">
            <button className="speak-btn" onClick={() => speakManual(getExampleSentence(currentWord))}>🔊</button>
            <div className="example-text">
              <p className="example-en">{renderExample()}</p>
              {showMeaning && <p className="example-cn">{currentWord.meaning}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="listen-footer">
        <p className="footer-tip">每个单词读{repeatCount}遍，间隔{interval}秒，读完例句自动下一个</p>
        <div className="controls-row">
          <button className="control-btn list-btn" title="播放列表">📋</button>
          <button className="control-btn prev-btn" onClick={goToPrev} disabled={currentIndex === 0}>⏮</button>
          <button className={`play-btn ${isPlaying ? 'playing' : ''}`} onClick={handlePlayPause}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="control-btn next-btn" onClick={goToNext} disabled={currentIndex === words.length - 1}>⏭</button>
          <button 
            className={`control-btn eye-btn ${!showMeaning ? 'active' : ''}`} 
            onClick={() => setShowMeaning(!showMeaning)}
            title="隐藏释义"
          >
            👁
          </button>
        </div>
      </div>
    </div>
  );
}
