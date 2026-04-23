import { useState, useRef, useEffect } from 'react';
import useWordStore from '../../store/useWordStore';
import { sendAIMessage } from '../../services/aiService';

const ZHONGKAO_TOPICS = [
  { key: 'introduce', title: 'Introduce Yourself', desc: '个人基本信息、特长与爱好等' },
  { key: 'daily', title: 'Daily Routine', desc: '学校的一天、周末计划等' },
  { key: 'food', title: 'Food&Health', desc: '饮食习惯、如何保持健康（体育运动）等' },
  { key: 'hometown', title: 'Hometown&Travel', desc: '家乡的名胜、一次难忘的旅行等' },
  { key: 'school', title: 'School Life', desc: '喜欢的科目、理想的职业、师生关系等' },
  { key: 'shopping', title: 'Shopping&Asking Way', desc: '购物咨询、指路与问路等' },
  { key: 'festivals', title: 'Festivals', desc: '中西方传统节日（Spring Festival, Halloween 等）' },
  { key: 'environment', title: 'Environment', desc: '植树造林、节约用水用电等' },
  { key: 'technology', title: 'Technology', desc: '网络安全、AI对学习的影响等' },
  { key: 'problem', title: 'Problem Solving', desc: '遇到困难如何求助，给他人提供建议等' },
];

const GAOKAO_TOPICS = [
  {
    key: 'self',
    title: '人与自我',
    cards: [
      { key: 'personal', title: '个人情况', desc: '姓名、年龄、住址、性格等' },
      { key: 'relationship', title: '建立良好的人际关系', desc: '家人、朋友、邻里、社交礼仪' },
      { key: 'environment', title: '周围的环境', desc: '社区设施、居住环境' },
      { key: 'daily', title: '日常活动', desc: '作息时间、生活习惯' },
      { key: 'school', title: '学校生活', desc: '校园活动、喜欢的学科、师生关系、学校规则' },
      { key: 'hobby', title: '兴趣与爱好', desc: '音乐、阅读、运动、收藏等' },
      { key: 'emotion', title: '个人感情', desc: '快乐、忧虑、成就感、抗压能力' },
      { key: 'safety', title: '人身安全与自我保护', desc: '交通安全、急救常识、网络安全' },
      { key: 'career', title: '职业憧憬', desc: '职业理想、大学规划、勤工俭学' },
    ]
  },
  {
    key: 'society',
    title: '人与社会',
    cards: [
      { key: 'festival', title: '节日、风俗与社会习惯', desc: '中外传统节日、礼仪、饮食文化' },
      { key: 'health', title: '饮食与健康', desc: '均衡饮食、疾病预防、公共卫生' },
      { key: 'activity', title: '文体活动', desc: '体育比赛、电影戏剧、艺术展览' },
      { key: 'responsibility', title: '节约、环保与社会责任', desc: '志愿服务、社会道德、慈善活动' },
      { key: 'travel', title: '旅游与交通', desc: '旅行经历、交通工具、文明出行' },
      { key: 'media', title: '大众传媒', desc: '报刊、广播、电视、社交媒体' },
      { key: 'tech', title: '现代技术', desc: '互联网、人工智能、智能手机的影响' },
      { key: 'hotspot', title: '热点话题', desc: '社会关注的焦点、国际形势简述' },
      { key: 'famous', title: '著名人物', desc: '科学家、运动员、历史人物、榜样力量' },
      { key: 'history', title: '历史与地理', desc: '著名史迹、国家概况、地理风貌' },
      { key: 'literature', title: '文学与艺术', desc: '经典名著、艺术门类' },
    ]
  },
  {
    key: 'nature',
    title: '人与自然',
    cards: [
      { key: 'landscape', title: '自然界与自然景观', desc: '动物、植物、著名自然胜地' },
      { key: 'pollution', title: '环境污染与保护', desc: '气候变化、减碳、生物多样性' },
      { key: 'science', title: '科学与医学', desc: '科学发现、医疗突破、健康技术' },
      { key: 'universe', title: '宇宙探索', desc: '航空航天、外星生命探索' },
    ]
  },
];

