﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../../data/knowledgeBase';

const essayModes = knowledgeBase.functions.essay.modes;
const modeCards = [
  { key: 'correct', icon: '📷', title: essayModes.correct.title, desc: essayModes.correct.description, tag: '语法纠错' },
  { key: 'polish', icon: '✨', title: essayModes.polish.title, desc: essayModes.polish.description, tag: '文采提升' },
  { key: 'structure', icon: '📐', title: essayModes.structure.title, desc: essayModes.structure.description, tag: '框架升级' },
];
const gradeItems = [
  { label: '中考满分', value: '20分' },
  { label: '高考满分', value: '25分' },
  { label: '高档分', value: `${essayModes.correct.gradingStandard.zhongkao.high} / ${essayModes.correct.gradingStandard.gaokao.high}` },
  { label: '中档分', value: `${essayModes.correct.gradingStandard.zhongkao.mid} / ${essayModes.correct.gradingStandard.gaokao.mid}` },
];
const wordReplaceTable = Object.entries(essayModes.structure.replacementWords).map(([title, items]) => ({
  title,
  items: items.map(i => `${i.from} → ${i.to}`).join('\n')
}));
const polishExample = essayModes.polish.upgradeExample;

const mockCorrectionResult = {
  score: 16,
  maxScore: 20,
  errors: [
    { id: 1, original: 'He go to school every day.', corrected: 'He goes to school every day.', reason: '主谓不一致：第三人称单数主语He，动词需加es' },
    { id: 2, original: 'I have many homeworks.', corrected: 'I have much homework.', reason: '名词单复数错误：homework是不可数名词' },
    { id: 3, original: 'She like reading book.', corrected: 'She likes reading books.', reason: '主谓不一致 + 可数名词需复数' },
  ],
  suggestions: [
    '建议增加过渡词（如However, Furthermore）使文章更连贯',
    '可使用定语从句丰富句子结构',
    '开头可加入Hook吸引读者注意',
  ],
};

