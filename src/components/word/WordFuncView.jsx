import { useState, useEffect, useMemo } from 'react';
import useWordStore from '../../store/useWordStore';
import ChatBox from '../common/ChatBox';
import FillBlankView from './FillBlankView';
import { sendAIMessage, createAIErrorMessage } from '../../services/aiService';
import { knowledgeBase } from '../../data/knowledgeBase';

const SYS_PROMPTS = {
  story: knowledgeBase.functions.word.modes.story.instruction,
  root: knowledgeBase.functions.word.modes.root.instruction,
  fill: knowledgeBase.functions.word.modes.fill.instruction,
  listen: knowledgeBase.functions.word.modes.listen.instruction,
  error: knowledgeBase.functions.word.modes.error.instruction,
  dict: knowledgeBase.functions.word.modes.dict?.instruction || '你是单词听写助手',
};

const MAX_WORDS = {
  story: 9,
  fill: { min: 3, max: 10 },
};

export default function WordFuncView() {
  const { mode, setMode, isSending, setIsSending, learnedWords, todayLearned, masteredWords, favoriteWords } = useWordStore();
  const [showWordSelect, setShowWordSelect] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const availableWords = useMemo(() => {
    const allWords = [...(todayLearned || []), ...(learnedWords || [])];
    const masteredSet = new Set(masteredWords || []);
    const uniqueMap = new Map();
    
    allWords.forEach(word => {
      const wordStr = typeof word === 'string' ? word : word?.word;
      if (wordStr && !masteredSet.has(wordStr) && !uniqueMap.has(wordStr)) {
        uniqueMap.set(wordStr, typeof word === 'string' ? { word: word, definition: '' } : word);
      }
    });
    return Array.from(uniqueMap.values()).slice(0, 9);
  }, [learnedWords, todayLearned, masteredWords]);

  const fillModeWords = useMemo(() => {
    const todayWords = (todayLearned || []).slice(0, 9).map(word => {
      if (typeof word === 'string') {
        return { word: word, definition: '' };
      }
      return word;
    });
    return todayWords;
  }, [todayLearned]);

  useEffect(() => {
    if (mode === 'story' || mode === 'fill') {
      setShowWordSelect(true);
      setSelectedWords([]);
      setConversationMessages([]);
    } else {
      setShowWordSelect(false);
    }
  }, [mode]);

  const toggleWord = (word) => {
    if (selectedWords.find(w => w.word === word.word)) {
      setSelectedWords(selectedWords.filter(w => w.word !== word.word));
    } else {
      const maxWords = typeof MAX_WORDS[mode] === 'object' ? MAX_WORDS[mode].max : MAX_WORDS[mode];
      if (mode === 'story' || selectedWords.length < maxWords) {
        setSelectedWords([...selectedWords, word]);
      }
    }
  };

  const handleGenerateContent = async () => {
    if (selectedWords.length === 0) return;

    setIsGenerating(true);

    const wordList = selectedWords.map(w => w.word).join(', ');
    const systemPrompt = SYS_PROMPTS[mode];

    try {
      const result = await sendAIMessage(
        [{ role: 'user', content: `请为以下单词生成内容：${wordList}` }],
        { systemPrompt }
      );

      setConversationMessages([{
        role: 'ai',
        content: result.content
      }]);
      setShowWordSelect(false);
    } catch (error) {
      console.error('[WordFuncView] AI调用失败:', error);
      setConversationMessages([{
        role: 'ai',
        content: createAIErrorMessage(error)
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackToSelect = () => {
    setShowWordSelect(true);
    setConversationMessages([]);
  };

  const handleSend = async (text) => {
    setConversationMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsSending(true);

    try {
      const systemPrompt = SYS_PROMPTS[mode];
      const conversationHistory = conversationMessages.map(m => ({ role: m.role, content: m.content }));
      conversationHistory.push({ role: 'user', content: text });

      const result = await sendAIMessage(conversationHistory, { systemPrompt });
      setConversationMessages(prev => [...prev, { role: 'ai', content: result.content }]);
    } catch (error) {
      console.error('[WordFuncView] AI调用失败:', error);
      const errorMessage = createAIErrorMessage(error);
      setConversationMessages(prev => [...prev, { role: 'ai', content: errorMessage }]);
    } finally {
      setIsSending(false);
    }
  };

  if ((mode === 'story' || mode === 'fill') && showWordSelect) {
    const isStoryMode = mode === 'story';
    const maxWords = typeof MAX_WORDS[mode] === 'object' ? MAX_WORDS[mode].max : MAX_WORDS[mode];
    const minWords = typeof MAX_WORDS[mode] === 'object' ? MAX_WORDS[mode].min : 1;
    const displayWords = isStoryMode ? availableWords : fillModeWords;
    const hasWords = displayWords.length > 0;

    return (
      <div className="word-func-view">
        <div className="func-header">
          <button className="func-back-btn" onClick={() => setMode('cards')}>
            ← 返回
          </button>
          <span className="func-title">
            {isStoryMode ? '🎭 个性剧场 - 选择单词' : '📄 短文填词 - 选择单词'}
          </span>
        </div>

        <div className="word-select-container">
          <div className="word-select-header">
            <p className="word-select-tip">
              {isStoryMode
                ? `选择单词（可选1-${maxWords}个），AI将为你生成趣味故事`
                : `选择${minWords}-${maxWords}个今日学习的单词，AI将为你生成短文填空练习`
              }
            </p>
            {!hasWords && (
              <p className="word-select-empty">
                {isStoryMode 
                  ? '暂无已学习的单词，请先去「单词速记」学习单词'
                  : '暂无今日学习的单词，请先去「单词速记」学习单词'
                }
              </p>
            )}
          </div>

          {hasWords && (
            <>
              <div className="word-select-grid">
                {displayWords.map((word) => (
                  <div
                    key={word.word}
                    className={`word-select-card ${selectedWords.find(w => w.word === word.word) ? 'selected' : ''}`}
                    onClick={() => toggleWord(word)}
                  >
                    <span className="word-select-check">✓</span>
                    <span className="word-select-word">{word.word}</span>
                    {word.definition && <span className="word-select-def">{word.definition}</span>}
                  </div>
                ))}
              </div>

              <div className="word-select-footer">
                <span className="word-select-count">
                  {isStoryMode 
                    ? `已选择 ${selectedWords.length} 个单词`
                    : `已选择 ${selectedWords.length} 个单词（最少${minWords}个）`
                  }
                </span>
                <button
                  className={`generate-story-btn ${mode === 'fill' ? 'fill-mode' : ''}`}
                  onClick={handleGenerateContent}
                  disabled={isStoryMode ? selectedWords.length === 0 : (selectedWords.length < minWords || selectedWords.length > maxWords || isGenerating)}
                >
                  {isGenerating ? '生成中...' : (isStoryMode ? '生成故事' : '生成短文')}
                </button>
              </div>
            </>
          )}

          {!hasWords && (
            <div className="word-select-actions">
              <button
                className="go-study-btn"
                onClick={() => setMode('study')}
              >
                去学习单词
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'fill' && conversationMessages.length > 0) {
    const aiContent = conversationMessages[0]?.content || '';

    return (
      <FillBlankView
        passage={aiContent}
        selectedWords={selectedWords}
        onBack={handleBackToSelect}
      />
    );
  }

  if (mode === 'story' && conversationMessages.length > 0) {
    return (
      <div className="word-func-view">
        <div className="func-header">
          <button className="func-back-btn" onClick={handleBackToSelect}>
            ← 重新选词
          </button>
          <span className="func-title">
            🎭 个性剧场
          </span>
        </div>
        <ChatBox
          moduleId="word"
          placeholder="继续对话或选择新单词生成故事..."
          onSend={handleSend}
          messages={conversationMessages}
          isTyping={isSending}
        />
      </div>
    );
  }

  if (mode !== 'story' && mode !== 'fill') {
    const titles = {
      root: '🔗 词根串讲',
      listen: '📻 单词随身听',
      dict: '✏️ 单词听写',
      error: '❌ 错词库',
    };

    const placeholders = {
      root: '输入一个核心单词，我来帮你串讲词根家族，例如：compete',
      listen: '点击按钮开始播放已学单词',
      dict: '输入单词拼写，按Enter发送（说"好了"跳下一题，说"提示"获取提示）',
      error: '错词库已加载！点击下方按钮进行训练',
    };

    const handleOtherSend = async (text) => {
      useWordStore.getState().addHistory({ role: 'user', content: text });
      useWordStore.getState().setIsSending(true);

      try {
        const systemPrompt = SYS_PROMPTS[mode] || knowledgeBase.functions.qa.instruction;

        const result = await sendAIMessage(
          [{ role: 'user', content: text }],
          { systemPrompt }
        );

        useWordStore.getState().addHistory({ role: 'ai', content: result.content });
      } catch (error) {
        console.error('[WordFuncView] AI调用失败:', error);
        const errorMessage = createAIErrorMessage(error);
        useWordStore.getState().addHistory({ role: 'ai', content: errorMessage });
      } finally {
        useWordStore.getState().setIsSending(false);
      }
    };

    return (
      <div className="word-func-view">
        <div className="func-header">
          <button className="func-back-btn" onClick={() => setMode('cards')}>
            ← 返回
          </button>
          <span id="func-title">{titles[mode]}</span>
        </div>
        <ChatBox
          moduleId="word"
          placeholder={placeholders[mode]}
          onSend={handleOtherSend}
          messages={useWordStore.getState().history}
          isTyping={useWordStore.getState().isSending}
        />
      </div>
    );
  }

  return null;
}
