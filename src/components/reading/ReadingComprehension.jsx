﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../../data/knowledgeBase';

const readingModes = knowledgeBase.functions.reading.modes;
const modeCards = [
  { key: 'parse', icon: '🌳', title: readingModes.parse.title, desc: readingModes.parse.description, tag: '结构分析' },
  { key: 'background', icon: '📚', title: readingModes.background.title, desc: readingModes.background.description, tag: '文化扫盲' },
  { key: 'structure', icon: '🗺️', title: readingModes.structure.title, desc: readingModes.structure.description, tag: '上帝视角' },
  { key: 'review', icon: '🔍', title: readingModes.review.title, desc: readingModes.review.description, tag: '智能闭环' },
];
const bgItems = readingModes.background.commonTopics.map(t => ({
  icon: t.icon,
  name: t.query,
  query: t.query
}));
const signalItems = Object.entries(readingModes.structure.signalWords).map(([type, words]) => ({ type, words }));
const demoArticle = knowledgeBase.readingArticles[0];

export default function ReadingComprehension() {
  const [mode, setMode] = useState('cards');
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState({});
  const [expandedAnalysis, setExpandedAnalysis] = useState({});
  const [showArticle, setShowArticle] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

  const handleSelectMode = (m) => {
    setMode(m);
    setHistory([]);
    setSelectedOption({});
    setExpandedAnalysis({});
    setShowArticle(false);
  };

  const handleBack = () => {
    setMode('cards');
    setHistory([]);
    setSelectedOption({});
    setExpandedAnalysis({});
    setShowArticle(false);
  };

  const handleSelectBgItem = (item) => {
    setHistory([
      { role: 'user', content: item.query },
      { role: 'ai', content: `（模拟回复）\n\n关于【${item.name}】的背景知识：\n\n这是一个常见的英语阅读背景词汇，通常出现在社会类文章中...` },
    ]);
  };

  const handleStartReview = () => {
    setShowArticle(true);
  };

  const handleOptionSelect = (questionId, option) => {
    setSelectedOption((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleToggleAnalysis = (questionId) => {
    setExpandedAnalysis((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setHistory((prev) => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setTimeout(() => {
      setHistory((prev) => [...prev, { role: 'ai', content: '（模拟回复）\n\n很好！让我们继续学习...' }]);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMsg = (msg, idx) => {
    if (msg.role === 'system') {
      return <div key={idx} className="msg system">{msg.content}</div>;
    }
    return <div key={idx} className={`msg ${msg.role}`}>{msg.content}</div>;
  };

  return (
    <div className="reading-comprehension-module">
      <div className="page-header">
        <div className="page-header-icon">📝</div>
        <div className="page-header-info">
          <h2>阅读理解</h2>
          <p>长难句拆解 · 背景知识 · 文章骨架 · 错题复盘</p>
        </div>
      </div>

      {mode === 'cards' && (
        <div className="read-cards-grid">
          {modeCards.map((card) => (
            <div
              key={card.key}
              className="read-card"
              onClick={() => handleSelectMode(card.key)}
            >
              <div className="read-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <div className="read-card-tag">{card.tag}</div>
            </div>
          ))}
        </div>
      )}

      {mode !== 'cards' && (
        <div className="read-func-container">
          <div className="func-header">
            <button className="func-back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> 返回
            </button>
            <span id="read-func-title">
              {mode === 'parse' ? '长难句拆解' : mode === 'background' ? '背景知识补充' : mode === 'structure' ? '文章骨架梳理' : '错题深度复盘'}
            </span>
          </div>

          {mode === 'parse' && (
            <div className="read-sub-panel">
              <div className="read-instruction">
                <p>💡 <strong>AI指令示例：</strong></p>
                <ul>
                  <li>"请拆解这个句子，标出主谓宾，用不同颜色标注修饰成分"</li>
                  <li>"分析这个定语从句是限定性还是非限定性"</li>
                  <li>"把这个长难句改写成三个短句，对比逻辑关系"</li>
                </ul>
              </div>
              <div className="read-demo">
                <div className="demo-title">示例：定语从句拆解</div>
                <div className="demo-original">The boy who sat under the tree reading a book belongs to my class.</div>
                <div className="read-demo-tree">
                  <div className="tree-node main">The boy</div>
                  <div className="tree-node sub">[who sat under the tree]</div>
                  <div className="tree-node sub">[reading a book]</div>
                  <div className="tree-note">↳ who引导限定性定语从句，修饰The boy；reading是现在分词作后置定语</div>
                </div>
              </div>
            </div>
          )}

          {mode === 'background' && (
            <div className="read-sub-panel">
              <div className="read-instruction">
                <p>💡 <strong>AI指令示例：</strong></p>
                <ul>
                  <li>"这篇文章提到Silicon Valley Resignation，请解释背景和情感导向"</li>
                  <li>"英国议会选举的文章里，Tory和Labour分别代表什么？"</li>
                  <li>"这篇文章的美国校园文化背景是什么？"</li>
                </ul>
              </div>
              <div className="read-bg-examples">
                <div className="read-bg-hint">常见文化背景词，点击快速查询：</div>
                <div className="read-bg-grid">
                  {bgItems.map((item) => (
                    <div
                      key={item.name}
                      className="read-bg-item"
                      onClick={() => handleSelectBgItem(item)}
                    >
                      <span className="read-bg-icon">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === 'structure' && (
            <div className="read-sub-panel">
              <div className="read-instruction">
                <p>💡 <strong>AI指令示例：</strong></p>
                <ul>
                  <li>"请为这篇文章画一个思维导图框架，标注每段核心观点"</li>
                  <li>"指出文章中的逻辑信号词（however/therefore/furthermore等）"</li>
                  <li>"分析作者的写作意图和文章结构类型"</li>
                </ul>
              </div>
              <div className="read-signal-hint">常见逻辑信号灯：</div>
              <div className="read-signals">
                {signalItems.map((item) => (
                  <div key={item.type} className="read-signal-item">
                    <span className="signal-type">{item.type}</span>
                    {item.words}
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === 'review' && (
            <div className="read-sub-panel">
              <div className="read-instruction">
                <p>💡 <strong>干扰项套路分析：</strong></p>
                <ul>
                  <li>🚫 <strong>过度推断</strong>：原文没说"所有学生"，选项说"所有学生"→扩大范围</li>
                  <li>🚫 <strong>张冠李戴</strong>：原文说A做某事，选项说B做某事→偷换主语</li>
                  <li>🚫 <strong>偷换概念</strong>：原文"improve health"，选项"cure disease"→词义扩大</li>
                  <li>🚫 <strong>无中生有</strong>：选项内容原文完全没有提及</li>
                </ul>
              </div>

              {showArticle && (
                <div className="mock-article-panel">
                  <div className="article-title">{demoArticle.title}</div>
                  <div className="article-content">{demoArticle.content}</div>
                  <div className="question-list">
                    {demoArticle.questions.map((q, idx) => (
                      <div key={q.id} className="question-item">
                        <div className="question-num">{idx + 1}. </div>
                        <div className="question-body">
                          <div className="question-text">{q.question}</div>
                          <div className="question-options">
                            {q.options.map((opt) => (
                              <button
                                key={opt}
                                className={`option-btn ${selectedOption[q.id] === opt ? 'selected' : ''} ${selectedOption[q.id] && opt[0] === q.answer ? 'correct' : ''} ${selectedOption[q.id] === opt && opt[0] !== q.answer ? 'wrong' : ''}`}
                                onClick={() => handleOptionSelect(q.id, opt)}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          {selectedOption[q.id] && (
                            <button
                              className="toggle-analysis-btn"
                              onClick={() => handleToggleAnalysis(q.id)}
                            >
                              {expandedAnalysis[q.id] ? '收起解析 ▲' : '查看解析 ▼'}
                            </button>
                          )}
                          {expandedAnalysis[q.id] && (
                            <div className="analysis-panel">
                              <div className="analysis-correct">正确答案：{q.answer}</div>
                              <div className="analysis-content">{q.analysis}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!showArticle && (
                <div className="read-review-start">
                  <div className="read-review-icon">📋</div>
                  <h4>开始错题复盘</h4>
                  <p>点击下方按钮，体验示例文章和题目</p>
                  <button className="btn-start-review" onClick={handleStartReview}>
                    <i className="fas fa-play"></i> 开始练习
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="chat-box">
            <div className="chat-msgs" ref={chatRef}>
              {history.map(renderMsg)}
            </div>
            <div className="input-row">
              <textarea
                placeholder="粘贴长难句，AI为你拆解主谓宾结构"
                rows={2}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="btn-photo" title="拍照">📷</button>
              <button className="btn-send" onClick={handleSend}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

