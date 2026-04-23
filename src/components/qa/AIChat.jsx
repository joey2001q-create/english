﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../../data/knowledgeBase';
import { sendAIMessage, createAIErrorMessage } from '../../services/aiService';
import useQaStore from '../../store/useQaStore';

const quickQuestions = [
  { label: '哈利波特语法', text: '用哈利波特讲讲现在完成时' },
  { label: '宾语从句', text: '请拆解 I believe that he will come tomorrow' },
  { label: '词根记忆', text: '讲讲 ability 这个词的词根' },
];

const welcomeMessage = `👋 **你好！我是刘彬老师的专属AI助手**

🎯 有什么英语问题尽管问我：
• 单词、语法、完形、阅读、作文、听力
• 拍照发题目，我来帮你详细讲解
• 选择题不会做？告诉我，我来逐项分析！

💡 我会结合刘彬老师的方法论帮你解答，加油~💪`;

function matchKnowledgeBase(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('哈利波特') || (msg.includes('harry') && msg.includes('potter'))) {
    const grammarContext = knowledgeBase.functions.grammar.modes.context;
    return {
      type: 'grammar',
      topic: '语境记忆 - 哈利波特主题',
      title: '🎬 哈利波特语境记忆',
      content: `**哈利波特主题语法讲解**

哈利波特的世界里藏着无数语法知识点！例如：

**1. 伏地魔的现在完成时**
原文：${grammarContext.examples?.[0]?.input || "He has destroyed the wand."}
分析：主句用了现在完成时，表示过去的动作对现在的影响——伏地魔已经摧毁了老魔杖，这个动作的后果延续到现在。

**2. 时间转换器的过去完成时**
If she had not used the time-turner, she would not have saved Buckbeak.
分析：虚拟语气中的过去完成时，表示与过去事实相反的假设。

💡 **记忆口诀**：have/has + 过去分词 = 到现在已完成
             had + 过去分词 = 到过去某时已完成

你可以试着问我其他哈利波特相关的语法点哦！`
    };
  }

  if (msg.includes('现在完成时') || msg.includes('present perfect')) {
    const parse = knowledgeBase.functions.grammar.modes.parse;
    return {
      type: 'grammar',
      topic: '现在完成时',
      title: '📚 现在完成时详解',
      content: `**现在完成时（Present Perfect）**

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
答案：has lived（since 2010表示从过去持续到现在，用现在完成时）
`
    };
  }

  if (msg.includes('定语从句')) {
    const parse = knowledgeBase.functions.grammar.modes.parse;
    return {
      type: 'grammar',
      topic: '定语从句',
      title: '🔍 定语从句详解',
      content: `**定语从句（Attributive Clause）**

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
- 非限定性：有逗号，可用which/who/whom引导
`
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
      type: 'grammar',
      topic: '句子拆解',
      title: '🌳 句子结构分析',
      content: `**句子拆解结果**

原文：${matched.input}

**结构分析：**
${matched.analysis.note}

**语法树：**
${matched.analysis.analysis.split('|').map(s => `• ${s.trim()}`).join('\n')}

**考点提示：**
这类宾语从句/定语从句是中考、高考常见考点，要注意：
1. that在宾语从句中可省略，在定语从句中不可省略
2. 当先行词是不定代词（something, anything）时，只用that
3. 非限定性定语从句用which引导，有逗号
`
    };
  }

  if (msg.includes('词根') || msg.includes('word root')) {
    const wordRoot = knowledgeBase.functions.word.modes.root;
    return {
      type: 'word',
      topic: '词根串讲',
      title: '🔗 词根串讲',
      content: `**词根串讲**

词根是单词的"灵魂"，记住一个词根，就能记住一串单词！

**以"able/ability"为例：**

★ 词根：able = 能干、有才

**家族成员：**
• able → ${knowledgeBase.vocabulary[1]?.m || '能，能够的'}
• ability → ${knowledgeBase.vocabulary[0]?.m || '能力；才能'}
• unable → 不能的（un否定义 + able）
• disabled → 残疾的（dis分离 + able + ed）
• reliably → 可靠地（rely依靠 + able + ly副词后缀）

📝 **顺口溜：**
"able表示'能'，ability是'能力'，
unable加un表否定，被dis打倒成残疾！"

**例句：**
She has the **ability** to speak three languages.
（她有说三种语言的能力）
`
    };
  }

  if (msg.includes('单词') && (msg.includes('记忆') || msg.includes('背'))) {
    const wordStory = knowledgeBase.functions.word.modes.story;
    return {
      type: 'word',
      topic: '单词记忆',
      title: '🎭 个性剧场 - 单词记忆法',
      content: `**单词记忆技巧**

**方法一：词根词缀法**
记住一个词根，就能记住一串！
如：unhappy = un(不) + happy(开心) = 不开心

**方法二：语境记忆法**
把单词放到句子中，用故事情境帮助记忆！

**方法三：艾宾浩斯复习法**
按遗忘曲线规律复习：
• 1天后复习
• 3天后复习
• 7天后复习
• 15天后复习
• 30天后复习

💡 **刘彬老师建议：**
"重复是记忆他妈，语境是单词她爸！"

你可以试试对我说"用哈利波特故事记忆这些单词"，我来给你编一个有趣的故事！
`
    };
  }

  if (msg.includes('阅读理解') || msg.includes('reading')) {
    const reading = knowledgeBase.functions.reading;
    const article = knowledgeBase.readingArticles[0];
    return {
      type: 'reading',
      topic: '阅读理解',
      title: '📖 阅读理解方法',
      content: `**刘彬阅读理解四步法**

**第一步：预判**
看标题和首段，判断文章类型和主旨

**第二步：定位**
带着问题找原文对应句，划关键词

**第三步：替换**
将选项与原文对比，找同义替换

**第四步：排除**
排除明显错误的干扰项（过度推断/张冠李戴/偷换概念/无中生有）

**示例文章：**
${article.title}
难度：${article.difficulty} | 话题：${article.category}

**常见逻辑信号词：**
• 转折：but/however/although
• 递进：furthermore/moreover
• 因果：therefore/thus/because
• 举例：for example/such as

试试发给我一篇文章，我来教你用四步法分析！
`
    };
  }

  if (msg.includes('作文') || msg.includes('writing') || msg.includes('essay')) {
    const essay = knowledgeBase.functions.essay;
    return {
      type: 'essay',
      topic: '作文技巧',
      title: '✍️ 作文万能写作法',
      content: `**刘彬"模板+替换词"万能写作法**

**一、开篇结构：**
Hook（吸引读者）+ 亮出观点

**二、中间结构：**
论点1 + 论据
论点2 + 论据
论点3 + 论据

**三、结尾结构：**
总结观点 + 升华主题 + 呼吁行动

**常用替换词表：**

🔹 开头：
recently → currently
many people → a growing number of people

🔹 并列：
and → furthermore/moreover
also → in addition

🔹 转折：
but → however/nevertheless

🔹 结论：
so → therefore/consequently

**润色示例：**
❌ 初稿：I think studying English is important.
✅ 升级：In an increasingly globalized world, mastering English is of paramount importance.

把作文发给我，我来帮你批改和润色！
`
    };
  }

  if (msg.includes('听力') || msg.includes('listening')) {
    const listening = knowledgeBase.functions.listening;
    return {
      type: 'listening',
      topic: '听力技巧',
      title: '🎧 听力三板斧',
      content: `**刘彬听力"三板斧"**

**第一板斧：预判**
• 听前快速浏览选项，预测内容
• 关注数字、时间、地点等关键词

**第二板斧：信号词**
• but/however → 后面是重点
• because/therefore → 原因结果
• first/then/finally → 顺序结构

**第三板斧：同义替换**
听到的词可能和选项中的词不同！
如：原文中 "very tired" 可能选项写成 "exhausted"

**常见陷阱：**
• 数字陷阱：20% off ≠ $20
• 转换陷阱：问"A说了什么"但B说了相反内容
• 干扰项：包含原文个别词但整体意思不符

**场景词汇：**
• 购物：discount, price, cash, credit card
• 问路：turn left, go straight, next to
• 餐厅：menu, order, bill, tip

`
    };
  }

  if (msg.includes('完形填空') || msg.includes('cloze')) {
    return {
      type: 'reading',
      topic: '完形填空',
      title: '📝 完形填空技巧',
      content: `**完形填空解题方法**

**核心思想：同义替换 + 上下文推断**

**步骤一：首句不设空**
认真读首句，理解文章主旨

**步骤二：扫读全文**
快速浏览，不忘主旨

**步骤三：逐空突破**
• 看空前：判断词性
• 看空后：寻找搭配
• 看上下文：同义替换/因果/转折

**四大线索：**
1. 词汇线索：同义词、反义词
2. 语法线索：时态、主谓一致
3. 逻辑线索：but/and/so/because
4. 常识线索：符合常理

**刘彬老师提醒：**
"完形不是考单词，是考上下文！80%的答案都能在原文找到线索！"

`
    };
  }

  if (msg.includes('who') || msg.includes('你是谁') || msg.includes('什么')) {
    return {
      type: 'intro',
      topic: '自我介绍',
      title: '👋 关于我',
      content: `你好！我是刘彬老师的专属AI助手！

**我的能力：**
• 解答任何英语问题（单词、语法、阅读、作文、听力）
• 拍照识别题目并详细讲解
• 选择题逐项分析，告诉你干扰项套路
• 结合刘彬老师的方法论帮你学习

**你可以这样问我：**
• "用哈利波特讲讲现在完成时"
• "请拆解这个句子"
• "这个词的词根是什么"
• "作文怎么写开头"
• "完形填空有什么技巧"

有任何英语问题尽管问我！💪`
    };
  }

  return null;
}

