import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';
import { useNexusStore } from '@/core/StateManager';
import { archon } from '@/intelligence/ArchonCore';
import './ArchonInterface.css';

export const ArchonInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = useNexusStore(state => state.archonMessages);
  const thinking = useNexusStore(state => state.archonThinking);
  const addMessage = useNexusStore(state => state.addArchonMessage);
  const setThinking = useNexusStore(state => state.setArchonThinking);

  const quickPrompts = [
    'Analyze current market trend',
    'What are the risks right now?',
    'Predict BTC movement',
    'Show me patterns'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: Date.now()
    };
    addMessage(userMessage);
    setInput('');

    // Process with ARCHON
    setThinking(true);
    try {
      const response = await archon.processMessage(input);
      addMessage(response);
    } catch (error) {
      addMessage({
        id: Date.now().toString(),
        role: 'archon',
        content: 'I encountered an error processing your request. Please try again.',
        timestamp: Date.now()
      });
    } finally {
      setThinking(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="archon-interface">
      <div className="archon-header">
        <Sparkles className="archon-icon" />
        <h2>ARCHON AI</h2>
        <div className="status-indicator active">ONLINE</div>
      </div>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            <Sparkles size={48} />
            <h3>ARCHON Intelligence Ready</h3>
            <p>Ask me anything about the markets</p>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.role}`}>
            <div className="message-avatar">
              {msg.role === 'user' ? 'YOU' : 'AI'}
            </div>
            <div className="message-content">
              <div className="message-text">{msg.content}</div>
              <div className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {thinking && (
          <div className="message archon">
            <div className="message-avatar">AI</div>
            <div className="message-content">
              <div className="thinking-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 0 && (
        <div className="quick-prompts">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              className="quick-prompt"
              onClick={() => handleQuickPrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask ARCHON anything..."
          disabled={thinking}
        />
        <button
          className="voice-button"
          onClick={() => setIsListening(!isListening)}
          disabled={thinking}
        >
          <Mic className={isListening ? 'listening' : ''} />
        </button>
        <button
          className="send-button"
          onClick={handleSend}
          disabled={thinking || !input.trim()}
        >
          <Send />
        </button>
      </div>
    </div>
  );
};