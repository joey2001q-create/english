import { useState, useRef, useEffect } from 'react';
import ScenarioSim from './ScenarioSim';

const modeCards = [
  { key: 'pron', icon: '🔊', title: '发音纠错', desc: '音标级纠错，逐音节标注发音问题，对比教学 tongue position', tag: '音标教学' },
  { key: 'scenario', icon: '🎭', title: '情景模拟', desc: '中考高考口语情景，1v1对话练习', tag: '备考冲刺' },
  { key: 'exam', icon: '📋', title: '考试模拟舱', desc: '中高考口语人机对话全真模拟，朗读短文+情景问答', tag: '备考冲刺' },
];

const scenarios = [
  { key: 'london', icon: '🗺️', name: '伦敦问路', desc: '在英国街头向路人问路' },
  { key: 'restaurant', icon: '🍽️', name: '餐厅点餐', desc: '在国外餐厅用英语点餐' },
  { key: 'hotel', icon: '🏨', name: '酒店入住', desc: '入住酒店办理手续' },
  { key: 'shopping', icon: '🛍️', name: '商场购物', desc: '在国外商场买东西' },
  { key: 'interview', icon: '💼', name: '求职面试', desc: '英语面试对答练习' },
  { key: 'custom', icon: '✏️', name: '自定义场景', desc: '输入任意想练习的场景' },
];

const topics = [
  { key: 'travel', icon: '✈️', name: '旅行与文化', desc: '讨论旅行经历、异国文化' },
  { key: 'school', icon: '🏫', name: '校园生活', desc: '朋友、课程、课外活动' },
  { key: 'future', icon: '🚀', name: '未来规划', desc: '理想职业、人生目标' },
  { key: 'science', icon: '🔬', name: '科技话题', desc: 'AI、手机、环保等热点' },
  { key: 'custom', icon: '✏️', name: '自定义话题', desc: '输入任意感兴趣的话题' },
  { key: 'daily', icon: '☕', name: '日常闲聊', desc: '轻松英语对话练习' },
];

const examTypes = [
  { key: 'read', icon: '📖', title: '朗读短文', desc: '粘贴短文，AI模拟考试朗读环节' },
  { key: 'qa', icon: '❓', title: '情景问答', desc: 'AI提问，你用英语回答，AI评分' },
  { key: 'full', icon: '📋', title: '全套模拟', desc: '完整口语考试流程练习' },
];