export default function EssayCorrection() {
  const [mode, setMode] = useState('cards');
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctionResult, setCorrectionResult] = useState(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (showResult && correctionResult) {
      const targetScore = correctionResult.score;
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setAnimatedScore(current);
        if (current >= targetScore) {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showResult, correctionResult]);

  const handleSelectMode = (m) => {
    setMode(m);
    setHistory([]);
    setShowResult(false);
    setCorrectionResult(null);
    setIsCorrecting(false);
  };

  const handleBack = () => {
    setMode('cards');
    setHistory([]);
    setShowResult(false);
    setCorrectionResult(null);
    setIsCorrecting(false);
  };

  const handleSubmitCorrection = () => {
    if (!inputValue.trim()) return;
    setIsCorrecting(true);
    setShowResult(false);
    setHistory((prev) => [...prev, { role: 'user', content: inputValue }]);

    setTimeout(() => {
      setCorrectionResult(mockCorrectionResult);
      setShowResult(true);
      setIsCorrecting(false);
      setHistory((prev) => [...prev, { role: 'ai', content: '批改完成！请查看下方详细结果。' }]);
    }, 2000);
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setHistory((prev) => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setTimeout(() => {
      setHistory((prev) => [...prev, { role: 'ai', content: '（模拟回复）\n\n很好！让我们继续...' }]);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (mode === 'correct') {
        handleSubmitCorrection();
      } else {
        handleSend();
      }
    }
  };

  const renderMsg = (msg, idx) => {
    if (msg.role === 'system') {
      return <div key={idx} className="msg system">{msg.content}</div>;
    }
    return <div key={idx} className={`msg ${msg.role}`}>{msg.content}</div>;
  };

  return (
    <div className="essay-correction-module">
      <div className="page-header">
        <div className="page-header-icon">✍️</div>
        <div className="page-header-info">
          <h2>作文批改</h2>
          <p>拍照批改 · 智能润色 · 结构优化</p>
        </div>
      </div>

      {mode === 'cards' && (
        <div className="essay-cards-grid">
          {modeCards.map((card) => (
            <div
              key={card.key}
              className="essay-card"
              onClick={() => handleSelectMode(card.key)}
            >
              <div className="essay-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <div className="essay-card-tag">{card.tag}</div>
            </div>
          ))}
        </div>
      )}

      {mode !== 'cards' && (
        <div className="essay-func-container">
          <div className="func-header">
            <button className="func-back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> 返回
            </button>
            <span id="essay-func-title">
              {mode === 'correct' ? '拍照批改' : mode === 'polish' ? '智能润色' : '结构优化'}
            </span>
          </div>

          {mode === 'correct' && (
            <div className="essay-sub-panel">
              <div className="essay-instruction">
                <p>💡 <strong>使用方式：</strong></p>
                <ul>
                  <li>点击📷拍照，或粘贴作文文本</li>
                  <li>AI充当阅卷老师，找出所有语法错误</li>
                  <li>不仅要纠正，还要告诉你为什么错</li>
                </ul>
              </div>
              <div className="essay-grading-hint">
                <div className="essay-grading-title">📊 评分标准参考</div>
                <div className="essay-grading-grid">
                  {gradeItems.map((item) => (
                    <div key={item.label} className="essay-grade-item">
                      <span className="grade-label">{item.label}</span>
                      <span className="grade-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {showResult && correctionResult && (
                <div className="correction-result">
                  <div className="score-display">
                    <div className="score-circle">
                      <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="8" />
                        <circle
                          cx="50" cy="50" r="45" fill="none" stroke="#9B59B6" strokeWidth="8"
                          strokeDasharray={`${(animatedScore / correctionResult.maxScore) * 283} 283`}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                          style={{ transition: 'stroke-dasharray 0.5s ease' }}
                        />
                      </svg>
                      <div className="score-text">
                        <span className="score-num">{animatedScore}</span>
                        <span className="score-max">/{correctionResult.maxScore}</span>
                      </div>
                    </div>
                    <div className="score-label">批改得分</div>
                  </div>

                  <div className="error-list">
                    <div className="error-list-title">📝 错误详情</div>
                    {correctionResult.errors.map((err) => (
                      <div key={err.id} className="error-item">
                        <div className="error-original">
                          <span className="error-icon">❌</span>
                          <span className="error-text strikethrough">{err.original}</span>
                        </div>
                        <div className="error-corrected">
                          <span className="error-icon">✅</span>
                          <span className="error-text">{err.corrected}</span>
                        </div>
                        <div className="error-reason">💡 {err.reason}</div>
                      </div>
                    ))}
                  </div>

                  <div className="suggestions">
                    <div className="suggestions-title">💡 提升建议</div>
                    <ul>
                      {correctionResult.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {mode === 'polish' && (
            <div className="essay-sub-panel">
              <div className="essay-instruction">
                <p>💡 <strong>学习重点：重点看AI提供的"升级建议"</strong></p>
                <ul>
                  <li>通过对比"我的初稿"和"AI升级稿"，直观感知高级语法</li>
                  <li>简单句 → 复合句（定语从句/状语从句）</li>
                  <li>低级词 → 高级词（good→outstanding, important→crucial）</li>
                  <li>增加过渡词（however/furthermore/additionally）</li>
                </ul>
              </div>
              <div className="essay-demo">
                <div className="demo-title">✨ 润色对比示例</div>
                <div className="essay-demo-compare">
                  <div className="essay-demo-item original">
                    <div className="demo-label">❌ 我的初稿</div>
                    <div className="demo-content">{polishExample.original}</div>
                  </div>
                  <div className="essay-demo-arrow">↓</div>
                  <div className="essay-demo-item upgraded">
                    <div className="demo-label">✅ AI升级稿</div>
                    <div className="demo-content">{polishExample.upgraded}</div>
                  </div>
                </div>
                <div className="essay-demo-note">
                  <strong>升级点：</strong>{polishExample.notes}
                </div>
              </div>
            </div>
          )}

          {mode === 'structure' && (
            <div className="essay-sub-panel">
              <div className="essay-instruction">
                <p>💡 <strong>刘彬老师"模板+替换词"万能写作法</strong></p>
                <ul>
                  <li>开头：Hook吸引读者 + 亮出观点</li>
                  <li>中间：论点1+论据 / 论点2+论据 / 论点3+论据</li>
                  <li>结尾：总结观点 + 升华主题 + 呼吁行动</li>
                </ul>
              </div>
              <div className="essay-structure-frame">
                <div className="essay-frame-title">📝 常用替换词表</div>
                <div className="essay-word-grid">
                  {wordReplaceTable.map((col) => (
                    <div key={col.title} className="essay-word-col">
                      <div className="word-col-title">{col.title}</div>
                      <div className="word-items">{col.items}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="chat-box">
            <div className="chat-msgs" ref={chatRef}>
              {history.map(renderMsg)}
              {isCorrecting && (
                <div className="msg ai typing show">
                  AI正在批改中<span></span><span></span><span></span>
                </div>
              )}
            </div>
            <div className="input-row">
              <textarea
                placeholder="粘贴你的作文，AI为你批改或润色"
                rows={3}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="btn-photo" title="拍照批改">📷</button>
              <button
                className="btn-send"
                onClick={mode === 'correct' ? handleSubmitCorrection : handleSend}
                disabled={isCorrecting}
              >
                <i className="fas fa-paper-plane"></i>{mode === 'correct' ? '批改' : '发送'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