function formatResponse(match, userMessage) {
  const greeting = `你好！我是刘彬老师，针对你问的这个${match.topic}，让我来帮你解答~

---

`;

  const content = match.content;

  const footer = `

---

💡 **还想了解更多？**
• 问我"用哈利波特讲语法"
• 发句子让我拆解结构
• 把作文发给我批改`;

  return greeting + content + footer;
}

function getFallbackResponse(userMessage) {
  return `这个问题很有趣！

作为 MVP 版本，我目前重点掌握了以下知识点：

🎬 **语境记忆**：哈利波特、流浪地球、王者荣耀等趣味主题语法
📚 **语法拆解**：宾语从句、定语从句、现在完成时等考点
� **词根串讲**： ability, understand, important 等核心词汇
✍️ **作文模板**：开头、中间、结尾万能写作法

你可以试着这样问我：

• "用哈利波特讲讲现在完成时"
• "请拆解 I believe that he will come tomorrow"
• "讲讲 ability 的词根"
• "作文开头怎么写"

更多功能持续开发中，敬请期待！🌟`;
}

export default function AIChat() {
  const messages = useQaStore((s) => s.messages);
  const addMessage = useQaStore((s) => s.addMessage);
  const clearMessages = useQaStore((s) => s.clearMessages);
  const pendingAIMessage = useQaStore((s) => s.pendingAIMessage);
  const clearPendingAIMessage = useQaStore((s) => s.clearPendingAIMessage);

  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  useEffect(() => {
    if (pendingAIMessage && !hasInitialized) {
      setHasInitialized(true);
      setShowWelcome(false);
      addMessage({ role: 'ai', content: pendingAIMessage });
      clearPendingAIMessage();
    }
  }, [pendingAIMessage, hasInitialized, addMessage, clearPendingAIMessage]);

  const handleQuickQuestion = (text) => {
    handleSendMessage(text);
  };

  const handleSendMessage = async (text) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    setInputValue('');
    setIsThinking(true);

    let apiSuccess = false;

    try {
      const conversationHistory = messages.map(m => ({ role: m.role, content: m.content }));
      conversationHistory.push({ role: 'user', content: messageText });

      const response = await sendAIMessage(conversationHistory);
      apiSuccess = true;

      addMessage({ role: 'ai', content: response.content });
    } catch (error) {
      console.warn('[AIChat] API调用失败，降级到本地知识库:', error.message);

      const match = matchKnowledgeBase(messageText);
      let fallbackResponse;

      if (match) {
        fallbackResponse = formatResponse(match, messageText);
      } else {
        fallbackResponse = getFallbackResponse(messageText);
      }

      addMessage({ role: 'ai', content: fallbackResponse });
    } finally {
      setIsThinking(false);
    }
  };

  const handleSend = () => {
    if (isThinking) return;
    const messageText = inputValue.trim();
    if (!messageText) return;

    setShowWelcome(false);
    addMessage({ role: 'user', content: messageText });
    handleSendMessage(messageText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = async (content, idx) => {
    try {
      // 移除HTML标签和Markdown格式，只复制纯文本
      const plainText = content
        .replace(/<[^>]*>/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/###? (.+)/g, '$1')
        .replace(/---/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim();
      await navigator.clipboard.writeText(plainText);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const renderMessage = (msg, idx) => (
    <div key={idx} className="msg-wrapper">
      <div className={`msg ${msg.role}`}>
        {msg.role === 'ai' ? (
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
        ) : (
          msg.content
        )}
      </div>
      {msg.role === 'ai' && (
        <button
          className="msg-copy-btn"
          onClick={() => handleCopy(msg.content, idx)}
          title="复制消息"
        >
          {copiedIndex === idx ? (
            <i className="fas fa-check"></i>
          ) : (
            <i className="far fa-copy"></i>
          )}
        </button>
      )}
    </div>
  );

  return (
    <div className="ai-chat-module">
      <div className="page-header">
        <div className="page-header-icon">💬</div>
        <div className="page-header-info">
          <h2>💬 刘彬AI助手</h2>
          <p>我是刘彬老师的专属AI助手 · 任何英语问题尽管问我</p>
        </div>
        <div className="page-header-actions">
          {quickQuestions.map((q) => (
            <button
              key={q.label}
              className="mode-btn"
              onClick={() => handleQuickQuestion(q.text)}
            >
              {q.label}
            </button>
          ))}
          <button className="mode-btn">📷 拍照搜题</button>
        </div>
      </div>

      <div className="chat-box chat-box-full">
        <div className="chat-msgs" ref={chatRef}>
          {showWelcome && (
            <div className="msg-wrapper">
              <div className="msg ai">{welcomeMessage}</div>
            </div>
          )}
          {messages.map(renderMessage)}
          {isThinking && (
            <div className="msg ai typing show">
              AI正在思考中<span></span><span></span><span></span>
            </div>
          )}
        </div>
        <div className="input-row">
          <textarea
            placeholder="输入任何英语问题，AI为你解答"
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn-photo" title="拍照搜题">📷</button>
          <button className="btn-send" onClick={handleSend} disabled={isThinking}>
            <i className="fas fa-paper-plane"></i>发送
          </button>
        </div>
      </div>
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