export default function SpokenEnglish() {
  const [mode, setMode] = useState('cards');
  const [history, setHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [examText, setExamText] = useState('');
  const [showExamInput, setShowExamInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

const handleSelectMode = (m) => {
    setMode(m);
    setHistory([]);
    setShowExamInput(false);
  };

  if (mode === 'scenario') {
    return <ScenarioSim />;
  }

  const handleBack = () => {
    setMode('cards');
    setHistory([]);
    setShowExamInput(false);
    setIsRecording(false);
  };

  const handleSelectScenario = (key) => {
    const scenario = scenarios.find(s => s.key === key);
    setHistory([
      { role: 'system', content: `开始【${scenario?.name}】场景模拟` },
      { role: 'ai', content: '场景已加载，请开始对话。我会扮演对应角色与你互动。' }
    ]);
  };

  const handleSelectTopic = (key) => {
    const topic = topics.find(t => t.key === key);
    setHistory([
      { role: 'system', content: `话题已开启：${topic?.name}` },
      { role: 'ai', content: 'AI正在准备开场白，请稍候...' }
    ]);
  };

  const handleSelectExamType = (key) => {
    if (key === 'read') {
      setShowExamInput(true);
      setHistory([
        { role: 'system', content: '选择朗读短文模式，请粘贴短文后点击"开始模拟"' }
      ]);
    } else if (key === 'qa') {
      setHistory([
        { role: 'ai', content: '情景问答开始。我将用英语向你提问关于日常生活、学校生活、兴趣爱好等方面的问题。请用英语回答。\n\n准备好了吗？我们开始！\n\n第一题：What do you usually do after school?' }
      ]);
    } else if (key === 'full') {
      setHistory([
        { role: 'ai', content: '全套口语考试模拟开始。\n\n考试流程：\n1. 朗读短文（如果有提供）\n2. 情景问答（5题）\n3. 话题表达\n\n请准备好，输入任意内容开始...' }
      ]);
    }
  };

  const handleStartExamRead = () => {
    if (!examText.trim()) {
      setHistory([{ role: 'system', content: '请先粘贴要朗读的短文' }]);
      return;
    }
    setHistory([
      { role: 'user', content: `朗读短文：${examText.substring(0, 100)}...` },
      { role: 'ai', content: '请开始朗读，我会记录并评估你的发音、流利度和停顿。朗读完毕后请说"朗读完毕"。' }
    ]);
    setShowExamInput(false);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setHistory(prev => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setTimeout(() => {
      setHistory(prev => [...prev, { role: 'ai', content: '（模拟回复）\n\n很好！让我们继续对话...' }]);
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
    <div className="spoken-english-module">
      <div className="page-header">
        <div className="page-header-icon">🎙️</div>
        <div className="page-header-info">
          <h2>🎙️ 口语对话</h2>
          <p>发音纠错 · 情境模拟 · 考试全真模拟</p>
        </div>
      </div>

      {mode === 'cards' && (
        <div className="speaking-cards-grid">
          {modeCards.map((card) => (
            <div
              key={card.key}
              className="speaking-card"
              onClick={() => handleSelectMode(card.key)}
            >
              <div className="speaking-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <div className="speaking-card-tag">{card.tag}</div>
            </div>
          ))}
        </div>
      )}

      {mode !== 'cards' && (
        <div className="speaking-func-view">
          <div className="func-header">
            <button className="func-back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> 返回
            </button>
            <span id="speaking-func-title">
              {mode === 'pron' ? '发音纠错' : mode === 'scenario' ? '情境模拟' : '考试模拟舱'}
            </span>
          </div>

          {mode === 'pron' && (
            <div className="spk-pron-area">
              <div className="spk-pron-hint">
                <i className="fas fa-info-circle"></i>
                输入英文句子或单词，AI将逐音节标注发音问题（标红显示错误音节）
              </div>
            </div>
          )}

          {mode === 'scenario' && (
            <div className="spk-scenario-area">
              <div className="spk-scenario-hint">
                <i className="fas fa-lightbulb"></i>
                选择一个常见口语考试场景，AI扮演对话角色，进行5轮真实对话练习
              </div>
              <div className="spk-scenario-grid">
                {scenarios.map((s) => (
                  <div
                    key={s.key}
                    className="spk-scenario-card"
                    onClick={() => handleSelectScenario(s.key)}
                  >
                    <div className="spk-scenario-icon">{s.icon}</div>
                    <div className="spk-scenario-name">{s.name}</div>
                    <div className="spk-scenario-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === 'exam' && (
            <div className="spk-exam-area">
              <div className="spk-exam-hint">
                <i className="fas fa-clipboard-check"></i>
                按照中高考口语考试标准进行全真模拟，包含"朗读短文"和"情景问答"
              </div>
              <div className="spk-exam-type-grid">
                {examTypes.map((t) => (
                  <div
                    key={t.key}
                    className="spk-exam-type-card"
                    onClick={() => handleSelectExamType(t.key)}
                  >
                    <div className="spk-exam-type-icon">{t.icon}</div>
                    <h4>{t.title}</h4>
                    <p>{t.desc}</p>
                  </div>
                ))}
              </div>
              {showExamInput && (
                <div className="spk-exam-input">
                  <textarea
                    rows={4}
                    placeholder="粘贴要朗读的短文..."
                    value={examText}
                    onChange={(e) => setExamText(e.target.value)}
                  />
                  <button className="btn-start-exam" onClick={handleStartExamRead}>
                    <i className="fas fa-play"></i> 开始模拟
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="chat-box">
            <div className="chat-msgs" ref={chatRef}>
              {history.map(renderMsg)}
            </div>
            
            {isRecording && (
              <div className="spk-wave-wrap">
                <div className="spk-wave">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="spk-wave-label">正在录音... 点击停止</div>
              </div>
            )}

            <div className="input-row">
              <textarea
                placeholder="口语对话中，请输入英文与AI互动"
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className={`btn-mic ${isRecording ? 'recording' : ''}`}
                onClick={handleRecord}
                title="按住说话"
              >
                <i className="fas fa-microphone"></i>
              </button>
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

