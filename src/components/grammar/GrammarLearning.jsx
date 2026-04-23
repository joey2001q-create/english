﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../../data/knowledgeBase';
import { sendAIMessage, createAIErrorMessage } from '../../services/aiService';

const grammarParseExample = knowledgeBase.functions.grammar.modes.parse.examples[0];
const grammarModes = [
  { key: 'parse', icon: '🌳', title: '长难句拆解+分析', desc: '输入/拍照句子，AI画语法树，展示主句/从句/修饰成分', tag: '理解结构' },
  { key: 'context', icon: '🎬', title: '语境记忆', desc: '哈利波特/流浪地球...兴趣驱动，让例句刻进DNA', tag: '趣味学习' },
];
const grammarThemes = knowledgeBase.functions.grammar.modes.context.themes;
const grammarInstruction = knowledgeBase.functions.grammar.modes.parse.instruction;

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
  const [isThinking, setIsThinking] = useState(false);
  const [parseInput, setParseInput] = useState('');
  const [parseResult, setParseResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history, isThinking]);

  const handleSelectMode = (m) => {
    setMode(m);
    setHistory([]);
    setParseInput('');
    setParseResult(null);
  };

  const handleBack = () => {
    setMode('cards');
    setHistory([]);
    setParseInput('');
    setParseResult(null);
  };

  const handleAnalyze = async () => {
    const text = parseInput.trim();
    if (!text) return;

    setIsAnalyzing(true);

    try {
      const conversationHistory = [{ role: 'user', content: `请对以下英语句子进行完整的语法成分拆解分析：

"${text}"

请严格按照以下JSON格式返回结果（不要加任何其他文字说明，只返回纯JSON）：
{
  "subject": {
    "text": "主语部分原文",
    "detail": "主语的详细语法说明"
  },
  "predicate": {
    "text": "谓语部分原文",
    "detail": "谓语的详细语法说明"
  },
  "object": {
    "text": "宾语部分原文",
    "detail": "宾语的详细语法说明"
  },
  "attribute": {
    "text": "定语部分原文（如没有则填空字符串）",
    "detail": "定语的详细语法说明"
  },
  "adverbial": {
    "text": "状语部分原文（如没有则填空字符串）",
    "detail": "状语的详细语法说明"
  },
  "complement": {
    "text": "补语部分原文（如没有则填空字符串）",
    "detail": "补语的详细语法说明"
  },
  "clauses": [
    {
      "type": "从句类型（如：定语从句、状语从句、宾语从句等）",
      "text": "从句原文",
      "detail": "从句的详细语法说明"
    }
  ],
  "phrases": [
    {
      "type": "短语类型（如：介词短语、动名词短语、不定式短语等）",
      "text": "短语原文",
      "detail": "短语的详细语法说明"
    }
  ],
  "summary": "整体句型结构的一句话总结"
}` }];

      const grammarSystemPrompt = `你是一个专业的英语语法分析师。你的任务是分析用户输入的英语句子，并按语法成分进行拆解。
请严格返回JSON格式，不要包含任何额外的说明文字或markdown代码块标记。
每个字段都要认真分析填写，如果没有该成分，text和detail填空字符串，clauses和phrases填空数组。`;

      const response = await sendAIMessage(conversationHistory, {
        systemPrompt: grammarSystemPrompt
      });

      let parsedData;
      try {
        let jsonStr = response.content.trim();
        if (jsonStr.startsWith('```')) {
          jsonStr = jsonStr.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
        }
        parsedData = JSON.parse(jsonStr);
      } catch (e) {
        console.warn('[GrammarLearning] JSON解析失败，尝试提取:', e.message);
        parsedData = parseAnalysisFallback(response.content);
      }

      setParseResult({
        original: text,
        data: parsedData,
        raw: response.content
      });
    } catch (error) {
      console.warn('[GrammarLearning] 分析失败:', error.message);
      setParseResult({
        original: text,
        data: null,
        raw: `分析失败，请稍后重试。错误信息：${error.message}`
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearParse = () => {
    setParseInput('');
    setParseResult(null);
  };

  const parseCharCount = parseInput.length;
  const isOverLimit = parseCharCount > 300;

  const handleSelectTheme = (key) => {
    const theme = grammarThemes.find((t) => t.key === key);
    setHistory([
      { role: 'system', content: `选择【${theme?.name}】主题` },
      { role: 'ai', content: `好的！我们用【${theme?.name}】来学习语法~\n\n请告诉我你想学习哪个语法点？例如：\n- "用哈利波特讲讲现在完成时"\n- "以流浪地球为背景解释虚拟语气"\n\n或者直接说你想攻克哪个语法难题！` },
    ]);
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
          <p>长难句拆解 · 语境记忆</p>
        </div>
      </div>

      {mode === 'cards' && (
        <div className="listen-cards-grid">
          {grammarModes.map((card) => (
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
        <div className="grammar-func-container">
          <div className="func-header">
            <button className="func-back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> 返回
            </button>
            <span id="grammar-func-title">
              {mode === 'parse' ? '长难句拆解+分析' : '语境记忆'}
            </span>
          </div>

          {mode === 'parse' && (
            <div className="grammar-parse-page">
              <div className="grammar-parse-header">
                <button className="back-btn" onClick={handleBack}>← 返回</button>
                <h2>🌳 长难句拆解+分析</h2>
              </div>

              <div className="grammar-parse-input-section">
                <div className="parse-input-card">
                  <div className="parse-input-top">
                    <div className="parse-input-label">
                      <i className="fas fa-pen-fancy"></i>
                      <span>输入英语长难句</span>
                    </div>
                    <span className={`char-counter ${isOverLimit ? 'over' : ''}`}>
                      {parseCharCount}<span className="char-limit">/300</span>
                    </span>
                  </div>
                  <textarea
                    className="parse-textarea"
                    placeholder="粘贴或输入一个英语长难句，AI将为你逐层拆解语法结构..."
                    value={parseInput}
                    onChange={(e) => setParseInput(e.target.value)}
                    rows={4}
                  />
                  <div className="parse-action-row">
                    <button className="parse-btn-clear" onClick={handleClearParse}>
                      <i className="fas fa-eraser"></i> 清空
                    </button>
                    <button
                      className="parse-btn-go"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !parseInput.trim() || isOverLimit}
                    >
                      {isAnalyzing ? (
                        <><span className="btn-spinner"></span> 正在拆解...</>
                      ) : (
                        <><i className="fas fa-microscope"></i> 开始拆解</>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {isAnalyzing && !parseResult && (
                <div className="parse-loading-card">
                  <div className="parse-loading-animation">
                    <div className="dot-pulse">
                      <span></span><span></span><span></span>
                    </div>
                    <p>AI正在逐词拆解语法结构...</p>
                  </div>
                </div>
              )}

              {parseResult && parseResult.data && (
                <div className="parse-result-wrapper">
                  <div className="parse-sentence-bar">
                    <i className="fas fa-quote-left"></i>
                    <span className="parse-sentence-text">{parseResult.original}</span>
                  </div>

                  {parseResult.data.summary && (
                    <div className="parse-summary">
                      <i className="fas fa-lightbulb"></i>
                      <span>{parseResult.data.summary}</span>
                    </div>
                  )}

                  <div className="parse-section-title">
                    <span className="section-dot core"></span>
                    核心成分 · 主谓宾
                  </div>
                  <div className="parse-core-grid">
                    {renderComponentCard('主语', 'fa-user', parseResult.data.subject, '#4CAF50', '#E8F5E9')}
                    {renderComponentCard('谓语', 'fa-bolt', parseResult.data.predicate, '#2196F3', '#E3F2FD')}
                    {renderComponentCard('宾语', 'fa-bullseye', parseResult.data.object, '#FF9800', '#FFF3E0')}
                  </div>

                  <div className="parse-section-title">
                    <span className="section-dot modifier"></span>
                    修饰成分 · 定状补
                  </div>
                  <div className="parse-modifier-grid">
                    {renderComponentCard('定语', 'fa-tag', parseResult.data.attribute, '#9C27B0', '#F3E5F5')}
                    {renderComponentCard('状语', 'fa-clock', parseResult.data.adverbial, '#00BCD4', '#E0F7FA')}
                    {renderComponentCard('补语', 'fa-plus-circle', parseResult.data.complement, '#E91E63', '#FCE4EC')}
                  </div>

                  {parseResult.data.clauses && parseResult.data.clauses.length > 0 && (
                    <>
                      <div className="parse-section-title">
                        <span className="section-dot clause"></span>
                        从句结构
                      </div>
                      <div className="parse-clauses-list">
                        {parseResult.data.clauses.map((c, i) => (
                          <div key={i} className="parse-clause-card">
                            <div className="clause-header">
                              <span className="clause-badge">{c.type || '从句'}</span>
                            </div>
                            <div className="clause-text">{c.text}</div>
                            <div className="clause-detail">{c.detail}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {parseResult.data.phrases && parseResult.data.phrases.length > 0 && (
                    <>
                      <div className="parse-section-title">
                        <span className="section-dot phrase"></span>
                        短语结构
                      </div>
                      <div className="parse-phrases-list">
                        {parseResult.data.phrases.map((p, i) => (
                          <div key={i} className="parse-phrase-card">
                            <span className="phrase-badge">{p.type || '短语'}</span>
                            <span className="phrase-text">{p.text}</span>
                            <span className="phrase-detail">{p.detail}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {parseResult && !parseResult.data && (
                <div className="parse-result-wrapper">
                  <div className="parse-fallback-content">
                    <div dangerouslySetInnerHTML={{ __html: renderAnalysis(parseResult.raw) }} />
                  </div>
                </div>
              )}

              {!parseResult && !isAnalyzing && (
                <div className="grammar-parse-tip">
                  <div className="tip-illustration">
                    <div className="tip-step">
                      <span className="step-num">1</span>
                      <span>输入长难句</span>
                    </div>
                    <i className="fas fa-arrow-right tip-arrow"></i>
                    <div className="tip-step">
                      <span className="step-num">2</span>
                      <span>AI智能拆解</span>
                    </div>
                    <i className="fas fa-arrow-right tip-arrow"></i>
                    <div className="tip-step">
                      <span className="step-num">3</span>
                      <span>彩色标注结果</span>
                    </div>
                  </div>
                  <div className="tip-examples">
                    <p className="tip-label">试试这些例句：</p>
                    <div className="tip-example-tags">
                      <button className="tip-example-tag" onClick={() => setParseInput("The boy who lost his wallet yesterday found it this morning.")}>
                        The boy who lost his wallet yesterday found it this morning.
                      </button>
                      <button className="tip-example-tag" onClick={() => setParseInput("Although it was raining heavily, she decided to go out for a walk because she needed some fresh air.")}>
                        Although it was raining heavily, she decided to go out for a walk...
                      </button>
                      <button className="tip-example-tag" onClick={() => setParseInput("What surprised me most was that he had finished the difficult task which had been assigned by the teacher before the deadline.")}>
                        What surprised me most was that he had finished...
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {mode === 'context' && (
            <div className="grammar-context-page">
              <div className="grammar-context-header">
                <button className="back-btn" onClick={handleBack}>← 返回</button>
                <h2>🎬 语境记忆学习</h2>
              </div>

              <div className="context-themes-section">
                <div className="context-section-title">
                  <i className="fas fa-layer-group"></i>
                  选择学习主题
                </div>
                <div className="context-themes-grid">
                  <div className="context-theme-card" onClick={() => handleSelectTheme('harrypotter')}>
                    <span className="theme-icon">⚡</span>
                    <span className="theme-name">哈利波特</span>
                    <span className="theme-desc">魔法世界的语法奥秘</span>
                  </div>
                  <div className="context-theme-card" onClick={() => handleSelectTheme('wandering')}>
                    <span className="theme-icon">🌍</span>
                    <span className="theme-name">流浪地球</span>
                    <span className="theme-desc">科幻大片学语法</span>
                  </div>
                  <div className="context-theme-card" onClick={() => handleSelectTheme('game')}>
                    <span className="theme-icon">🎮</span>
                    <span className="theme-name">游戏动漫</span>
                    <span className="theme-desc">王者荣耀/原神/鬼灭</span>
                  </div>
                  <div className="context-theme-card" onClick={() => handleSelectTheme('celebrity')}>
                    <span className="theme-icon">⭐</span>
                    <span className="theme-name">明星娱乐</span>
                    <span className="theme-desc">热搜新闻学英语</span>
                  </div>
                  <div className="context-theme-card custom" onClick={() => handleSelectTheme('custom')}>
                    <span className="theme-icon">✨</span>
                    <span className="theme-name">自定义</span>
                    <span className="theme-desc">告诉我你想学什么</span>
                  </div>
                </div>
              </div>

              <div className="context-chat-section">
                <div className="context-chat-header">
                  <i className="fas fa-comments"></i>
                  <span>AI对话学习</span>
                </div>
                <div className="context-chat-box">
                  <div className="chat-msgs" ref={chatRef}>
                    {history.length === 0 && (
                      <div className="chat-empty-state">
                        <div className="empty-illustration">
                          <i className="fas fa-comment-dots"></i>
                        </div>
                        <p>选择一个主题开始学习，或者直接问我语法问题</p>
                        <div className="quick-questions">
                          <button onClick={() => { setInputValue('用哈利波特讲讲现在完成时'); }}>
                            "用哈利波特讲讲现在完成时"
                          </button>
                          <button onClick={() => { setInputValue('以流浪地球为背景解释if虚拟语气'); }}>
                            "以流浪地球解释虚拟语气"
                          </button>
                          <button onClick={() => { setInputValue('用王者荣耀写5个定语从句'); }}>
                            "用王者荣耀写定语从句"
                          </button>
                        </div>
                      </div>
                    )}
                    {history.map(renderMsg)}
                    {isThinking && (
                      <div className="msg ai typing show">
                        AI正在思考中<span></span><span></span><span></span>
                      </div>
                    )}
                  </div>
                  <div className="input-row">
                    <textarea
                      placeholder="输入你想问的语法问题..."
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function renderComponentCard(label, icon, data, color, bgColor) {
  if (!data || !data.text) return null;
  return (
    <div className="parse-component-card" style={{ borderColor: color }}>
      <div className="component-card-header" style={{ background: bgColor }}>
        <span className="component-icon" style={{ color }}><i className={`fas ${icon}`}></i></span>
        <span className="component-label" style={{ color }}>{label}</span>
      </div>
      <div className="component-card-body">
        <div className="component-text" style={{ color }}>{data.text}</div>
        {data.detail && <div className="component-detail">{data.detail}</div>}
      </div>
    </div>
  );
}

function parseAnalysisFallback(text) {
  const result = {
    subject: { text: '', detail: '' },
    predicate: { text: '', detail: '' },
    object: { text: '', detail: '' },
    attribute: { text: '', detail: '' },
    adverbial: { text: '', detail: '' },
    complement: { text: '', detail: '' },
    clauses: [],
    phrases: [],
    summary: ''
  };

  const patterns = {
    subject: /主语[：:]\s*([^,\n，。；;]+)/,
    predicate: /谓语[：:]\s*([^,\n，。；;]+)/,
    object: /宾语[：:]\s*([^,\n，。；;]+)/,
    attribute: /定语[：:]\s*([^,\n，。；;]*)/,
    adverbial: /状语[：:]\s*([^,\n，。；;]*)/,
    complement: /补语[：:]\s*([^,\n，。；;]*)/
  };

  Object.keys(patterns).forEach(key => {
    const match = text.match(patterns[key]);
    if (match) {
      result[key] = { text: match[1].trim(), detail: match[1].trim() };
    }
  });

  return result;
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

function renderAnalysis(text) {
  if (!text) return '';

  const categoryColors = {
    '主语': '#4CAF50',
    '谓语': '#2196F3',
    '宾语': '#FF9800',
    '定语': '#9C27B0',
    '状语': '#00BCD4',
    '补语': '#E91E63',
    '从句': '#795548',
    '短语': '#607D8B'
  };

  let html = text
    .replace(/```([\s\S]*?)```/g, '<pre class="code-block">$1</pre>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  Object.keys(categoryColors).forEach(category => {
    const color = categoryColors[category];
    const regex = new RegExp(`【${category}】([^\\n【】]*)`, 'g');
    html = html.replace(regex, `<div class="analysis-item" style="border-left: 4px solid ${color};">
      <span class="analysis-tag" style="background: ${color};">${category}</span>
      <span class="analysis-text">$1</span>
    </div>`);
  });

  return `<p>${html}</p>`;
}

