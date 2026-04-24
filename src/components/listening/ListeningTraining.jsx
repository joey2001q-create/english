import { useState, useRef, useEffect } from 'react';
import { sendAIMessage } from '../../services/aiService';
import { knowledgeBase } from '../../data/knowledgeBase';
import { gaokaoListeningExams } from '../../data/gaokaoListeningData';
import { zhongkaoListeningExams } from '../../data/zhongkaoListeningData';

const modeCards = (currentExamType) => [
  { key: 'exam', icon: '📜', title: '历年听力真题', desc: currentExamType === 'gaokao' ? '高考听力真题实战演练' : '中考听力真题实战演练', tag: '真题演练' },
  { key: 'review', icon: '🔄', title: '错题回炉', desc: '归因分析 → 强化练习 → 场景重测', tag: '智能闭环' },
];

function saveWrongQuestion(question, userAnswer, examType, examTitle) {
  const wrongQuestions = JSON.parse(localStorage.getItem('listening_wrong_questions') || '[]');
  
  const wrongItem = {
    id: `${examType}_${examTitle}_${question.id}_${Date.now()}`,
    question: question.question,
    options: question.options,
    correct: question.correct,
    userAnswer: userAnswer,
    transcript: question.transcript,
    highlight: question.highlight,
    analysis: question.analysis,
    examType,
    examTitle,
    createdAt: new Date().toLocaleString(),
  };
  
  const exists = wrongQuestions.some(
    item => item.question === question.question && item.correct === question.correct
  );
  
  if (!exists) {
    wrongQuestions.unshift(wrongItem);
    localStorage.setItem('listening_wrong_questions', JSON.stringify(wrongQuestions.slice(0, 100)));
  }
}

function getWrongQuestions() {
  return JSON.parse(localStorage.getItem('listening_wrong_questions') || '[]');
}

function deleteWrongQuestion(id) {
  const wrongQuestions = getWrongQuestions();
  const filtered = wrongQuestions.filter(item => item.id !== id);
  localStorage.setItem('listening_wrong_questions', JSON.stringify(filtered));
  return filtered;
}

function clearWrongQuestions() {
  localStorage.removeItem('listening_wrong_questions');
}