const SCENARIO_PROMPTS = {
  introduce: "Let's start with self-introduction. Can you tell me your name, age, and where you're from?",
  daily: "What time do you usually get up on school days? Can you describe your daily routine?",
  food: "What's your favorite food? Do you think you have a healthy diet?",
  hometown: "Where is your hometown? Can you introduce some famous places there?",
  school: "What's your favorite subject at school? Why do you like it?",
  shopping: "Have you ever gone shopping by yourself? What did you buy?",
  festivals: "Which Chinese festival do you like best? Why?",
  environment: "What can students do to protect the environment?",
  technology: "Do you use smartphones or computers for learning? How do they help you?",
  problem: "When you face difficulties in study, who do you usually turn to for help?",
};

function buildSystemPrompt(examType, card) {
  if (examType === 'zhongkao') {
    return `你是一位专业的中考英语口语考官，正在对学生进行口语考试模拟。

【当前话题】${card.title} - ${card.desc}

【考试规则】
1. 你必须全程用英语与学生对话
2. 每次只问一个问题，等学生回答后再追问
3. 问题要由浅入深，从简单到稍难
4. 对话要自然流畅，像真实的口语考试一样
5. 如果学生回答太短或太简单，要追问细节，鼓励他们多说话
6. 如果学生语法有误，不要直接指出错误，而是用正确的表达自然地复述一遍
7. 适时给予鼓励，如 "Good!", "That's interesting!", "Well done!" 等
8. 控制每轮回复在2-3句话以内，不要说太多
9. 不要输出Markdown格式，直接用纯文本对话`;
  }

  return `你是一位专业的高考英语口语考官，正在对学生进行口语考试模拟。

【当前话题】${card.title} - ${card.desc}

【考试规则】
1. 用中文简要引导，用英语提出问题和互动
2. 每次只问一个问题，等学生回答后再追问或转换角度
3. 问题要由浅入深，先让学生描述，再让他们表达观点和理由
4. 引导学生使用更丰富的词汇和句型，如定语从句、状语从句、非谓语动词等
5. 如果学生表达单一，要引导他们展开，例如"你能举个例子吗？""你觉得原因是什么？"
6. 如果学生语法有误，不要直接纠正，而是用正确的表达自然复述
7. 适时给予鼓励和肯定
8. 控制每轮回复在2-3句话以内，不要说太多
9. 不要输出Markdown格式，直接用纯文本对话`;
}

