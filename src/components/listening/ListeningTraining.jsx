import { useState, useRef, useEffect } from 'react';

const modeCards = [
  { key: 'phonetic', icon: '🔊', title: '专项辨音训练', desc: '连读/弱读/吞音可视化拆解，录音对比纠偏', tag: '语音现象' },
  { key: 'scenario', icon: '🎭', title: '分场景练习', desc: '购物/问路/校园...套路内化，对抗性实战训练', tag: '场景词汇包' },
  { key: 'review', icon: '🔄', title: '错题回炉', desc: '归因分析 → 强化练习 → 场景重测', tag: '智能闭环' },
];

const scenarios = [
  { key: 'shopping', icon: '🛒', title: '购物场景', desc: '价格计算·折扣陷阱·单位换算' },
  { key: 'directions', icon: '🗺️', title: '问路场景', desc: '方位词·路线描述·地标建筑' },
  { key: 'school', icon: '🏫', title: '校园生活', desc: '课程安排·作业讨论·师生对话' },
  { key: 'restaurant', icon: '🍽️', title: '餐厅点餐', desc: '菜单推荐·口味询问·结账买单' },
];

export default function ListeningTraining() {
  const [mode, setMode] = useState('cards');
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const chatRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 1;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleSelectMode = (m) => {
    setMode(m);
    setHistory([]);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleBack = () => {
    setMode('cards');
    setHistory([]);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleSelectScenario = (key) => {
    const scenario = scenarios.find((s) => s.key === key);
    setHistory([
      { role: 'system', content: `开始【${scenario?.title}】场景练习` },
      { role: 'ai', content: `${scenario?.desc}\n\n输入任意内容开始练习，或告诉我你想重点练习哪个方面~` },
    ]);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setProgress(percent);
    }
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setHistory((prev) => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setTimeout(() => {
      setHistory((prev) => [...prev, { role: 'ai', content: '（模拟回复）\n\n很好！让我们继续练习...' }]);
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
      return (
        <div key={idx} className="msg system">{msg.content}</div>
      );
    }
    return (
      <div key={idx} className={`msg ${msg.role}`}>{msg.content}</div>
    );
  };

  return (
    <div className="listening-training-module">
      <div className="page-header">
        <div className="page-header-icon">🎧</div>
        <div className="page-header-info">
          <h2>听力训练</h2>
          <p>辨音训练 · 场景练习 · 错题回炉</p>
        </div>
      </div>

      {mode === 'cards' && (
        <div className="listen-cards-grid">
          {modeCards.map((card) => (
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
      )}

      {mode !== 'cards' && (
        <div className="listen-func-container">
          <div className="func-header">
            <button className="func-back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> 返回
            </button>
            <span id="listen-func-title">
              {mode === 'phonetic' ? '专项辨音训练' : mode === 'scenario' ? '分场景练习' : '错题回炉'}
            </span>
          </div>

          {mode === 'phonetic' && (
            <div className="listen-sub-panel">
              <div className="listen-instruction">
                <p>💡 <strong>AI指令示例：</strong></p>
                <ul>
                  <li>"请把这段听力原文中的连读、失去爆破用符号标出来"</li>
                  <li>"对比朗读'单词逐个读'和'自然连读'两个版本"</li>
                  <li>"分析我的录音中want to的弱读是否正确"</li>
                </ul>
              </div>
              <div className="listen-demo-row">
                <div className="listen-demo-box">
                  <div className="demo-label">原文</div>
                  <div className="demo-text">I wanna go to the store.</div>
                </div>
                <div className="listen-demo-arrow">→</div>
                <div className="listen-demo-box highlight">
                  <div className="demo-label">自然连读</div>
                  <div className="demo-text">[wana] [go] [ta] [da] [stor]</div>
                </div>
              </div>
              <div className="audio-player">
                <button className={`btn-play ${isPlaying ? 'playing' : ''}`} onClick={handlePlay}>
                  <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
                <div className="progress-bar" ref={progressRef} onClick={handleProgressClick}>
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="progress-time">{Math.floor(progress / 10)}:{String(Math.floor((progress % 10) * 6)).padStart(2, '0')}</span>
              </div>
            </div>
          )}

          {mode === 'scenario' && (
            <div className="listen-sub-panel">
              <div className="scenario-grid">
                {scenarios.map((s) => (
                  <div
                    key={s.key}
                    className="scenario-item"
                    onClick={() => handleSelectScenario(s.key)}
                  >
                    <div className="scenario-icon">{s.icon}</div>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="listen-instruction">
                <p>💡 <strong>AI指令示例：</strong></p>
                <ul>
                  <li>"我要练购物场景，帮我总结5个数字陷阱和3个反转逻辑词"</li>
                  <li>"模拟购物场景：'It is $50, but we have a 20% discount today.'"</li>
                </ul>
              </div>
            </div>
          )}

          {mode === 'review' && (
            <div className="listen-sub-panel">
              <div className="review-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>AI错题归因</h4>
                  <p>输入："这道题我听成了A，但答案是B"</p>
                </div>
              </div>
              <div className="review-arrow">↓</div>
              <div className="review-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>自动生成辨音强化包</h4>
                  <p>AI从错题库提取相关语音现象，生成专属练习</p>
                </div>
              </div>
              <div className="review-arrow">↓</div>
              <div className="review-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>场景化重测</h4>
                  <p>完成强化后，AI重新从场景中挑选题目验证掌握</p>
                </div>
              </div>
              <div className="listen-instruction">
                <p>💡 <strong>使用方式：</strong></p>
                <ul>
                  <li>直接粘贴你的错题，AI自动分析原因</li>
                  <li>或输入："回顾上周的听力错题，生成一套吞音专项练习"</li>
                </ul>
              </div>
            </div>
          )}

          <div className="chat-box">
            <div className="chat-msgs" ref={chatRef}>
              {history.map(renderMsg)}
            </div>
            <div className="input-row">
              <textarea
                placeholder="输入听力内容或错题，AI为你分析"
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="btn-speak" title="朗读">🔊</button>
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

