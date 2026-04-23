import { useState, useEffect } from 'react';
import { sendAIMessage } from '../../services/aiService';
import { knowledgeBase } from '../../data/knowledgeBase';

function cleanMarkdown(text) {
  return text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/【[^】]*】/g, '')
    .replace(/^\d+\.\s*/gm, '')
    .trim();
}

export default function FillBlankView({ passage, selectedWords, onBack }) {
  const [blankSlots, setBlankSlots] = useState([]);
  const [activeSlot, setActiveSlot] = useState(null);
  const [phase, setPhase] = useState('filling');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const wordPool = selectedWords.map(w => w.word);

  useEffect(() => {
    const parts = passage.split(/(___)/g);
    const slots = [];
    let blankIndex = 0;
    parts.forEach((part) => {
      if (part === '___') {
        slots.push({ id: blankIndex, answer: null, correctWord: selectedWords[blankIndex]?.word });
        blankIndex++;
      }
    });
    setBlankSlots(slots);
    setActiveSlot(null);
    setPhase('filling');
    setAnalysis('');
    setShowResults(false);
  }, [passage]);

  const handleBlankClick = (slotId) => {
    if (phase !== 'filling') return;
    if (blankSlots[slotId].answer !== null) return;
    setActiveSlot(prev => prev === slotId ? null : slotId);
  };

  const handleWordClick = (word) => {
    if (activeSlot === null || phase !== 'filling') return;
    setBlankSlots(prev => {
      const next = [...prev];
      next[activeSlot] = { ...next[activeSlot], answer: word };
      return next;
    });
    setActiveSlot(null);
  };

  const handleRemove = (slotId) => {
    if (phase !== 'filling') return;
    setBlankSlots(prev => {
      const next = [...prev];
      next[slotId] = { ...next[slotId], answer: null };
      return next;
    });
    setActiveSlot(slotId);
  };

  const allFilled = blankSlots.length > 0 && blankSlots.every(s => s.answer !== null);

  const handleConfirm = async () => {
    setShowResults(true);
    setPhase('encouraging');
    setTimeout(async () => {
      setPhase('analyzing');
      setIsAnalyzing(true);
      try {
        const systemPrompt = knowledgeBase.functions.word.modes.fill.instruction;
        const wordList = selectedWords.map(w => w.word).join(', ');
        const result = await sendAIMessage(
          [{
            role: 'user',
            content: `请对以下短文填词进行解析。单词：${wordList}\n\n短文：\n${passage}\n\n请用刘彬老师的风格输出：\n1. 逐句中文翻译\n2. 重点单词解析（含记忆技巧）\n3. 一句话鼓励学生`
          }],
          { systemPrompt }
        );
        setAnalysis(cleanMarkdown(result.content));
      } catch (error) {
        setAnalysis('解析生成失败，请重试');
      } finally {
        setIsAnalyzing(false);
        setPhase('done');
      }
    }, 3000);
  };

  const renderPassage = () => {
    const parts = passage.split(/(___)/g);
    let slotId = 0;
    const elements = [];

    parts.forEach((part, i) => {
      if (part === '___') {
        const slot = blankSlots[slotId];
        const currentId = slotId;
        const isFilled = slot && slot.answer !== null;
        const isActive = activeSlot === currentId;
        const isCorrect = slot && isFilled && slot.answer.toLowerCase() === slot.correctWord?.toLowerCase();
        const isWrong = showResults && isFilled && !isCorrect;

        elements.push(
          <span key={`slot-${currentId}`} className="blank-slot-container">
            <span
              className={`blank-slot ${isActive ? 'active' : ''} ${isFilled ? 'filled' : ''} ${isWrong ? 'wrong' : ''}`}
              onClick={() => isFilled ? handleRemove(currentId) : handleBlankClick(currentId)}
            >
              {isFilled ? slot.answer : '___'}
            </span>
          </span>
        );
        slotId++;
      } else if (part) {
        elements.push(<span key={`text-${i}`}>{part}</span>);
      }
    });

    return elements;
  };

  const renderAnalysis = () => {
    if (!analysis) return null;
    const lines = analysis.split('\n').filter(l => l.trim());
    return lines.map((line, i) => <p key={i} className="analysis-line">{line}</p>);
  };

  const correctCount = blankSlots.filter(s => s.answer?.toLowerCase() === s.correctWord?.toLowerCase()).length;
  const totalCount = blankSlots.length;

  return (
    <div className="fill-blank-view">
      <div className="fill-header">
        <button className="func-back-btn" onClick={onBack}>← 重新选词</button>
        <span className="func-title">📄 短文填词</span>
      </div>

      <div className="fill-content">
        <div className="passage-container">
          <div className="passage-text">{renderPassage()}</div>
        </div>

        {phase === 'filling' && allFilled && (
          <div className="check-answer-section">
            <button className="check-answer-btn" onClick={handleConfirm}>确认答案</button>
          </div>
        )}

        {phase === 'encouraging' && (
          <div className="encourage-box">
            <div className="encourage-emoji">🎉</div>
            <div className="encourage-text">太棒了！坚持就是胜利，刘彬老师为你点赞！</div>
            {showResults && (
              <div className="result-summary">
                正确率：{correctCount}/{totalCount}
              </div>
            )}
          </div>
        )}

        {phase === 'analyzing' && !analysis && (
          <div className="encourage-box">
            <div className="encourage-emoji">⏳</div>
            <div className="encourage-text">刘彬老师正在为你解析短文...</div>
          </div>
        )}

        {phase === 'done' && analysis && (
          <div className="analysis-box">
            {renderAnalysis()}
          </div>
        )}
      </div>

      {phase === 'filling' && (
        <div className="word-pool-container">
          <div className="word-pool-tip">
            {activeSlot !== null ? '请选择一个单词填入空格' : '点击空格后再选择单词'}
          </div>
          <div className="word-pool">
            {wordPool.map((word, i) => {
              const isUsed = blankSlots.some(s => s.answer === word);
              return (
                <span
                  key={i}
                  className={`word-chip ${isUsed ? 'used' : ''} ${activeSlot !== null && !isUsed ? 'selectable' : ''}`}
                  onClick={() => !isUsed && handleWordClick(word)}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
