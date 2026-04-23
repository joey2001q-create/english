import useSpeakingStore from '../../store/useSpeakingStore';
import ChatBox from '../common/ChatBox';

export default function PronCorrection() {
  const { history, addHistory, isSending, setIsSending } = useSpeakingStore();

  const handleSend = async (text) => {
    addHistory({ role: 'user', content: text });
    setIsSending(true);
    
    setTimeout(() => {
      addHistory({ 
        role: 'ai', 
        content: `**发音分析：**\n\n"${text}" 的发音要点：\n\n1. 音标：[示例音标]\n2. 重音位置：第X个音节\n3. 易错点：...\n\n请尝试跟读，我会帮你纠正。` 
      });
      setIsSending(false);
    }, 1000);
  };

  return (
    <>
      <div className="spk-pron-area">
        <div className="spk-pron-hint">
          <i className="fas fa-info-circle"></i>
          输入英文句子或单词，AI将逐音节标注发音问题（标红显示错误音节）
        </div>
      </div>
      <ChatBox
        moduleId="speaking"
        placeholder="输入英文单词或句子，AI将逐音节标注发音问题"
        onSend={handleSend}
        messages={history}
        isTyping={isSending}
      />
    </>
  );
}