export default function ListeningTraining() {
  const [mode, setMode] = useState('cards');
  const [examType, setExamType] = useState('gaokao');
  const [selectedExam, setSelectedExam] = useState(null);
  const [view, setView] = useState('list');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [activeTab, setActiveTab] = useState('result');
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [reviewExamType, setReviewExamType] = useState('all');
  const [isTyping, setIsTyping] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioError, setAudioError] = useState(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const chatRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (mode === 'review') {
      setWrongQuestions(getWrongQuestions());
    }
  }, [mode]);

  const getCurrentExamList = () => {
    return examType === 'gaokao' ? gaokaoListeningExams : zhongkaoListeningExams;
  };

  const getCurrentExamTypeName = () => {
    return examType === 'gaokao' ? '高考' : '中考';
  };

  const handleExamTypeSwitch = (newType) => {
    if (newType === examType) return;
    setExamType(newType);
    setSelectedExam(null);
    setView('list');
    setSubmitted(false);
    setAnswers({});
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      setAudioPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      console.log('[Audio] Audio element not ready yet');
      return;
    }

    console.log('[Audio] Setting up audio event listeners');

    const handleTimeUpdate = () => {
      setAudioProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      console.log('[Audio] Metadata loaded, duration:', audio.duration);
      setAudioDuration(audio.duration);
      setAudioLoaded(true);
      setAudioError(null);
    };

    const handleEnded = () => {
      console.log('[Audio] Playback ended');
      setAudioPlaying(false);
      setAudioProgress(0);
    };

    const handleError = (e) => {
      console.error('[Audio] Error:', e, 'audio.error:', audio.error);
      const errorMsg = audio.error ? audio.error.message : '未知错误';
      setAudioError(`音频加载失败: ${errorMsg}`);
      setAudioPlaying(false);
      setAudioLoaded(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const handleSelectMode = (m) => {
    setMode(m);
    setView('list');
    setSelectedExam(null);
    setSubmitted(false);
    setAnswers({});
    setScore(0);
    setHistory([]);
  };

  const handleBack = () => {
    if (view === 'result') {
      setView('exam');
    } else if (view === 'exam') {
      setView('list');
      setSelectedExam(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        setAudioPlaying(false);
        setAudioLoaded(false);
      }
    } else if (view === 'list') {
      setMode('cards');
    }
    setSubmitted(false);
    setAnswers({});
    setScore(0);
  };

  const handleSelectExam = (exam) => {
    setSelectedExam(exam);
    setQuestions(exam.questions);
    setAnswers({});
    setCurrentQuestion(0);
    setSubmitted(false);
    setView('exam');
    setActiveTab('result');
    setAudioError(null);
    setAudioLoaded(false);
    setAudioProgress(0);
    setAudioDuration(0);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioPlaying(false);
      console.log('[Audio] Setting src:', exam.audioUrl);
      audioRef.current.src = exam.audioUrl;
      audioRef.current.load();
      console.log('[Audio] Load called, readyState:', audioRef.current.readyState);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      } else {
        saveWrongQuestion(q, answers[q.id] || '未作答', examType, selectedExam?.title + ' ' + selectedExam?.region || '未知试卷');
      }
    });
    setScore(correctCount);
    setSubmitted(true);
    setView('result');
    setActiveTab('result');
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
  };

  const handleDeleteWrong = (id) => {
    const updated = deleteWrongQuestion(id);
    setWrongQuestions(updated);
  };

  const handleClearWrong = () => {
    clearWrongQuestions();
    setWrongQuestions([]);
  };

  const toggleAudio = async () => {
    if (!audioRef.current || !selectedExam) return;
    
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      if (!audioLoaded) {
        setAudioError('音频正在加载中，请稍候...');
        audioRef.current.load();
        return;
      }
      try {
        await audioRef.current.play();
        setAudioPlaying(true);
        setAudioError(null);
      } catch (err) {
        console.error('Audio play error:', err);
        if (err.name === 'NotAllowedError') {
          setAudioError('浏览器阻止了自动播放，请点击页面后重试');
        } else {
          setAudioError('播放失败，请刷新页面重试');
        }
        setAudioPlaying(false);
      }
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getGrade = () => {
    const percent = (score / questions.length) * 100;
    if (percent >= 90) return { level: 'A', label: '优秀', color: '#27ae60' };
    if (percent >= 80) return { level: 'B', label: '良好', color: '#3498db' };
    if (percent >= 60) return { level: 'C', label: '及格', color: '#f39c12' };
    return { level: 'D', label: '不及格', color: '#e74c3c' };
  };

  const renderMsg = (msg, idx) => {
    if (msg.role === 'system') {
      return <div key={idx} className="msg system">{msg.content}</div>;
    }
    return <div key={idx} className={`msg ${msg.role}`}>{msg.content}</div>;
  };

  const buildListeningQAContext = () => {
    const wrongQuestionsList = getWrongQuestions();
    let context = '';

    if (questions.length > 0 && submitted) {
      context += `\n【当前试卷信息】\n试卷名称：${selectedExam?.title || '未知试卷'} ${selectedExam?.region || ''}\n考试类型：高考\n得分：${score}/${questions.length}\n\n【听力原文】\n${selectedExam?.transcript || '暂无原文'}\n\n【题目详情】\n`;
      questions.forEach((q, idx) => {
        const isCorrect = answers[q.id] === q.correct;
        context += `第${idx + 1}题：${q.question}\n选项：${q.options.join(' | ')}\n你的答案：${answers[q.id] || '未作答'} ${isCorrect ? '✓正确' : '✗错误'}\n正确答案：${q.correct}\n听力原文：${q.transcript}\n解析：${q.analysis}\n\n`;
      });
    }

    if (wrongQuestionsList.length > 0) {
      context += `\n【错题库信息】\n共有${wrongQuestionsList.length}道错题\n`;
      wrongQuestionsList.slice(0, 5).forEach((item, idx) => {
        context += `错题${idx + 1}：${item.question}\n你的答案：${item.userAnswer} | 正确答案：${item.correct}\n听力原文：${item.transcript}\n来源：${item.examTitle}\n\n`;
      });
    }

    return context;
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;
    
    setHistory(prev => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      const systemPrompt = knowledgeBase.functions.listening.modes.qa.instruction;
      const contextInfo = buildListeningQAContext();
      
      const enhancedPrompt = `${systemPrompt}\n\n【当前学生答题情况】${contextInfo}`;
      
      const messages = history.map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content,
      }));
      messages.push({ role: 'user', content: text });
      
      const response = await sendAIMessage(messages, {
        systemPrompt: enhancedPrompt,
        temperature: 0.7,
        maxTokens: 1500,
      });
      
      setHistory(prev => [...prev, { role: 'ai', content: response.content }]);
    } catch (error) {
      console.error('[听力答疑] AI调用失败:', error);
      setHistory(prev => [...prev, { 
        role: 'ai', 
        content: `抱歉，AI服务暂时不可用。\n\n错误信息：${error.message}\n\n你可以尝试：\n1. 检查API配置是否正确\n2. 稍后再试` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredWrongQuestions = reviewExamType === 'all' 
    ? wrongQuestions 
    : wrongQuestions.filter(q => q.examType === reviewExamType);

  const renderCardsView = () => (
    <div className="listen-cards-grid">
      {modeCards(examType).map((card) => (
        <div
          key={card.key}
          className="listen-card"
          onClick={() => handleSelectMode(card.key)}
        >
          <div className="listen-card-icon">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
          <div className="listen-card-tag">{card.tag}</div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => {
    const currentExamList = getCurrentExamList();
    const groupedExams = {};
    currentExamList.forEach(exam => {
      if (!groupedExams[exam.year]) {
        groupedExams[exam.year] = [];
      }
      groupedExams[exam.year].push(exam);
    });

    return (
      <div className="listening-exam-page">
        <div className="exam-header">
          <button className="back-btn" onClick={handleBack}>← 返回</button>
          <h2>📜 历年听力真题</h2>
        </div>

        <div className="exam-tabs">
          <button
            className={`tab-btn ${examType === 'gaokao' ? 'active' : ''}`}
            onClick={() => handleExamTypeSwitch('gaokao')}
          >
            高考
          </button>
          <button
            className={`tab-btn ${examType === 'zhongkao' ? 'active' : ''}`}
            onClick={() => handleExamTypeSwitch('zhongkao')}
          >
            中考
          </button>
        </div>

        <div className="exam-list-area">
          <div className="exam-year-section">
            {Object.keys(groupedExams).sort((a, b) => b - a).map(year => (
              <div key={year} className="exam-year-group">
                <h3 className="year-label">{year}年</h3>
                <div className="exam-year-grid">
                  {groupedExams[year].map((exam) => (
                    <div
                      key={exam.id}
                      className="exam-year-card"
                      onClick={() => handleSelectExam(exam)}
                    >
                      <div className="exam-year-icon">🎧</div>
                      <div className="exam-year-title">{exam.region}</div>
                      <div className="exam-year-info">{exam.questions.length}道题目</div>
                      <div className="exam-year-action">开始答题 →</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="listen-instruction">
          <p>💡 <strong>提示：</strong></p>
          <ul>
            <li>点击对应试卷卡片进入答题界面</li>
            <li>答题完成后提交试卷，AI自动批改评分</li>
            <li>查看逐题解析和听力原文高亮标注</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderExamView = () => {
    const progressPercent = questions.length > 0
      ? (Object.keys(answers).length / questions.length) * 100
      : 0;

    return (
      <div className="listening-answer-page">
        <div className="answer-header">
          <button className="back-btn" onClick={handleBack}>← 返回</button>
          <h2>{selectedExam?.title} {selectedExam?.region}</h2>
          <div className="answer-progress">
            已答: {Object.keys(answers).length}/{questions.length}
          </div>
        </div>

        <div className="audio-player">
          <div className="audio-info">
            <div className="audio-title">🎧 听力音频</div>
            <div className="audio-time">
              {audioLoaded ? `${formatTime(audioProgress)} / ${formatTime(audioDuration)}` : (audioError || '加载中...')}
            </div>
          </div>
          <div className="audio-controls">
            <button
              className={`audio-play-btn ${audioPlaying ? 'playing' : ''} ${!audioLoaded ? 'loading' : ''}`}
              onClick={toggleAudio}
              disabled={!audioLoaded && !audioError}
            >
              {!audioLoaded ? '⏳' : (audioPlaying ? '⏸' : '▶')}
            </button>
            <div className="audio-progress-bar">
              <div
                className="audio-progress-fill"
                style={{ width: `${audioDuration > 0 ? (audioProgress / audioDuration) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {audioError && (
          <div className="audio-error-message">
            ⚠️ {audioError}
          </div>
        )}

        <div className="progress-bar-container">
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="progress-text">答题进度: {Math.round(progressPercent)}%</div>
        </div>

        {selectedExam?.fullContent && (
          <div className="exam-full-content">
            <h3 className="full-content-title">📖 听力原文</h3>
            <pre className="full-content-text">{selectedExam.fullContent}</pre>
          </div>
        )}

        {selectedExam?.transcript && (
          <div className="exam-transcript-content">
            <h3 className="transcript-title">🎧 听力音频原文</h3>
            <pre className="transcript-text">{selectedExam.transcript}</pre>
          </div>
        )}

        <div className="questions-area">
          {questions.map((q, idx) => (
            <div key={q.id} className={`question-card ${submitted ? 'submitted' : ''}`}>
              <div className="question-number">第{idx + 1}题</div>
              <div className="question-text">{q.question}</div>
              <div className="question-options">
                {q.options.map((opt, optIdx) => {
                  const optionLetter = ['A', 'B', 'C'][optIdx];
                  const isSelected = answers[q.id] === optionLetter;
                  const isCorrect = q.correct === optionLetter;
                  const isWrong = submitted && isSelected && !isCorrect;

                  return (
                    <button
                      key={optIdx}
                      className={`option-btn ${isSelected ? 'selected' : ''} ${submitted && isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                      onClick={() => !submitted && handleAnswerSelect(q.id, optionLetter)}
                      disabled={submitted}
                    >
                      {opt}
                      {submitted && isCorrect && <span className="correct-mark">✓</span>}
                      {isWrong && <span className="wrong-mark">✗</span>}
                    </button>
                  );
                })}
              </div>
              {!submitted && answers[q.id] && (
                <div className="user-answer-hint">
                  你的选择: {answers[q.id]}
                </div>
              )}
            </div>
          ))}
        </div>

        {!submitted && (
          <div className="submit-area">
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
            >
              <i className="fas fa-paper-plane"></i> 提交试卷
            </button>
            <p className="submit-tip">
              {Object.keys(answers).length < questions.length
                ? `还有${questions.length - Object.keys(answers).length}题未作答`
                : '全部题目已作答，可以提交'}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderResultView = () => {
    const grade = getGrade();
    
    return (
      <div className="listening-result-page">
        <div className="result-header">
          <button className="back-btn" onClick={handleBack}>← 返回</button>
          <h2>📝 答题结果</h2>
        </div>

        <div className="result-tabs">
          <button
            className={`result-tab ${activeTab === 'result' ? 'active' : ''}`}
            onClick={() => setActiveTab('result')}
          >
            成绩报告
          </button>
          <button
            className={`result-tab ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            逐题解析
          </button>
          <button
            className={`result-tab ${activeTab === 'transcript' ? 'active' : ''}`}
            onClick={() => setActiveTab('transcript')}
          >
            听力原文
          </button>
          <button
            className={`result-tab ${activeTab === 'qa' ? 'active' : ''}`}
            onClick={() => setActiveTab('qa')}
          >
            AI答疑
          </button>
        </div>

        {activeTab === 'result' && (
          <div className="score-report">
            <div className="score-circle-large">
              <div className="score-num-large">{score}</div>
              <div className="score-total">/{questions.length}</div>
            </div>
            <div className="grade-badge" style={{ background: grade.color }}>
              {grade.level} · {grade.label}
            </div>
            <div className="score-stats">
              <div className="stat-item correct">
                <span className="stat-icon">✓</span>
                <span className="stat-value">{score}</span>
                <span className="stat-label">正确</span>
              </div>
              <div className="stat-item wrong">
                <span className="stat-icon">✗</span>
                <span className="stat-value">{questions.length - score}</span>
                <span className="stat-label">错误</span>
              </div>
            </div>
            <div className="exam-info-result">
              <span>{selectedExam?.title} {selectedExam?.region}</span>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="analysis-area">
            {questions.map((q, idx) => {
              const isCorrect = answers[q.id] === q.correct;
              return (
                <div key={q.id} className={`analysis-card ${isCorrect ? 'correct-card' : 'wrong-card'}`}>
                  <div className="analysis-header">
                    <span className="analysis-num">第{idx + 1}题</span>
                    <span className={`analysis-status ${isCorrect ? 'correct' : 'wrong'}`}>
                      {isCorrect ? '✓ 正确' : '✗ 错误'}
                    </span>
                  </div>
                  <div className="analysis-question">{q.question}</div>
                  <div className="analysis-answers">
                    <div className="answer-row user">
                      <span className="answer-label">你的答案:</span>
                      <span className={`answer-value ${isCorrect ? 'correct' : 'wrong'}`}>{answers[q.id] || '未作答'}</span>
                    </div>
                    <div className="answer-row correct">
                      <span className="answer-label">正确答案:</span>
                      <span className="answer-value correct">{q.correct}</span>
                    </div>
                  </div>
                  <div className="analysis-tip">
                    <i className="fas fa-lightbulb"></i>
                    <span>{q.analysis}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="transcript-area">
            <div className="transcript-header">
              <h3>听力原文（答案关键句已高亮）</h3>
            </div>
            {questions.map((q, idx) => (
              <div key={q.id} className="transcript-item">
                <div className="transcript-num">第{idx + 1}题原文</div>
                <div className="transcript-text">
                  {q.transcript.split(q.highlight).map((part, i, arr) => (
                    i < arr.length - 1 ? (
                      <span key={i}>
                        {part}
                        <span className="highlight-text">{q.highlight}</span>
                      </span>
                    ) : part
                  ))}
                </div>
                <div className="transcript-answer">
                  答案: <span className="correct-answer">{q.correct}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'qa' && (
          <div className="qa-area">
            <div className="qa-tip">
              <i className="fas fa-comments"></i>
              <span>有任何疑问？向AI提问，获取详细讲解</span>
            </div>
            <div className="chat-box">
              <div className="chat-msgs" ref={chatRef}>
                {history.length === 0 && !isTyping && (
                  <div className="msg system">
                    你可以问我关于这套听力试卷的问题，例如：
                    {"\n"}• 第1题为什么选A？
                    {"\n"}• 这道题的听力技巧是什么？
                    {"\n"}• 帮我分析这道错题的原因
                  </div>
                )}
                {history.map(renderMsg)}
                {isTyping && (
                  <div className="msg ai">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </div>
              <div className="input-row">
                <textarea
                  placeholder="输入问题，AI为你答疑解惑..."
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                />
                <button className="btn-send" onClick={handleSend} disabled={isTyping || !inputValue.trim()}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderReviewView = () => (
    <div className="listening-review-page">
      <div className="review-header">
        <button className="back-btn" onClick={handleBack}>← 返回</button>
        <h2>🔄 错题回炉</h2>
        {wrongQuestions.length > 0 && (
          <button className="clear-all-btn" onClick={handleClearWrong}>
            清空全部
          </button>
        )}
      </div>

      <div className="review-stats">
        <div className="review-stat-item">
          <span className="stat-num">{wrongQuestions.length}</span>
          <span className="stat-label">道错题</span>
        </div>
      </div>

      <div className="review-filter-tabs">
        <button
          className={`filter-tab ${reviewExamType === 'all' ? 'active' : ''}`}
          onClick={() => setReviewExamType('all')}
        >
          全部
        </button>
        <button
          className={`filter-tab ${reviewExamType === 'gaokao' ? 'active' : ''}`}
          onClick={() => setReviewExamType('gaokao')}
        >
          高考
        </button>
        <button
          className={`filter-tab ${reviewExamType === 'zhongkao' ? 'active' : ''}`}
          onClick={() => setReviewExamType('zhongkao')}
        >
          中考
        </button>
      </div>

      {filteredWrongQuestions.length === 0 ? (
        <div className="empty-wrong-list">
          <div className="empty-icon">🎉</div>
          <div className="empty-text">
            {reviewExamType === 'all' ? '暂无错题记录' : `暂无${reviewExamType === 'gaokao' ? '高考' : reviewExamType === 'zhongkao' ? '中考' : ''}错题`}
          </div>
          <div className="empty-tip">继续努力，保持正确率！</div>
        </div>
      ) : (
        <div className="wrong-list-area">
          {filteredWrongQuestions.map((item, idx) => (
            <div key={item.id} className="wrong-item-card">
              <div className="wrong-item-header">
                <span className="wrong-item-num">第{idx + 1}题</span>
                <span className="wrong-item-source">
                  {item.examTitle}
                </span>
                <button 
                  className="wrong-item-delete" 
                  onClick={() => handleDeleteWrong(item.id)}
                  title="移出错题本"
                >
                  ✕
                </button>
              </div>
              <div className="wrong-item-question">{item.question}</div>
              <div className="wrong-item-options">
                {item.options.map((opt, i) => {
                  const letter = ['A', 'B', 'C'][i];
                  const isUserAnswer = letter === item.userAnswer;
                  const isCorrect = letter === item.correct;
                  return (
                    <div 
                      key={i} 
                      className={`wrong-option ${isUserAnswer ? 'user-wrong' : ''} ${isCorrect ? 'correct-answer' : ''}`}
                    >
                      {opt}
                      {isUserAnswer && <span className="wrong-tag">你的答案</span>}
                      {isCorrect && <span className="correct-tag">正确答案</span>}
                    </div>
                  );
                })}
              </div>
              <div className="wrong-item-transcript">
                <div className="transcript-label">听力原文：</div>
                <div className="transcript-content">
                  {item.transcript.split(item.highlight).map((part, i, arr) => (
                    i < arr.length - 1 ? (
                      <span key={i}>
                        {part}
                        <span className="highlight-text">{item.highlight}</span>
                      </span>
                    ) : part
                  ))}
                </div>
              </div>
              <div className="wrong-item-analysis">
                <i className="fas fa-lightbulb"></i>
                <span>{item.analysis}</span>
              </div>
              <div className="wrong-item-time">记录时间：{item.createdAt}</div>
            </div>
          ))}
        </div>
      )}

      <div className="review-chat-section">
        <div className="review-chat-header">
          <i className="fas fa-robot"></i>
          <span>AI错题分析助手</span>
        </div>
        <div className="chat-box">
          <div className="chat-msgs" ref={chatRef}>
            {history.length === 0 && !isTyping && (
              <div className="msg system">
                错题已加载，你可以问我任何关于这些错题的问题，例如：
                {"\n"}• 这道题为什么选C？
                {"\n"}• 帮我总结这些错题的共同点
                {"\n"}• 这类题有什么解题技巧？
              </div>
            )}
            {history.map(renderMsg)}
            {isTyping && (
              <div className="msg ai">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          <div className="input-row">
            <textarea
              placeholder="输入问题，AI为你分析错题原因..."
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button className="btn-speak" title="朗读">🔊</button>
            <button className="btn-photo" title="拍照">📷</button>
            <button className="btn-send" onClick={handleSend} disabled={isTyping || !inputValue.trim()}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="listening-training-module">
      <audio ref={audioRef} preload="metadata" />
      <div className="page-header">
        <div className="page-header-icon">🎧</div>
        <div className="page-header-info">
          <h2>听力训练</h2>
          <p>真题演练 · 错题回炉</p>
        </div>
      </div>

      {mode === 'cards' && renderCardsView()}
      {mode === 'exam' && view === 'list' && renderListView()}
      {mode === 'exam' && view === 'exam' && renderExamView()}
      {mode === 'exam' && view === 'result' && renderResultView()}
      {mode === 'review' && renderReviewView()}
    </div>
  );
}
