import { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../../data/knowledgeBase';
import { sendAIMessage } from '../../services/aiService';

const essayModes = knowledgeBase.functions.essay.modes;
const modeCards = [
  { key: 'correct', icon: '📷', title: '拍照批改', desc: '拍照或粘贴作文，AI阅卷老师标准批改', tag: '语法纠错' },
  { key: 'polish', icon: '✨', title: essayModes.polish.title, desc: essayModes.polish.description, tag: '文采提升' },
  { key: 'structure', icon: '📐', title: essayModes.structure.title, desc: essayModes.structure.description, tag: '框架升级' },
];

const wordReplaceTable = Object.entries(essayModes.structure.replacementWords).map(([title, items]) => ({
  title,
  items: items.map(i => `${i.from} → ${i.to}`).join('\n')
}));
const polishExample = essayModes.polish.upgradeExample;

const GRADING_STANDARD = {
  zhongkao: {
    name: '中考',
    fullScore: 20,
    high: '18-20',
    mid: '12-17',
    low: '0-11',
  },
  gaokao: {
    name: '高考',
    fullScore: 25,
    high: '23-25',
    mid: '16-22',
    low: '0-15',
  },
};

function getScoreLevel(score, examType) {
  const standard = GRADING_STANDARD[examType];
  if (examType === 'zhongkao') {
    if (score >= 18) return { level: 'high', label: '高档分', range: standard.high, color: '#27ae60' };
    if (score >= 12) return { level: 'mid', label: '中档分', range: standard.mid, color: '#f39c12' };
    return { level: 'low', label: '需努力', range: standard.low, color: '#e74c3c' };
  } else {
    if (score >= 23) return { level: 'high', label: '高档分', range: standard.high, color: '#27ae60' };
    if (score >= 16) return { level: 'mid', label: '中档分', range: standard.mid, color: '#f39c12' };
    return { level: 'low', label: '需努力', range: standard.low, color: '#e74c3c' };
  }
}

export default function EssayCorrection() {
  const [mode, setMode] = useState('cards');
  const [examType, setExamType] = useState('zhongkao');
  const [view, setView] = useState('main');
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctionResult, setCorrectionResult] = useState(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const chatRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

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
    setCapturedImage(null);
    setView('main');
  };

  const handleBack = () => {
    if (view === 'camera') {
      stopCamera();
      setView('main');
    } else if (view === 'preview') {
      setView('camera');
      startCamera();
    } else {
      setMode('cards');
      setHistory([]);
      setShowResult(false);
      setCorrectionResult(null);
      setIsCorrecting(false);
      setCapturedImage(null);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      setStream(mediaStream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('无法访问相机:', error);
      alert('无法访问相机，请确保已授权相机权限，或使用"从相册选择"功能。');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
      stopCamera();
      setView('preview');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target.result);
        setView('preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setView('camera');
    startCamera();
  };

  const handleConfirmImage = () => {
    setView('result');
    handleSubmitCorrection(capturedImage);
  };

  const parseAIResponse = (content, examType) => {
    const standard = GRADING_STANDARD[examType];
    const scoreMatch = content.match(/(\d+)\s*[分\/]/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : Math.floor(standard.fullScore * 0.7);
    
    const errors = [];
    const errorRegex = /错误[：:]\s*(.+?)\n\s*正确[：:]\s*(.+?)\n\s*原因[：:]\s*(.+?)(?=\n\n|错误[：:]|$)/gs;
    let match;
    while ((match = errorRegex.exec(content)) !== null) {
      errors.push({
        id: errors.length + 1,
        original: match[1].trim(),
        corrected: match[2].trim(),
        reason: match[3].trim(),
      });
    }

    if (errors.length === 0) {
      const simpleErrorRegex = /❌\s*(.+?)\s*→\s*✅\s*(.+?)(?:\n|$)/g;
      while ((match = simpleErrorRegex.exec(content)) !== null) {
        errors.push({
          id: errors.length + 1,
          original: match[1].trim(),
          corrected: match[2].trim(),
          reason: '语法错误',
        });
      }
    }

    const suggestions = [];
    const suggestionRegex = /建议[：:]\s*(.+?)(?=\n\d|建议[：:]|$)/gs;
    while ((match = suggestionRegex.exec(content)) !== null) {
      suggestions.push(match[1].trim());
    }

    if (suggestions.length === 0) {
      const lines = content.split('\n').filter(line => 
        line.includes('建议') || line.includes('可以') || line.includes('注意')
      );
      lines.forEach(line => {
        const cleanLine = line.replace(/^[\d\.\-\*]+\s*/, '').trim();
        if (cleanLine && cleanLine.length > 5) {
          suggestions.push(cleanLine);
        }
      });
    }

    return {
      score: Math.min(score, standard.fullScore),
      maxScore: standard.fullScore,
      errors: errors.length > 0 ? errors : [
        { id: 1, original: '未检测到明显错误', corrected: '-', reason: '作文整体较好，继续保持！' }
      ],
      suggestions: suggestions.length > 0 ? suggestions.slice(0, 5) : [
        '继续保持良好的写作习惯',
        '可以尝试使用更丰富的词汇和句型',
      ],
      rawContent: content,
    };
  };

  const handleSubmitCorrection = async (imageData) => {
    setIsCorrecting(true);
    setShowResult(false);
    setHistory([]);

    const standard = GRADING_STANDARD[examType];
    const systemPrompt = `你是刘彬英语提分专家·${standard.name}阅卷老师。

【评分标准】
- 满分：${standard.fullScore}分
- 高档分：${standard.high}分
- 中档分：${standard.mid}分

【任务】
1. 仔细阅读学生作文，找出所有语法错误（时态/主谓一致/介词/冠词/名词单复数/动词搭配）
2. 逐句分析，标注每个错误
3. 给出正确句子和错误原因
4. 根据错误数量和严重程度给出合理分数
5. 给出2-3条最关键的提升建议

【回复格式】
## 总分：X/${standard.fullScore}分

## 错误详情
错误1：
- 原句：xxx
- 正确：xxx
- 原因：xxx

错误2：
...

## 提升建议
1. xxx
2. xxx
3. xxx`;

    try {
      const messages = [];
      
      if (imageData) {
        const base64Data = imageData.split(',')[1];
        messages.push({
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: imageData,
              },
            },
            {
              type: 'text',
              text: `请批改这篇${standard.name}英语作文，满分${standard.fullScore}分。找出所有语法错误，给出正确句子和原因，并给出分数和提升建议。`,
            },
          ],
        });
      } else if (inputValue.trim()) {
        messages.push({
          role: 'user',
          content: `请批改这篇${standard.name}英语作文，满分${standard.fullScore}分。找出所有语法错误，给出正确句子和原因，并给出分数和提升建议。\n\n作文内容：\n${inputValue}`,
        });
      }

      const response = await sendAIMessage(messages, {
        systemPrompt,
        temperature: 0.3,
        maxTokens: 2000,
      });

      const result = parseAIResponse(response.content, examType);
      setCorrectionResult(result);
      setShowResult(true);
      setHistory([{ role: 'ai', content: response.content }]);
    } catch (error) {
      console.error('批改失败:', error);
      setHistory([{ 
        role: 'ai', 
        content: `批改失败：${error.message}\n\n请检查API配置后重试。` 
      }]);
    } finally {
      setIsCorrecting(false);
    }
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;
    
    setHistory(prev => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const systemPrompt = mode === 'polish' 
        ? essayModes.polish.instruction 
        : essayModes.structure.instruction;
      
      const messages = history.map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content,
      }));
      messages.push({ role: 'user', content: text });

      const response = await sendAIMessage(messages, {
        systemPrompt,
        temperature: 0.7,
        maxTokens: 1500,
      });

      setHistory(prev => [...prev, { role: 'ai', content: response.content }]);
    } catch (error) {
      setHistory(prev => [...prev, { 
        role: 'ai', 
        content: `抱歉，AI服务暂时不可用：${error.message}` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (mode === 'correct' && view === 'main') {
        handleSubmitCorrection(null);
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

  const renderCardsView = () => (
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
  );

  const renderCorrectView = () => {
    const standard = GRADING_STANDARD[examType];

    if (view === 'camera') {
      return (
        <div className="essay-camera-page">
          <div className="camera-header">
            <button className="back-btn" onClick={handleBack}>← 返回</button>
            <h2>📷 拍照批改</h2>
          </div>

          <div className="camera-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-video"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            
            <div className="camera-guide">
              <div className="guide-corner top-left"></div>
              <div className="guide-corner top-right"></div>
              <div className="guide-corner bottom-left"></div>
              <div className="guide-corner bottom-right"></div>
              <div className="guide-text">将作文放入框内</div>
            </div>
          </div>

          <div className="camera-controls">
            <button className="camera-btn gallery" onClick={() => fileInputRef.current?.click()}>
              <i className="fas fa-images"></i>
              <span>相册</span>
            </button>
            <button className="camera-btn capture" onClick={handleCapture}>
              <div className="capture-inner"></div>
            </button>
            <button className="camera-btn switch" onClick={() => setExamType(examType === 'zhongkao' ? 'gaokao' : 'zhongkao')}>
              <span className="exam-type-badge">{standard.name}</span>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      );
    }

    if (view === 'preview' && capturedImage) {
      return (
        <div className="essay-preview-page">
          <div className="preview-header">
            <button className="back-btn" onClick={handleBack}>← 返回</button>
            <h2>确认照片</h2>
          </div>

          <div className="preview-container">
            <img src={capturedImage} alt="作文预览" className="preview-image" />
          </div>

          <div className="exam-type-selector">
            <span className="selector-label">选择考试类型：</span>
            <button
              className={`type-btn ${examType === 'zhongkao' ? 'active' : ''}`}
              onClick={() => setExamType('zhongkao')}
            >
              中考（满分20分）
            </button>
            <button
              className={`type-btn ${examType === 'gaokao' ? 'active' : ''}`}
              onClick={() => setExamType('gaokao')}
            >
              高考（满分25分）
            </button>
          </div>

          <div className="preview-actions">
            <button className="action-btn retake" onClick={handleRetake}>
              <i className="fas fa-redo"></i> 重拍
            </button>
            <button className="action-btn confirm" onClick={handleConfirmImage}>
              <i className="fas fa-check"></i> 确认批改
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="essay-func-container">
        <div className="func-header">
          <button className="func-back-btn" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i> 返回
          </button>
          <span id="essay-func-title">拍照批改</span>
        </div>

        <div className="essay-sub-panel">
          <div className="exam-type-section">
            <div className="section-label">选择考试类型</div>
            <div className="exam-type-buttons">
              <button
                className={`exam-type-btn ${examType === 'zhongkao' ? 'active' : ''}`}
                onClick={() => setExamType('zhongkao')}
              >
                <span className="exam-name">中考</span>
                <span className="exam-score">满分 20 分</span>
              </button>
              <button
                className={`exam-type-btn ${examType === 'gaokao' ? 'active' : ''}`}
                onClick={() => setExamType('gaokao')}
              >
                <span className="exam-name">高考</span>
                <span className="exam-score">满分 25 分</span>
              </button>
            </div>
          </div>

          <div className="grading-standard-card">
            <div className="grading-title">📊 评分标准</div>
            <div className="grading-items">
              <div className="grading-item high">
                <span className="grade-label">高档分</span>
                <span className="grade-value">{standard.high} 分</span>
              </div>
              <div className="grading-item mid">
                <span className="grade-label">中档分</span>
                <span className="grade-value">{standard.mid} 分</span>
              </div>
              <div className="grading-item low">
                <span className="grade-label">需努力</span>
                <span className="grade-value">{standard.low} 分</span>
              </div>
            </div>
          </div>

          <div className="essay-instruction">
            <p>💡 <strong>使用方式：</strong></p>
            <ul>
              <li>点击📷拍照按钮，拍摄你的作文</li>
              <li>或从相册选择作文照片</li>
              <li>AI充当阅卷老师，找出所有语法错误并打分</li>
            </ul>
          </div>

          {showResult && correctionResult && (
            <CorrectionResultDisplay 
              result={correctionResult} 
              animatedScore={animatedScore}
              examType={examType}
            />
          )}
        </div>

        <div className="chat-box">
          <div className="chat-msgs" ref={chatRef}>
            {history.length === 0 && !isCorrecting && !showResult && (
              <div className="msg system">
                请点击下方📷按钮拍照，或直接粘贴作文文本进行批改。
              </div>
            )}
            {history.map(renderMsg)}
            {isCorrecting && (
              <div className="msg ai">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span style={{ marginLeft: 8 }}>AI正在批改中...</span>
              </div>
            )}
          </div>
          <div className="input-row">
            <textarea
              placeholder="或直接粘贴作文文本..."
              rows={2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isCorrecting}
            />
            <button 
              className="btn-photo" 
              title="拍照批改"
              onClick={() => {
                setView('camera');
                startCamera();
              }}
            >
              📷
            </button>
            <button
              className="btn-send"
              onClick={() => handleSubmitCorrection(null)}
              disabled={isCorrecting || !inputValue.trim()}
            >
              <i className="fas fa-paper-plane"></i> 批改
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CorrectionResultDisplay = ({ result, animatedScore, examType }) => {
    const standard = GRADING_STANDARD[examType];
    const scoreLevel = getScoreLevel(result.score, examType);
    
    return (
      <div className="correction-result">
        <div className="score-display">
          <div className="score-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="45" fill="none" stroke={scoreLevel.color} strokeWidth="8"
                strokeDasharray={`${(animatedScore / standard.fullScore) * 283} 283`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
            </svg>
            <div className="score-text">
              <span className="score-num">{animatedScore}</span>
              <span className="score-max">/{standard.fullScore}</span>
            </div>
          </div>
          <div className="score-label" style={{ color: scoreLevel.color }}>
            {scoreLevel.label} ({scoreLevel.range})
          </div>
          <div className="exam-type-tag">{standard.name}作文</div>
        </div>

        <div className="error-list">
          <div className="error-list-title">📝 错误详情</div>
          {result.errors.map((err) => (
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
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    );
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

      {mode === 'cards' && renderCardsView()}

      {mode === 'correct' && renderCorrectView()}

      {mode === 'polish' && (
        <div className="essay-func-container">
          <div className="func-header">
            <button className="func-back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> 返回
            </button>
            <span id="essay-func-title">智能润色</span>
          </div>

          <div className="essay-sub-panel">
            <div className="structure-input-area">
              <div className="input-header">
                <span className="input-icon">✨</span>
                <span className="input-title">粘贴你的作文，AI帮你润色提升</span>
              </div>
              <textarea
                placeholder="将你的作文粘贴到这里，AI会帮你润色升级，让文章更加出彩..."
                rows={6}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
              />
              <button
                className="optimize-btn polish-btn"
                onClick={handleSend}
                disabled={isTyping || !inputValue.trim()}
              >
                <i className="fas fa-magic"></i>
                {isTyping ? '润色中...' : '开始润色'}
              </button>
            </div>

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

            {history.length > 0 && history.filter(m => m.role === 'ai').length > 0 && (
              <div className="structure-result-area">
                <div className="result-header">
                  <span className="result-icon">✨</span>
                  <span className="result-title">润色结果</span>
                </div>
                <div className="result-content">
                  {history.filter(m => m.role === 'ai').map((msg, idx) => (
                    <PolishMessage key={idx} msg={msg} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {mode === 'structure' && (
        <div className="essay-func-container">
          <div className="func-header">
            <button className="func-back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> 返回
            </button>
            <span id="essay-func-title">结构优化</span>
          </div>

          <div className="essay-sub-panel">
            <div className="structure-input-area">
              <div className="input-header">
                <span className="input-icon">✍️</span>
                <span className="input-title">粘贴你的作文，AI帮你优化结构</span>
              </div>
              <textarea
                placeholder="将你的作文粘贴到这里，AI会按照刘彬老师的万能写作法帮你优化结构..."
                rows={6}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
              />
              <button
                className="optimize-btn"
                onClick={handleSend}
                disabled={isTyping || !inputValue.trim()}
              >
                <i className="fas fa-magic"></i>
                {isTyping ? '优化中...' : '开始优化'}
              </button>
            </div>

            <div className="structure-template-card">
              <div className="template-header">
                <div className="template-icon">📐</div>
                <div className="template-title">刘彬老师"模板+替换词"万能写作法</div>
              </div>
              
              <div className="structure-sections">
                <div className="structure-section opening">
                  <div className="section-header">
                    <span className="section-icon">🎯</span>
                    <span className="section-name">开头段</span>
                  </div>
                  <div className="section-content">
                    <div className="section-formula">
                      <span className="formula-label">公式：</span>
                      <span className="formula-text">Hook吸引读者 + 亮出观点</span>
                    </div>
                    <div className="section-tips">
                      <div className="tip-item">
                        <span className="tip-icon">💡</span>
                        <span>Hook技巧：用问题/数据/名言/对比开头</span>
                      </div>
                      <div className="tip-item">
                        <span className="tip-icon">💡</span>
                        <span>亮观点：In my opinion / From my perspective</span>
                      </div>
                    </div>
                    <div className="section-example">
                      <div className="example-label">示例：</div>
                      <div className="example-text">
                        "Have you ever wondered why English learning becomes a nightmare for many students? From my perspective, the key lies in finding the right method."
                      </div>
                    </div>
                  </div>
                </div>

                <div className="structure-arrow">↓</div>

                <div className="structure-section body">
                  <div className="section-header">
                    <span className="section-icon">📝</span>
                    <span className="section-name">中间段（主体）</span>
                  </div>
                  <div className="section-content">
                    <div className="section-formula">
                      <span className="formula-label">公式：</span>
                      <span className="formula-text">论点1+论据 / 论点2+论据 / 论点3+论据</span>
                    </div>
                    <div className="body-points">
                      <div className="point-card">
                        <div className="point-num">01</div>
                        <div className="point-content">
                          <div className="point-title">论点1</div>
                          <div className="point-desc">Firstly / To begin with</div>
                          <div className="point-example">+ 具体例子/数据</div>
                        </div>
                      </div>
                      <div className="point-card">
                        <div className="point-num">02</div>
                        <div className="point-content">
                          <div className="point-title">论点2</div>
                          <div className="point-desc">Moreover / Furthermore</div>
                          <div className="point-example">+ 具体例子/数据</div>
                        </div>
                      </div>
                      <div className="point-card">
                        <div className="point-num">03</div>
                        <div className="point-content">
                          <div className="point-title">论点3</div>
                          <div className="point-desc">Finally / Last but not least</div>
                          <div className="point-example">+ 具体例子/数据</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="structure-arrow">↓</div>

                <div className="structure-section closing">
                  <div className="section-header">
                    <span className="section-icon">✨</span>
                    <span className="section-name">结尾段</span>
                  </div>
                  <div className="section-content">
                    <div className="section-formula">
                      <span className="formula-label">公式：</span>
                      <span className="formula-text">总结观点 + 升华主题 + 呼吁行动</span>
                    </div>
                    <div className="section-tips">
                      <div className="tip-item">
                        <span className="tip-icon">💡</span>
                        <span>总结：In conclusion / To sum up</span>
                      </div>
                      <div className="tip-item">
                        <span className="tip-icon">💡</span>
                        <span>升华：强调重要性/展望未来</span>
                      </div>
                      <div className="tip-item">
                        <span className="tip-icon">💡</span>
                        <span>呼吁：Let's... / It's high time that...</span>
                      </div>
                    </div>
                    <div className="section-example">
                      <div className="example-label">示例：</div>
                      <div className="example-text">
                        "In conclusion, mastering English is not just about passing exams, but about opening doors to a broader world. Let's take action now and make every effort count!"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

            {history.length > 0 && history.filter(m => m.role === 'ai').length > 0 && (
              <div className="structure-result-area">
                <div className="result-header">
                  <span className="result-icon">📊</span>
                  <span className="result-title">优化结果</span>
                </div>
                <div className="result-content">
                  {history.filter(m => m.role === 'ai').map((msg, idx) => (
                    <PolishMessage key={idx} msg={msg} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const PolishMessage = ({ msg }) => {
  if (msg.role === 'system') {
    return <div className="msg system">{msg.content}</div>;
  }

  if (msg.role === 'user') {
    return <div className="msg user">{msg.content}</div>;
  }

  const content = msg.content;
  
  const parseMarkdown = (text) => {
    const parts = [];
    let remaining = text;
    
    const sections = remaining.split(/^(##\s+.+)$/gm).filter(Boolean);
    
    if (sections.length > 1) {
      sections.forEach((section, idx) => {
        if (section.startsWith('## ')) {
          const title = section.replace('## ', '').trim();
          parts.push({ type: 'heading', content: title, key: `h-${idx}` });
        } else {
          parts.push({ type: 'content', content: section.trim(), key: `c-${idx}` });
        }
      });
    } else {
      parts.push({ type: 'content', content: text, key: 'main' });
    }
    
    return parts;
  };

  const renderContent = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentList = [];
    let listType = null;
    let inTable = false;
    let tableRows = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="polish-list">
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatText(item) }} />
            ))}
          </ul>
        );
        currentList = [];
        listType = null;
      }
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <table key={`table-${elements.length}`} className="polish-table">
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} dangerouslySetInnerHTML={{ __html: formatText(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
        tableRows = [];
        inTable = false;
      }
    };

    const formatText = (text) => {
      return text
        .replace(/\*\*(.+?)\*\*/g, '<strong class="highlight-word">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>');
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushList();
        inTable = true;
        if (!trimmed.includes('---')) {
          const cells = trimmed.split('|').filter(c => c.trim()).map(c => c.trim());
          tableRows.push(cells);
        }
        return;
      }
      
      if (inTable) {
        flushTable();
      }

      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h4 key={idx} className="polish-subheading">
            {trimmed.replace('### ', '')}
          </h4>
        );
      } else if (trimmed.startsWith('- **') || trimmed.startsWith('* **')) {
        const item = trimmed.replace(/^[-*]\s*/, '');
        currentList.push(item);
      } else if (trimmed.match(/^\d+\.\s/)) {
        flushList();
        const item = trimmed.replace(/^\d+\.\s*/, '');
        currentList.push(item);
        listType = 'ol';
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const item = trimmed.replace(/^[-*]\s*/, '');
        currentList.push(item);
      } else if (trimmed === '---') {
        flushList();
        elements.push(<hr key={idx} className="polish-divider" />);
      } else if (trimmed) {
        flushList();
        elements.push(
          <p key={idx} className="polish-paragraph" dangerouslySetInnerHTML={{ __html: formatText(trimmed) }} />
        );
      }
    });

    flushList();
    flushTable();

    return elements;
  };

  const parts = parseMarkdown(content);

  return (
    <div className="msg ai polish-result">
      {parts.map((part) => {
        if (part.type === 'heading') {
          return (
            <div key={part.key} className="polish-section">
              <h3 className="polish-heading">{part.content}</h3>
            </div>
          );
        }
        return (
          <div key={part.key} className="polish-content">
            {renderContent(part.content)}
          </div>
        );
      })}
    </div>
  );
};