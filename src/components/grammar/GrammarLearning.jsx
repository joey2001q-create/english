﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../../data/knowledgeBase';
import { sendAIMessage, createAIErrorMessage } from '../../services/aiService';

const grammarParseExample = knowledgeBase.functions.grammar.modes.parse.examples[0];
const grammarModes = [
  { key: 'parse', icon: '🌳', title: '句子拆解', desc: '输入/拍照句子，AI画语法树，展示主句/从句/修饰成分', tag: '理解结构' },
  { key: 'context', icon: '🎬', title: '语境记忆', desc: '哈利波特/流浪地球...兴趣驱动，让例句刻进DNA', tag: '趣味学习' },
  { key: 'practice', icon: '✏️', title: '强化训练', desc: '单项选择/语法填空，即学即练，AI即时批改', tag: '实战演练' },
];
const grammarThemes = knowledgeBase.functions.grammar.modes.context.themes;
const grammarPracticeTypes = [
  { key: 'choice', icon: '🔘', title: '单项选择', desc: '5-10道精选题目' },
  { key: 'fill', icon: '📝', title: '语法填空', desc: '短文挖空练习' },
  { key: 'error', icon: '❌', title: '改错练习', desc: '找出语法错误' },
];
const grammarInstruction = knowledgeBase.functions.grammar.modes.parse.instruction;
const mockQuestions = [
  {
    id: 1,
    type: 'choice',
    question: 'He ______ (be) to Beijing twice.',
    options: ['A. has been', 'B. had been', 'C. was', 'D. is'],
    answer: 'A',
    analysis: '现在完成时表示过去发生的动作对现在造成的影响，twice表示次数，用has been。',
  },
  {
    id: 2,
    type: 'choice',
    question: 'The book ______ I bought yesterday is very interesting.',
    options: ['A. that', 'B. what', 'C. who', 'D. whom'],
    answer: 'A',
    analysis: '定语从句修饰先行词book，关系代词在从句中作宾语，可用that或which。',
  },
];

function matchGrammarKnowledge(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('哈利波特') || (msg.includes('harry') && msg.includes('potter'))) {
    const grammarContext = knowledgeBase.functions.grammar.modes.context;
    return {
      topic: '语境记忆 - 哈利波特主题',
      content: `🎬 **哈利波特主题语法讲解**

哈利波特的世界里藏着无数语法知识点！例如：

**1. 伏地魔的现在完成时**
He has destroyed the wand.
分析：主句用了现在完成时，表示过去的动作对现在的影响——伏地魔已经摧毁了老魔杖，这个动作的后果延续到现在。

**2. 时间转换器的过去完成时**
If she had not used the time-turner, she would not have saved Buckbeak.
分析：虚拟语气中的过去完成时，表示与过去事实相反的假设。

💡 **记忆口诀**：have/has + 过去分词 = 到现在已完成
             had + 过去分词 = 到过去某时已完成

你可以继续问我其他哈利波特相关的语法点！`
    };
  }

  if (msg.includes('现在完成时') || msg.includes('present perfect')) {
    const parse = knowledgeBase.functions.grammar.modes.parse;
    return {
      topic: '现在完成时',
      content: `📚 **现在完成时（Present Perfect）**

**构成：** have/has + 过去分词

**用法：**
1. 过去的动作对现在造成影响
2. 过去开始持续到现在（常与for/since连用）

**刘彬老师口诀：**
"for+时间段，has/have完成时；since+时间点，完成时不惑！"

**示例拆解：**
原文：${parse.examples[0].input}
分析：${parse.examples[0].analysis}
说明：${parse.examples[0].note}

**巩固练习：**
She ___ (live) here since 2010.
答案：has lived（since 2010表示从过去持续到现在，用现在完成时）`
    };
  }

  if (msg.includes('定语从句')) {
    const parse = knowledgeBase.functions.grammar.modes.parse;
    return {
      topic: '定语从句',
      content: `🔍 **定语从句（Attributive Clause）**

**概念：** 修饰一个名词或代词的从句

**关系代词：** who, whom, which, that, whose

**示例拆解：**
原文：${parse.examples[1].input}
分析：${parse.examples[1].analysis}
说明：${parse.examples[1].note}

**刘彬老师方法：**
1. 找先行词（被修饰的名词）
2. 选关系词（看先行词在从句中做什么成分）
3. 分析从句类型（限定性/非限定性）

**限定性 vs 非限定性：**
- 限定性：没有逗号，从句不可省略
- 非限定性：有逗号，可用which/who/whom引导`
    };
  }

  if (msg.includes('拆解') || msg.includes('分析') || msg.includes('句子结构')) {
    const parse = knowledgeBase.functions.grammar.modes.parse;
    const sentences = [
      { input: parse.examples[0].input, analysis: parse.examples[0] },
      { input: parse.examples[1].input, analysis: parse.examples[1] },
    ];

    const matched = sentences.find(s =>
      msg.includes(s.input.toLowerCase().split(' ')[0]) ||
      s.input.toLowerCase().includes(msg.replace(/[^a-z\s]/g, '').trim().split(' ')[0])
    ) || sentences[0];

    return {
      topic: '句子拆解',
      content: `🌳 **句子拆解结果**

原文：${matched.input}

**结构分析：**
${matched.analysis.note}

**语法树：**
${matched.analysis.analysis.split('|').map(s => `• ${s.trim()}`).join('\n')}

**考点提示：**
这类宾语从句/定语从句是中考、高考常见考点，要注意：
1. that在宾语从句中可省略，在定语从句中不可省略
2. 当先行词是不定代词（something, anything）时，只用that
3. 非限定性定语从句用which引导，有逗号`
    };
  }

  if (msg.includes('宾语从句')) {
    const parse = knowledgeBase.functions.grammar.modes.parse;
    return {
      topic: '宾语从句',
      content: `📖 **宾语从句（Object Clause）**

**概念：** 在句中担当宾语成分的从句

**引导词：**
- that（无意义，可省略）
- if/whether（是否）
- 疑问词（what, who, which, where, when, why, how）

**示例拆解：**
原文：${parse.examples[0].input}
分析：${parse.examples[0].analysis}
说明：${parse.examples[0].note}

**刘彬老师提示：**
宾语从句使用三步法：
1. 判断是否是宾语从句（找动词后的从句）
2. 选择正确的引导词
3. 注意陈述语序（疑问词+主语+谓语）`
    };
  }

  if (msg.includes('流浪地球')) {
    return {
      topic: '语境记忆 - 流浪地球主题',
      content: `🌍 **流浪地球主题语法讲解**

流浪地球中藏着这些语法知识点！

**1. 虚拟语气**
If the sun exploded, the Earth would be destroyed.
分析：if虚拟语气现在时，表示与现在事实相反的假设。

**2. 被动语态**
The Earth must be saved by all humans.
分析：must be saved是被被动结构，表示被拯救。

**3. 情态动词**
We must act now. We should protect our planet.
分析：must表示"必须"，should表示"应该"。

💡 **记忆口诀**：虚拟语气表假设，与事实相反用would/had

继续问我其他语法点！`
    };
  }

  return null;
}

