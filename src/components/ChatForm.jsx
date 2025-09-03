import { useState, useRef, useEffect } from "react";

const ChatForm = ({ onSendMessage, isTyping }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || isTyping) return;
    
    onSendMessage(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isTyping}
      />
      {message.trim() && !isTyping && (
        <button 
          type="submit" 
          className="send-btn material-symbols-outlined"
          title="Send message (Enter)"
        >
          arrow_upward
        </button>
      )}
      {isTyping && (
        <div className="typing-indicator">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}
    </form>
  );
};

export default ChatForm;
