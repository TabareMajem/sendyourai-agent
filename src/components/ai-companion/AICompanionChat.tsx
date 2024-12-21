import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Bot, AlertCircle } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { SuggestionsPanel } from './SuggestionsPanel';
import { ContextPanel } from './ContextPanel';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

export function AICompanionChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I understand you need help with that. Let me analyze the situation and provide some suggestions.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Implement file upload logic
    console.log('File uploaded:', event.target.files);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader onToggleContext={() => setShowContext(!showContext)} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          onVoiceInput={handleVoiceInput}
          onFileUpload={handleFileUpload}
          isRecording={isRecording}
        />
      </div>

      {/* Right Panel */}
      <div className="w-80 border-l border-gray-200 bg-white">
        {showContext ? (
          <ContextPanel onClose={() => setShowContext(false)} />
        ) : (
          <SuggestionsPanel />
        )}
      </div>
    </div>
  );
}