function formatGrammarResponse(match) {
  return `你好！我是刘彬老师，针对你问的这个${match.topic}，让我来帮你解答~

---

${match.content}

---

💡 **还想了解更多？**
• 问我"用哈利波特讲语法"
• 发句子让我拆解结构
• 问我"定语从句"或"现在完成时"`;
}

function getGrammarFallback(userMessage) {
  return `你好！我是刘彬老师~

针对"${userMessage}"这个问题，让我用语法知识来帮你！

**你可以这样问我：**
• "用哈利波特讲讲现在完成时"
• "请拆解 I believe that he will come tomorrow"
• "定语从句和宾语从句有什么区别"
• "用流浪地球解释虚拟语气"

**或者直接粘贴句子**，我来帮你分析主谓宾和从句结构！`;
}

export default function GrammarLearning() {
  const [mode, setMode] = useState('cards');
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [expandedAnswer, setExpandedAnswer] = useState(null);
  const [selectedOption, setSelectedOption] = useState({});
  const [isThinking, setIsThinking] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history, isThinking]);

  const handleSelectMode = (m) => {
    setMode(m);
    setHistory([]);
    setExpandedAnswer(null);
    setSelectedOption({});
  };

  const handleBack = () => {
    setMode('cards');
    setHistory([]);
    setExpandedAnswer(null);
    setSelectedOption({});
  };

  const handleSelectTheme = (key) => {
    const theme = grammarThemes.find((t) => t.key === key);
    setHistory([
      { role: 'system', content: `选择【${theme?.name}】主题` },
      { role: 'ai', content: `好的！我们用【${theme?.name}】来学习语法~\n\n请告诉我你想学习哪个语法点？例如：\n- "用哈利波特讲讲现在完成时"\n- "以流浪地球为背景解释虚拟语气"\n\n或者直接说你想攻克哪个语法难题！` },
    ]);
  };

  const handleSelectPractice = (key) => {
    const practice = grammarPracticeTypes.find((p) => p.key === key);
    setHistory([
      { role: 'system', content: `开始【${practice?.title}】练习` },
      { role: 'ai', content: `开始${practice?.title}练习！\n\n请告诉我你想练习什么语法点，或者直接说"随机出一道"让AI自动选择~` },
    ]);
  };

  const handleOptionSelect = (questionId, option) => {
    setSelectedOption((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleToggleAnswer = (questionId) => {
    setExpandedAnswer((prev) => (prev === questionId ? null : questionId));
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text) return;
    setHistory((prev) => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setIsThinking(true);

    try {
      const conversationHistory = history
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role, content: m.content }));

      const grammarSystemPrompt = knowledgeBase.functions.grammar.modes.parse.instruction;
      const response = await sendAIMessage(conversationHistory, {
        systemPrompt: grammarSystemPrompt
      });

      setHistory((prev) => [...prev, { role: 'ai', content: response.content }]);
    } catch (error) {
      console.warn('[GrammarLearning] API调用失败，降级到本地知识库:', error.message);

      const match = matchGrammarKnowledge(text);
      let fallbackResponse;

      if (match) {
        fallbackResponse = formatGrammarResponse(match);
      } else {
        fallbackResponse = getGrammarFallback(text);
      }

      setHistory((prev) => [...prev, { role: 'ai', content: fallbackResponse }]);
    } finally {
      setIsThinking(false);
    }
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
    if (msg.role === 'ai') {
      return (
        <div key={idx} className="msg ai">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
        </div>
      );
    }
    return <div key={idx} className={`msg ${msg.role}`}>{msg.content}</div>;
  };

  return (
    <div className="grammar-learning-module">
      <div className="page-header">
        <div className="page-header-icon">🔍</div>
        <div className="page-header-info">
          <h2>语法学习</h2>
          <p>句子拆解 · 语境记忆 · 强化训练</p>
        </div>
      </div>

      {mode === 'cards' && (
        <div className="grammar-cards-grid">
          {grammarModes.map((card) => (
            <div
              key={card.key}
              className="grammar-card"
              onClick={() => handleSelectMode(card.key)}
            >
              <div className="grammar-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <div className="grammar-card-tag">{card.tag}</div>
            </div>
          ))}
        </div>
      )}

      {mode !== 'cards' && (
        <div className="grammar-func-container">
          <div className="func-header">
            <button className="func-back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> 返回
            </button>
            <span id="grammar-func-title">
              {mode === 'parse' ? '句子拆解' : mode === 'context' ? '语境记忆' : '强化训练'}
            </span>
          </div>

          {mode === 'parse' && (
            <div className="grammar-sub-panel">
              <div className="grammar-instruction">
                <p>💡 <strong>AI指令示例：</strong></p>
                <ul>
                  <li>"请拆解这个句子的成分，展示主句和从句"</li>
                  <li>"解释为什么这里用非谓语动词而不是谓语动词"</li>
                  <li>"画出这个复杂句的语法树结构"</li>
                </ul>
              </div>
              <div className="grammar-demo">
                <div className="demo-title">示例：宾语从句拆解</div>
                <div className="demo-original">{grammarParseExample.input}</div>
                <div className="demo-tree">
                  <div className="tree-node main">I</div>
                  <div className="tree-node main">believe</div>
                  <div className="tree-node sub">[that he will come tomorrow]</div>
                  <div className="tree-note">↳ {grammarParseExample.note}</div>
                </div>
              </div>
            </div>
          )}

          {mode === 'context' && (
            <div className="grammar-sub-panel">
              <div className="grammar-instruction">
                <p>💡 <strong>AI指令示例：</strong></p>
                <ul>
                  <li>"我分不清现在完成时和过去完成时，用哈利波特写3个例句"</li>
                  <li>"以流浪地球为背景，解释if虚拟语气的用法"</li>
                  <li>"用王者荣耀英雄写5个定语从句的例子"</li>
                </ul>
              </div>
              <div className="grammar-themes">
                {grammarThemes.map((t) => (
                  <div
                    key={t.key}
                    className="theme-item"
                    onClick={() => handleSelectTheme(t.key)}
                  >
                    {t.icon} {t.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === 'practice' && (
            <div className="grammar-sub-panel">
              <div className="grammar-instruction">
                <p>💡 <strong>AI指令示例：</strong></p>
                <ul>
                  <li>"给我5道现在完成时的单项选择题"</li>
                  <li>"出一篇高中语法填空，关于定语从句"</li>
                  <li>"批改这段文字的语法错误"</li>
                </ul>
              </div>
              <div className="practice-types">
                {grammarPracticeTypes.map((p) => (
                  <div
                    key={p.key}
                    className="practice-type"
                    onClick={() => handleSelectPractice(p.key)}
                  >
                    <div className="practice-icon">{p.icon}</div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mock-questions">
                <div className="questions-title">📝 示例题目</div>
                {mockQuestions.map((q) => (
                  <div key={q.id} className="question-card">
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
                    <button
                      className="toggle-answer-btn"
                      onClick={() => handleToggleAnswer(q.id)}
                    >
                      {expandedAnswer === q.id ? '收起解析 ▲' : '查看解析 ▼'}
                    </button>
                    {expandedAnswer === q.id && (
                      <div className="answer-panel">
                        <div className="answer-correct">正确答案：{q.answer}</div>
                        <div className="answer-analysis">{q.analysis}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="chat-box">
            <div className="chat-msgs" ref={chatRef}>
              {history.map(renderMsg)}
              {isThinking && (
                <div className="msg ai typing show">
                  AI正在思考中<span></span><span></span><span></span>
                </div>
              )}
            </div>
            <div className="input-row">
              <textarea
                placeholder="输入句子或语法问题，AI帮你深度学习"
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="btn-photo" title="拍照">📷</button>
              <button className="btn-send" onClick={handleSend} disabled={isThinking}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function renderMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^(\d+)\. (.+)$/gm, '<li><strong>$1.</strong> $2</li>')
    .replace(/^[•\-] (.+)$/gm, '<li>• $1</li>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

