import { useState, useEffect, useRef, useCallback } from 'react';
import useWordStore from '../../store/useWordStore';
import useStudyStore from '../../store/useStudyStore';
import { getVocabularyBook, loadVocabularyData } from '../../data/vocabulary1000';
import { splitSyllables, splitPhonemes } from '../../utils/wordSplit';
import { sendAIMessage } from '../../services/aiService';

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
  const [isRecording, setIsRecording] = useState(false);
  const [readSpeechText, setReadSpeechText] = useState('');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [practiceOptions, setPracticeOptions] = useState([]);
  const [practiceSelected, setPracticeSelected] = useState(null);
  const [practiceCorrect, setPracticeCorrect] = useState(null);
  const [spellParts, setSpellParts] = useState([]);
  const [spellSelectedParts, setSpellSelectedParts] = useState([]);
  const [spellDone, setSpellDone] = useState(false);
  const [dictateInput, setDictateInput] = useState('');
  const [dictateDone, setDictateDone] = useState(false);
  const [dictateCorrect, setDictateCorrect] = useState(false);
  const [exampleCn, setExampleCn] = useState('');
  const [exampleCnLoading, setExampleCnLoading] = useState(false);
  const exampleCnCache = useRef({});
  const voicesLoadedRef = useRef(false);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) voicesLoadedRef.current = true;
    };
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const sessionStartedRef = useRef(false);
  const readRecognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalText = '';
        let interimText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript;
          } else {
            interimText += event.results[i][0].transcript;
          }
        }
        setReadSpeechText(finalText || interimText);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      readRecognitionRef.current = recognition;
    }
  }, []);

  const toggleReadRecording = useCallback(() => {
    if (!readRecognitionRef.current) return;
    if (isRecording) {
      readRecognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setReadSpeechText('');
      try {
        readRecognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.warn('[WordStudyPage] 启动语音识别失败:', e);
      }
    }
  }, [isRecording]);

  const playWordAudio = useCallback((text, accent = 'us') => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    const voices = speechSynthesis.getVoices();
    if (accent === 'uk') {
      const ukVoice = voices.find(v => v.lang === 'en-GB') || voices.find(v => v.lang.startsWith('en-GB'));
      if (ukVoice) utterance.voice = ukVoice;
      utterance.lang = 'en-GB';
    } else {
      const usVoice = voices.find(v => v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en-US'));
      if (usVoice) utterance.voice = usVoice;
    }
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, []);

  const playSentenceAudio = useCallback((text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.75;
    const voices = speechSynthesis.getVoices();
    const usVoice = voices.find(v => v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en-US'));
    if (usVoice) utterance.voice = usVoice;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, []);

  const currentWord = sessionWords[currentWordIndex] || null;

  const generatePracticeOptions = useCallback((word) => {
    if (!word) return [];
    const allMeanings = sessionWords
      .map(w => w.meaning)
      .filter(m => m && m !== word.meaning);
    const shuffled = [...allMeanings].sort(() => Math.random() - 0.5);
    const distractors = shuffled.slice(0, 3);
    const options = [...distractors, word.meaning].sort(() => Math.random() - 0.5);
    return options;
  }, [sessionWords]);

  const handlePracticeSelect = useCallback((option) => {
    if (practiceSelected !== null) return;
    setPracticeSelected(option);
    setPracticeCorrect(option === currentWord?.meaning);
  }, [practiceSelected, currentWord]);

  const splitWordIntoParts = useCallback((word) => {
    if (!word || word.length < 3) return [word];
    const w = word.toLowerCase();
    const suffixes = ['tion', 'sion', 'ment', 'ness', 'able', 'ible', 'ful', 'less', 'ous', 'ive', 'ing', 'ied', 'ies', 'ed', 'er', 'ly', 'es', 'ty', 'al', 'en', 'ic'];
    const prefixes = ['un', 're', 'pre', 'dis', 'mis', 'over', 'out', 'im', 'in', 'ir', 'il'];
    for (const suf of suffixes) {
      if (w.endsWith(suf) && w.length > suf.length + 1) {
        const root = word.slice(0, word.length - suf.length);
        if (root.length >= 2) return [root, suf];
      }
    }
    for (const pre of prefixes) {
      if (w.startsWith(pre) && w.length > pre.length + 1) {
        const rest = word.slice(pre.length);
        if (rest.length >= 2) return [pre, rest];
      }
    }
    const syllables = splitSyllables(word);
    if (syllables.length > 1) return syllables;
    return [word];
  }, []);

  const handleSpellPartSelect = useCallback((part) => {
    if (spellDone) return;
    if (spellSelectedParts.length >= spellParts.length) return;
    setSpellSelectedParts(prev => [...prev, part]);
  }, [spellDone, spellSelectedParts.length, spellParts.length]);

  useEffect(() => {
    if (currentStage === 'practice' && currentWord) {
      setPracticeOptions(generatePracticeOptions(currentWord));
      setPracticeSelected(null);
      setPracticeCorrect(null);
    }
  }, [currentStage, currentWordIndex, currentWord, generatePracticeOptions]);

  useEffect(() => {
    if (currentStage === 'spell' && currentWord) {
      const parts = splitWordIntoParts(currentWord.word);
      setSpellParts(parts);
      setSpellSelectedParts([]);
      setSpellDone(false);
    }
  }, [currentStage, currentWordIndex, currentWord, splitWordIntoParts]);

  useEffect(() => {
    if (
      currentStage === 'spell' &&
      currentWord &&
      spellSelectedParts.length === spellParts.length &&
      !spellDone
    ) {
      const assembled = spellSelectedParts.join('');
      if (assembled === currentWord.word) {
        setSpellDone(true);
      }
    }
  }, [currentStage, currentWord, spellSelectedParts, spellParts, spellDone]);

  useEffect(() => {
    if (currentStage === 'dictate' && currentWord) {
      setDictateInput('');
      setDictateDone(false);
      setDictateCorrect(false);
    }
  }, [currentStage, currentWordIndex, currentWord]);

  useEffect(() => {
    if (!currentWord || !currentWord.example) {
      setExampleCn('');
      return;
    }
    const cacheKey = `exampleCn_${currentWord.word}`;
    if (currentWord.exampleCn) {
      setExampleCn(currentWord.exampleCn);
      exampleCnCache.current[cacheKey] = currentWord.exampleCn;
      try { localStorage.setItem(cacheKey, currentWord.exampleCn); } catch(e) {}
      return;
    }
    if (exampleCnCache.current[cacheKey]) {
      setExampleCn(exampleCnCache.current[cacheKey]);
      return;
    }
    try {
      const stored = localStorage.getItem(cacheKey);
      if (stored) {
        setExampleCn(stored);
        exampleCnCache.current[cacheKey] = stored;
        return;
      }
    } catch(e) {}
    const fallback = generateExampleTranslation(currentWord);
    setExampleCn(fallback);
    setExampleCnLoading(true);
    sendAIMessage(
      [{ role: 'user', content: `请将以下英语句子翻译为中文，只输出翻译结果，不要解释：\n${currentWord.example}` }],
      { temperature: 0.3, maxTokens: 200, systemPrompt: '你是一个英译中翻译器，只输出中文翻译，不要添加任何解释或标点符号以外的内容。' }
    ).then(result => {
      const text = result?.content?.trim() || '';
      if (text) {
        setExampleCn(text);
        exampleCnCache.current[cacheKey] = text;
        try { localStorage.setItem(cacheKey, text); } catch(e) {}
      }
    }).catch(() => {}).finally(() => setExampleCnLoading(false));
  }, [currentWord]);

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

  const generateExampleTranslation = (wordObj) => {
    if (!wordObj || !wordObj.example) return wordObj?.meaning || '...';
    const example = wordObj.example;
    const word = wordObj.word;
    const meaning = wordObj.meaning;
    const translations = {
      'The apple is red and delicious.': '这个苹果又红又好吃。',
      'The ball is round.': '球是圆的。',
      'The cat says meow.': '猫会喵喵叫。',
      'The dog barks happily.': '狗开心地叫着。',
      'We can cook the egg.': '我们可以煮鸡蛋。',
      'The fish swims.': '鱼在游泳。',
      'The girl likes to play.': '这个女孩喜欢玩。',
      'Wash your hands.': '洗洗你的手。',
      'Ants are insects.': '蚂蚁是昆虫。',
      'I like to jump.': '我喜欢跳跃。',
      'I fly a kite.': '我放风筝。',
      'My legs are strong.': '我的腿很有力。',
      'The monkey is hopping.': '猴子在跳来跳去。',
      'My name is Tom.': '我的名字叫汤姆。',
      'This orange is orange.': '这个橙子是橙色的。',
      'Look! A big pig.': '看！一头大猪。',
      'Be quiet, please.': '请安静。',
      'The river is long.': '这条河很长。',
      'The bird sings.': '鸟儿在唱歌。',
      'She is a teacher.': '她是一名老师。',
      'Put up your umbrella.': '撑开你的雨伞。',
      'Summer vacation is coming.': '暑假就要来了。',
      'Winter is cold.': '冬天很冷。',
      'Yellow is my favourite colour.': '黄色是我最喜欢的颜色。',
      "Let's go to the zoo.": '我们去动物园吧。',
      'Pandas can climb trees.': '熊猫会爬树。',
      'I like my new school bag.': '我喜欢我的新书包。',
      'She lights a candle.': '她点燃了一根蜡烛。',
      'Happy birthday!': '生日快乐！',
      "Don't be sad.": '别难过。',
    };
    if (translations[example]) return translations[example];
    const lower = example.toLowerCase();
    const w = word.toLowerCase();
    const m = meaning;
    if (lower.startsWith('the ') && lower.includes(w)) {
      return `这个${m}${lower.endsWith('.') ? example.slice(0, -1).replace(new RegExp(w, 'gi'), '').replace(/^the\s*/i, '').trim() : ''}。`;
    }
    if (lower.startsWith('i ') && lower.includes(w)) {
      return `我${m}。`;
    }
    if (lower.startsWith('she ') && lower.includes(w)) {
      return `她${m}。`;
    }
    if (lower.startsWith('he ') && lower.includes(w)) {
      return `他${m}。`;
    }
    if (lower.startsWith('we ') && lower.includes(w)) {
      return `我们${m}。`;
    }
    if (lower.startsWith('they ') && lower.includes(w)) {
      return `他们${m}。`;
    }
    if (lower.startsWith('it ') && lower.includes(w)) {
      return `它${m}。`;
    }
    return example.replace(new RegExp(word, 'gi'), meaning);
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
            {currentStage === 'spell' ? (
              <span className={`spell-assembled ${spellDone ? 'done' : ''}`}>
                {spellSelectedParts.length > 0 ? spellSelectedParts.join('') : <span style={{ color: 'var(--gray-300)' }}>____</span>}
              </span>
            ) : currentStage === 'dictate' ? (
              <div className="dictate-input-wrapper">
                {dictateDone ? (
                  <div className={`dictate-answer ${dictateCorrect ? 'correct' : 'wrong'}`}>
                    {dictateInput}
                  </div>
                ) : (
                  <input
                    className="dictate-input"
                    type="text"
                    placeholder="请输入单词..."
                    value={dictateInput}
                    maxLength={currentWord?.word.length || 20}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase();
                      setDictateInput(val);
                      if (val.length === currentWord?.word.length) {
                        const correct = val.toLowerCase() === currentWord?.word.toLowerCase();
                        setDictateCorrect(correct);
                        setDictateDone(true);
                      }
                    }}
                    autoFocus
                  />
                )}
              </div>
            ) : currentWord ? renderSyllables(currentWord.word) : '...'}
          </div>
          <div className="word-phonetic">
            <span className="phonetic-item">
              英 [{currentWord?.phonetic || '...'}] 
              <button className="speak-btn" onClick={() => playWordAudio(currentWord?.word, 'uk')}>🔊</button>
            </span>
            <span className="phonetic-divider">|</span>
            <span className="phonetic-item">
              美 [{currentWord?.phonetic || '...'}] 
              <button className="speak-btn" onClick={() => playWordAudio(currentWord?.word, 'us')}>🔊</button>
            </span>
          </div>
        </div>

        {currentStage !== 'practice' && (
          <div className="meaning-card">
            <span className="word-type">{currentWord?.type || '...'}</span>
            <span className="word-meaning">{currentWord?.meaning || '...'}</span>
          </div>
        )}

        {currentStage === 'dictate' && (
          <div className="dictate-area">
            {dictateDone && dictateCorrect && (
              <div className="dictate-feedback correct">
                <span>🎉</span>
                <span>默写正确！</span>
              </div>
            )}
            {dictateDone && !dictateCorrect && (
              <div className="dictate-feedback wrong">
                <span>😢</span>
                <span>正确拼写：</span>
                <span className="dictate-correct-word">{currentWord?.word}</span>
              </div>
            )}
            {!dictateDone && (
              <div className="dictate-hint">
                请在横线上填写单词（共 {currentWord?.word.length} 个字母）
              </div>
            )}
          </div>
        )}

        {currentStage === 'practice' && (
          <div className="practice-area">
            <div className="practice-hint">请选择这个单词的正确含义</div>
            <div className="practice-options">
              {practiceOptions.map((option, idx) => {
                let optionClass = 'practice-option';
                if (practiceSelected !== null) {
                  if (option === currentWord?.meaning) {
                    optionClass += ' correct';
                  } else if (option === practiceSelected) {
                    optionClass += ' wrong';
                  }
                }
                return (
                  <button
                    key={idx}
                    className={optionClass}
                    onClick={() => handlePracticeSelect(option)}
                    disabled={practiceSelected !== null}
                  >
                    <span className="practice-option-label">{String.fromCharCode(65 + idx)}</span>
                    <span className="practice-option-text">{option}</span>
                  </button>
                );
              })}
            </div>
            {practiceSelected !== null && (
              <div className={`practice-feedback ${practiceCorrect ? 'correct' : 'wrong'}`}>
                {practiceCorrect ? '🎉 回答正确！' : '😊 再接再厉！'}
              </div>
            )}
          </div>
        )}

        {currentStage === 'spell' && (
          <div className="spell-area">
            {spellDone && (
              <div className="spell-result-card correct">
                <div className="spell-result-icon">🎉</div>
                <div className="spell-result-text">拼写正确！</div>
              </div>
            )}
            {!spellDone && spellSelectedParts.length === spellParts.length && (
              <div className="spell-result-card wrong">
                <div className="spell-result-icon">😢</div>
                <div className="spell-result-text">再试一次吧！</div>
              </div>
            )}
            {!spellDone && (
              <div className="spell-hint">请按顺序点击单词的各个部分</div>
            )}
            <div className="spell-parts-row">
              {spellParts.map((part, idx) => {
                const usedInPosition = spellSelectedParts.indexOf(part);
                const isUsed = usedInPosition !== -1 && usedInPosition < spellSelectedParts.length;
                return (
                  <button
                    key={idx}
                    className={`spell-part-btn ${isUsed ? 'used' : ''}`}
                    onClick={() => handleSpellPartSelect(part)}
                    disabled={isUsed || spellDone}
                  >
                    {part}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStage === 'read' ? (
          <div className="read-practice-area">
            <div className="read-hint">先听发音，再点击麦克风跟读</div>
            <button
              className={`read-mic-btn ${isRecording ? 'recording' : ''}`}
              onClick={toggleReadRecording}
              disabled={!speechSupported}
            >
              <i className={`fas fa-microphone${isRecording ? '-slash' : ''}`}></i>
            </button>
            <div className="read-mic-label">
              {isRecording ? '录音中，点击停止' : '点击录音'}
            </div>
            {isRecording && (
              <div className="read-wave">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            )}
            {readSpeechText && !isRecording && (
              <div className="read-result">
                <div className="read-result-label">你说的：</div>
                <div className="read-result-text">{readSpeechText}</div>
                {currentWord && (
                  <div className={`read-match ${readSpeechText.toLowerCase().trim() === currentWord.word.toLowerCase() ? 'correct' : 'wrong'}`}>
                    {readSpeechText.toLowerCase().trim() === currentWord.word.toLowerCase() ? '✓ 发音正确！' : `✗ 正确发音：${currentWord.word}`}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : currentStage === 'learn' ? (
          <>
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
                <button className="speak-btn" onClick={() => {
                  const text = currentWord?.example || (currentWord ? generateExample(currentWord.word, currentWord.type, currentWord.meaning) : '');
                  playSentenceAudio(text);
                }}>🔊</button>
              </div>
              <div className="example-cn">{exampleCnLoading ? '翻译中...' : (exampleCn || currentWord?.meaning || '...')}</div>
            </div>
          </>
        ) : null}
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