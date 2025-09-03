import { useState, useEffect, useRef } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import apiService from "./config/api";

const App = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hello! 👋 I'm your AI assistant. I'm here to help you with any questions, tasks, or conversations you might have. What can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const addMessage = (message, type = 'user') => {
    const newMessage = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date()
    };
    setChatHistory(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (message) => {
    // Add user message
    addMessage(message, 'user');
    setIsTyping(true);

    try {
      // Get conversation history for context
      const conversationHistory = chatHistory.filter(chat => chat.type !== 'bot' || chat.message !== "Hello! 👋 I'm your AI assistant. I'm here to help you with any questions, tasks, or conversations you might have. What can I help you with today?");
      
      // Call the actual API
      const response = await apiService.sendMessage(message, conversationHistory);
      addMessage(response, 'bot');
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage("Sorry, I'm having trouble connecting right now. Please try again later.", 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/*header*/}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon size={24} color="#fff" strokeWidth={2} />
            <h2 className="logo-text">AI Assistant</h2>
          </div>
          <button className="p-2 rounded-full hover:bg-blue-500" title="Minimize chat">
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
          </button>
        </div>
        
        {/*body */}
        <div className="chat-body" ref={chatBodyRef}>
          {chatHistory.map((chat) => (
            <div key={chat.id} className={`message ${chat.type}-message`}>
              {chat.type === 'bot' && (
                <ChatbotIcon size={20} color="#667eea" strokeWidth={2} />
              )}
              <p className="message-text">
                {chat.message}
              </p>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message">
              <ChatbotIcon size={20} color="#667eea" strokeWidth={2} />
              <div className="typing-indicator">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
        </div>
        
        {/*footer*/}
        <div className="chat-footer">
          <ChatForm onSendMessage={handleSendMessage} isTyping={isTyping} />
        </div>
      </div>
    </div>
  );
};

export default App;
