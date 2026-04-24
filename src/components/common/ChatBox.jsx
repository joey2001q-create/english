import { useState, useRef, useEffect } from 'react';

export default function ChatBox({
  moduleId,
  placeholder = '输入内容...',
  onSend,
  onPhoto,
  onSpeak,
  messages = [],
  isTyping = false,
}) {
  const [input, setInput] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const textareaRef = useRef(null);
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim() && !selectedImage) return;
    onSend?.(input.trim(), selectedImage);
    setInput('');
    setSelectedImage(null);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    if (onPhoto) {
      onPhoto();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopy = async (content, idx) => {
    try {
      // 移除HTML标签，只复制纯文本
      const plainText = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
      await navigator.clipboard.writeText(plainText);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const renderMsg = (msg, idx) => {
    if (msg.role === 'system') {
      return (
        <div key={idx} className="msg system">
          {msg.content}
        </div>
      );
    }
    return (
      <div key={idx} className="msg-wrapper">
        <div className={`msg ${msg.role}`}>
          {msg.image && (
            <img src={msg.image} alt="用户上传" className="msg-image" />
          )}
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
  };

  return (
    <div className="chat-box">
      <div className="chat-msgs" ref={chatRef}>
        {messages.map(renderMsg)}
        {isTyping && (
          <div className="msg ai typing show">
            AI思考中<span></span><span></span><span></span>
          </div>
        )}
      </div>
      <div className="input-row">
        {selectedImage && (
          <div className="image-upload-preview">
            <img src={selectedImage} alt="待上传" />
            <button className="image-remove-btn" onClick={handleRemoveImage} title="移除图片">
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageSelect}
        />
        <button className="btn-photo" onClick={handlePhotoClick} title="上传图片">
          📷
        </button>
        {onSpeak && (
          <button className="btn-speak" onClick={() => onSpeak?.()} title="朗读">
            🔊
          </button>
        )}
        <button className="btn-send" onClick={handleSend}>
          <i className="fas fa-paper-plane"></i>发送
        </button>
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
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}
