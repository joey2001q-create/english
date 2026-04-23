﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../../data/knowledgeBase';
import { sendAIMessage } from '../../services/aiService';

const readingModes = knowledgeBase.functions.reading.modes;
const modeCards = [
  { key: 'background', icon: '📚', title: readingModes.background.title, desc: readingModes.background.description, tag: '文化扫盲' },
  { key: 'structure', icon: '🗺️', title: readingModes.structure.title, desc: readingModes.structure.description, tag: '上帝视角' },
  { key: 'review', icon: '🔍', title: '扫描文章', desc: readingModes.review.description, tag: '智能闭环' },
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
  const [scannedImage, setScannedImage] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

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
    setScannedImage(null);
    setScanResult(null);
    setIsScanning(false);
  };

  const handleBack = () => {
    setMode('cards');
    setHistory([]);
    setSelectedOption({});
    setExpandedAnalysis({});
    setShowArticle(false);
    setScannedImage(null);
    setScanResult(null);
    setIsScanning(false);
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

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setScannedImage(event.target.result);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setScannedImage(null);
    setScanResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStartScan = async () => {
    if (!scannedImage) return;

    setIsScanning(true);

    try {
      const response = await fetch(scannedImage);
      const blob = await response.blob();

      const conversationHistory = [{
        role: 'user',
        content: `请分析这张图片中的阅读理解文章，进行以下两个方面的分析：

1. 【文章结构与作者意图分析】
   - 文章类型（说明文/议论文/记叙文等）
   - 文章主题
   - 文章结构梳理（开头/发展/结尾）
   - 作者写作意图
   - 段落大意总结

2. 【长难句分析】
   - 识别并标注文中所有长难句
   - 对每个长难句进行语法成分拆解（主语/谓语/宾语/定语/状语/补语等）
   - 解释句子的逻辑关系

请用清晰的格式返回分析结果。`
      }];

      const systemPrompt = `你是一个专业的英语阅读理解老师。你需要分析用户上传的图片中的英语文章，进行以下分析：

1. 文章结构与作者意图分析：
   - 判断文章类型
   - 概括文章主题
   - 分析文章结构（总分总/时间顺序/空间顺序等）
   - 分析作者的写作意图和态度
   - 用简洁的语言概括每段大意

2. 长难句分析：
   - 找出文中所有较复杂的句子
   - 对每个句子进行详细的语法成分分析
   - 标注：主语、谓语、宾语、定语、状语、补语、从句等
   - 解释句子的含义和逻辑关系

请直接返回纯JSON，不要包含任何说明文字、注释或markdown格式。
{
  "articleType": "文章类型",
  "theme": "文章主题",
  "structure": "文章结构",
  "authorIntent": "作者意图",
  "paragraphs": ["段落1大意", "段落2大意", ...],
  "longSentences": [
    {
      "original": "原句",
      "subject": "主语",
      "predicate": "谓语",
      "object": "宾语",
      "attribute": "定语",
      "adverbial": "状语",
      "complement": "补语",
      "clause": "从句类型（如有）",
      "meaning": "句子含义"
    }
  ]
}`;

      const aiResponse = await sendAIMessage(conversationHistory, { systemPrompt });
      let parsedData;
      try {
        let jsonStr = aiResponse.content.trim();
        if (jsonStr.startsWith('```')) {
          jsonStr = jsonStr.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
        }
        parsedData = JSON.parse(jsonStr);
      } catch (e) {
        console.warn('[Reading] JSON解析失败:', e.message);
        parsedData = null;
      }

      setScanResult({
        image: scannedImage,
        data: parsedData,
        raw: aiResponse.content
      });
    } catch (error) {
      console.error('[Reading] 扫描失败:', error);
      setScanResult({
        image: scannedImage,
        data: null,
        raw: `扫描失败：${error.message}`
      });
    } finally {
      setIsScanning(false);
    }
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

  return (
    <div className="reading-comprehension-module">
      <div className="page-header">
        <div className="page-header-icon">📝</div>
        <div className="page-header-info">
          <h2>阅读理解</h2>
          <p>扫描文章 · 背景知识 · 文章骨架</p>
        </div>
      </div>

      {mode === 'cards' && (
        <div className="read-cards-container">
          <div className="read-cards-row-full">
            <div
              className="read-card read-card-featured"
              onClick={() => handleSelectMode('review')}
            >
              <div className="read-card-icon">{modeCards.find(c => c.key === 'review').icon}</div>
              <h3>{modeCards.find(c => c.key === 'review').title}</h3>
              <p>{modeCards.find(c => c.key === 'review').desc}</p>
              <div className="read-card-tag">{modeCards.find(c => c.key === 'review').tag}</div>
            </div>
          </div>
          <div className="read-cards-row-double">
            {modeCards.filter(c => c.key !== 'review').map((card) => (
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
        </div>
      )}

      {mode !== 'cards' && (
        <div className="read-func-container">
          <div className="func-header">
            <button className="func-back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> 返回
            </button>
            <span id="read-func-title">
              {mode === 'background' ? '背景知识补充' : mode === 'structure' ? '文章骨架梳理' : '扫描文章'}
            </span>
          </div>

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

          {mode === 'review' && !scannedImage && (
            <div className="read-scan-panel">
              <div className="scan-upload-area" onClick={handlePhotoClick}>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
                <div className="scan-upload-icon">
                  <i className="fas fa-camera"></i>
                </div>
                <h3>拍照或上传文章图片</h3>
                <p>点击此处选择图片</p>
                <div className="scan-upload-hint">
                  <span><i className="fas fa-check-circle"></i> 支持拍照或相册选择</span>
                  <span><i className="fas fa-check-circle"></i> AI智能识别文章内容</span>
                  <span><i className="fas fa-check-circle"></i> 自动分析结构和长难句</span>
                </div>
              </div>

              <div className="scan-tips">
                <div className="scan-tips-title">
                  <i className="fas fa-lightbulb"></i>
                  扫描分析内容
                </div>
                <div className="scan-tips-grid">
                  <div className="scan-tip-card">
                    <span className="scan-tip-icon">📖</span>
                    <span className="scan-tip-label">文章结构分析</span>
                    <span className="scan-tip-desc">类型/主题/段落/意图</span>
                  </div>
                  <div className="scan-tip-card">
                    <span className="scan-tip-icon">🔍</span>
                    <span className="scan-tip-label">长难句解析</span>
                    <span className="scan-tip-desc">主谓宾/定状补/从句</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === 'review' && scannedImage && !scanResult && (
            <div className="read-scan-preview">
              <div className="scan-preview-header">
                <h3><i className="fas fa-image"></i> 已选择图片</h3>
                <button className="btn-remove-image" onClick={handleRemoveImage}>
                  <i className="fas fa-times"></i> 移除
                </button>
              </div>
              <div className="scan-image-container">
                <img src={scannedImage} alt="预览" className="scan-preview-image" />
              </div>
              <div className="scan-action">
                <button className="btn-scan-start" onClick={handleStartScan} disabled={isScanning}>
                  {isScanning ? (
                    <>
                      <span className="btn-spinner"></span>
                      AI正在扫描分析中...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-search"></i>
                      开始扫描分析
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {mode === 'review' && scanResult && (
            <div className="read-scan-result">
              <div className="scan-result-header">
                <button className="btn-new-scan" onClick={handleRemoveImage}>
                  <i className="fas fa-redo"></i> 扫描新文章
                </button>
              </div>

              <div className="scan-result-image">
                <img src={scanResult.image} alt="原文图片" />
              </div>

              {scanResult.data && (
                <div className="scan-analysis-content">
                  <div className="scan-article-card">
                    <div className="scan-article-header">
                      <span className="header-icon">📖</span>
                      <span className="header-title">文章结构与作者意图分析</span>
                    </div>
                    <div className="scan-article-body">
                      <div className="scan-article-grid">
                        <div className="scan-info-block">
                          <div className="info-label">文章类型</div>
                          <div className="info-value">{scanResult.data.articleType}</div>
                        </div>
                        <div className="scan-info-block">
                          <div className="info-label">文章主题</div>
                          <div className="info-value">{scanResult.data.theme}</div>
                        </div>
                        <div className="scan-structure-card">
                          <div className="info-label">文章结构</div>
                          <div className="info-value">{scanResult.data.structure}</div>
                        </div>
                        <div className="scan-info-block">
                          <div className="info-label">作者意图</div>
                          <div className="info-value">{scanResult.data.authorIntent}</div>
                        </div>
                      </div>
                      {scanResult.data.paragraphs && scanResult.data.paragraphs.length > 0 && (
                        <>
                          <div className="scan-article-divider"></div>
                          <div className="scan-paragraphs-title">段落大意</div>
                          <div className="scan-paragraphs-list">
                            {scanResult.data.paragraphs.map((p, i) => (
                              <div key={i} className="scan-paragraph-item">
                                <span className="para-index">段{i + 1}</span>
                                <span className="para-text">{p}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="scan-sentence-card">
                    <div className="scan-sentence-header">
                      <span className="header-icon">🔍</span>
                      <span className="header-title">长难句解析</span>
                    </div>
                    <div className="scan-sentence-body">
                      {scanResult.data.longSentences && scanResult.data.longSentences.length > 0 ? (
                        scanResult.data.longSentences.map((s, i) => (
                          <div key={i} className="scan-sentence-item">
                            <div className="scan-sentence-original">
                              <span className="scan-sentence-num">{i + 1}</span>
                              <span className="scan-sentence-text">{s.original}</span>
                            </div>
                            <div className="scan-components-grid">
                              {s.subject && <span className="scan-comp-tag subject">主语：{s.subject}</span>}
                              {s.predicate && <span className="scan-comp-tag predicate">谓语：{s.predicate}</span>}
                              {s.object && <span className="scan-comp-tag object">宾语：{s.object}</span>}
                              {s.attribute && <span className="scan-comp-tag attribute">定语：{s.attribute}</span>}
                              {s.adverbial && <span className="scan-comp-tag adverbial">状语：{s.adverbial}</span>}
                              {s.complement && <span className="scan-comp-tag complement">补语：{s.complement}</span>}
                              {s.clause && <span className="scan-comp-tag clause">从句：{s.clause}</span>}
                            </div>
                            {s.meaning && (
                              <div className="scan-sentence-meaning">
                                <i className="fas fa-lightbulb"></i>
                                <span>{s.meaning}</span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="scan-no-sentences">
                          <i className="far fa-check-circle"></i>
                          <p>未检测到长难句</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {!scanResult.data && (
                <div className="scan-raw-content">
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(scanResult.raw) }} />
                </div>
              )}
            </div>
          )}

          {mode !== 'cards' && mode !== 'review' && (
            <div className="chat-box">
              <div className="chat-msgs" ref={chatRef}>
                {history.map(renderMsg)}
              </div>
              <div className="input-row">
                <textarea
                  placeholder="输入阅读相关问题，AI为你解答"
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
          )}
        </div>
      )}
    </div>
  );
}