export default function ScenarioSim() {
  const { setMode } = useWordStore();
  
  const [examType, setExamType] = useState('zhongkao');
  const [selectedTopic, setSelectedTopic] = useState('introduce');
  const [view, setView] = useState('list');
  const [currentScenario, setCurrentScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [answerCount, setAnswerCount] = useState(0);
  const [canEnd, setCanEnd] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const chatRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('oral_history');
    if (saved) {
      setHistoryList(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const currentTopics = examType === 'zhongkao' ? ZHONGKAO_TOPICS : GAOKAO_TOPICS;
  
  const currentCards = examType === 'zhongkao' 
    ? ZHONGKAO_TOPICS.find(t => t.key === selectedTopic) ? [ZHONGKAO_TOPICS.find(t => t.key === selectedTopic)] : []
    : GAOKAO_TOPICS.find(t => t.key === selectedTopic)?.cards || [];

  const handleSelectCard = async (card) => {
    setCurrentScenario(card);
    setView('chat');
    setMessages([]);
    setAnswerCount(0);
    setCanEnd(false);

    setIsTyping(true);

    try {
      const systemPrompt = buildSystemPrompt(examType, card);
      const openingHint = examType === 'zhongkao'
        ? `请用英语开始对话，话题是"${card.title}"，先用简短的问候开场，然后提出第一个问题。`
        : `请开始对话，话题是"${card.title}"（${card.desc}），先用中文简要引导，然后用英语提出第一个问题。`;

      const response = await sendAIMessage(
        [{ role: 'user', content: openingHint }],
        { systemPrompt, temperature: 0.8, maxTokens: 300 }
      );
      setMessages([{ role: 'ai', content: response.content }]);
    } catch (error) {
      console.warn('[ScenarioSim] AI开场白生成失败，降级到本地:', error.message);
      const greeting = examType === 'zhongkao'
        ? `Hello! I'm your oral English examiner. Today we'll talk about "${card.title}". ${SCENARIO_PROMPTS[card.key] || "Let's start our conversation. Can you tell me something about this topic?"}`
        : `你好！我是你的口语考官。今天我们来练习"${card.title}"这个话题。${card.desc}。请开始你的表述吧。`;
      setMessages([{ role: 'ai', content: greeting }]);
    } finally {
      setIsTyping(false);
    }
  };

  const getFallbackResponse = () => {
    const followUps = examType === 'zhongkao'
      ? [
          "That's interesting! Can you tell me more about it?",
          "Why do you think so? Can you give me an example?",
          "How about your friends or family? Do they have similar experiences?",
          "What challenges have you faced in this area?",
          "If you could change one thing, what would it be?",
          "How do you usually deal with such situations?",
          "What's your plan for the future regarding this?",
          "Can you share a specific story about this?",
          "What advice would you give to others?",
          "Do you think this is important? Why?",
          "How has this affected your life?",
        ]
      : [
          "很好，请继续展开说说。",
          "你能举个例子吗？",
          "你觉得为什么会这样？",
          "你身边的人是怎么看的？",
          "你遇到过什么困难吗？",
          "你打算怎么改进呢？",
          "这对你的生活有什么影响？",
          "你能分享一个具体的经历吗？",
          "你有什么建议给别人吗？",
          "你觉得这个重要吗？为什么？",
          "未来你有什么计划？",
        ];
    return followUps[Math.floor(Math.random() * followUps.length)];
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setAnswerCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 11) {
        setCanEnd(true);
      }
      return newCount;
    });

    setIsTyping(true);

    try {
      const conversationMessages = messages.map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content,
      }));
      conversationMessages.push({ role: 'user', content: text });

      const systemPrompt = buildSystemPrompt(examType, currentScenario);

      const response = await sendAIMessage(conversationMessages, {
        systemPrompt,
        temperature: 0.8,
        maxTokens: 300,
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.content }]);
    } catch (error) {
      console.warn('[ScenarioSim] AI调用失败，降级到本地回复:', error.message);
      const fallback = getFallbackResponse();
      setMessages(prev => [...prev, { role: 'ai', content: fallback }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEndChat = () => {
    const record = {
      id: Date.now(),
      examType,
      scenario: currentScenario,
      messages,
      answerCount,
      date: new Date().toLocaleString(),
    };
    
    const newHistory = [record, ...historyList].slice(0, 50);
    setHistoryList(newHistory);
    localStorage.setItem('oral_history', JSON.stringify(newHistory));
    
    setView('summary');
  };

  const handleBack = () => {
    if (view === 'chat') {
      setView('list');
      setMessages([]);
      setAnswerCount(0);
      setCanEnd(false);
    } else if (view === 'summary') {
      setView('list');
    }
  };

  const renderListView = () => (
    <div className="scenario-page">
      <div className="scenario-header">
        <button className="back-btn" onClick={() => setMode('cards')}>← 返回</button>
        <h2>🎭 情景模拟</h2>
        <button className="history-btn" onClick={() => setShowHistory(!showHistory)}>📋 历史</button>
      </div>

      <div className="exam-tabs">
        <button 
          className={`tab-btn ${examType === 'zhongkao' ? 'active' : ''}`}
          onClick={() => { setExamType('zhongkao'); setSelectedTopic('introduce'); }}
        >
          中考
        </button>
        <button 
          className={`tab-btn ${examType === 'gaokao' ? 'active' : ''}`}
          onClick={() => { setExamType('gaokao'); setSelectedTopic('self'); }}
        >
          高考
        </button>
      </div>

      {showHistory && (
        <div className="history-panel">
          <div className="history-header">
            <h3>对话历史</h3>
            <button onClick={() => setShowHistory(false)}>✕</button>
          </div>
          <div className="history-list">
            {historyList.length === 0 ? (
              <p className="empty-tip">暂无历史记录</p>
            ) : (
              historyList.map(item => (
                <div key={item.id} className="history-item" onClick={() => {
                  setCurrentScenario(item.scenario);
                  setMessages(item.messages);
                  setAnswerCount(item.answerCount);
                  setCanEnd(item.answerCount >= 11);
                  setExamType(item.examType);
                  setShowHistory(false);
                  setView('summary');
                }}>
                  <div className="history-title">{item.scenario?.title}</div>
                  <div className="history-date">{item.date}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="scenario-content">
        {examType === 'zhongkao' ? (
          <div className="zhongkao-cards-area">
            {ZHONGKAO_TOPICS.map(topic => (
              <div key={topic.key} className="zhongkao-topic-card" onClick={() => handleSelectCard(topic)}>
                <div className="zhongkao-card-icon">💬</div>
                <div className="zhongkao-card-title">{topic.title}</div>
                <div className="zhongkao-card-desc">{topic.desc}</div>
                <div className="zhongkao-card-action">去练习 →</div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="topic-sidebar">
              {currentTopics.map(topic => (
                <div
                  key={topic.key}
                  className={`topic-item ${selectedTopic === topic.key ? 'active' : ''}`}
                  onClick={() => setSelectedTopic(topic.key)}
                >
                  {topic.title}
                </div>
              ))}
            </div>
            <div className="cards-area">
              <div className="cards-grid">
                {currentCards.map(card => (
                  <div key={card.key} className="scenario-card" onClick={() => handleSelectCard(card)}>
                    <div className="card-icon">💬</div>
                    <div className="card-info">
                      <div className="card-title">{card.title}</div>
                      <div className="card-desc">{card.desc}</div>
                    </div>
                    <div className="card-action">去练习 →</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderChatView = () => (
    <div className="chat-page">
      <div className="chat-header">
        <button className="back-btn" onClick={handleBack}>← 返回</button>
        <div className="chat-title">{currentScenario?.title}</div>
        <div className="chat-count">回答: {answerCount}/11</div>
      </div>

      <div className="chat-messages" ref={chatRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="msg-avatar">{msg.role === 'ai' ? '🤖' : '👤'}</div>
            <div className="msg-content">{msg.content}</div>
          </div>
        ))}
        {isTyping && (
          <div className="message ai">
            <div className="msg-avatar">🤖</div>
            <div className="msg-content typing">AI正在思考中<span></span><span></span><span></span></div>
          </div>
        )}
      </div>

      <div className="chat-footer">
        {canEnd && (
          <button className="end-btn" onClick={handleEndChat}>结束对话</button>
        )}
        <div className="input-row">
          <input
            type="text"
            placeholder={examType === 'zhongkao' ? "Type your answer..." : "输入你的回答..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-btn" onClick={handleSend}>发送</button>
        </div>
        {!canEnd && <p className="tip">至少回答11次才能结束对话</p>}
      </div>
    </div>
  );

  const renderSummaryView = () => (
    <div className="summary-page">
      <div className="summary-header">
        <button className="back-btn" onClick={handleBack}>← 返回</button>
        <h2>📝 对话记录</h2>
      </div>

      <div className="summary-info">
        <div className="info-item">
          <span className="label">话题:</span>
          <span className="value">{currentScenario?.title}</span>
        </div>
        <div className="info-item">
          <span className="label">回答次数:</span>
          <span className="value">{answerCount}</span>
        </div>
      </div>

      <div className="summary-content">
        {messages.map((msg, idx) => (
          <div key={idx} className={`summary-msg ${msg.role}`}>
            <span className="role-tag">{msg.role === 'ai' ? '考官' : '我'}</span>
            <span className="msg-text">{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="summary-actions">
        <button className="action-btn primary" onClick={() => handleSelectCard(currentScenario)}>
          再练一次
        </button>
        <button className="action-btn" onClick={handleBack}>返回列表</button>
      </div>
    </div>
  );

  if (view === 'chat') return renderChatView();
  if (view === 'summary') return renderSummaryView();
  return renderListView();
}
