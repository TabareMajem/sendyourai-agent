import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Phone, X, MessageSquare } from 'lucide-react';
import { Conversation } from '../../../../lib/agents/sales/types';
import { SalesAgentManager } from '../../../../lib/agents/sales/SalesAgentManager';

interface ConversationPanelProps {
  leadId: string;
  onClose: () => void;
}

export function ConversationPanel({ leadId, onClose }: ConversationPanelProps) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const salesManager = new SalesAgentManager();

  useEffect(() => {
    // In a real app, fetch conversation history
    setConversation({
      id: crypto.randomUUID(),
      leadId,
      messages: [],
      status: 'active'
    });
  }, [leadId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleSend = async () => {
    if (!message.trim() || !conversation) return;

    const newMessage = {
      role: 'human' as const,
      content: message,
      timestamp: new Date()
    };

    setConversation({
      ...conversation,
      messages: [...conversation.messages, newMessage]
    });
    setMessage('');

    // Get AI response
    const response = await salesManager.handleConversation(conversation.id, message);
    
    setConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, {
        role: 'ai',
        content: response,
        timestamp: new Date()
      }]
    } : null);
  };

  const handleVoiceCall = () => {
    // Implement voice call functionality
    console.log('Starting voice call...');
  };

  if (!conversation) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquare className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Conversation</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleVoiceCall}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-3/4 rounded-lg p-3 ${
                msg.role === 'ai'
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs mt-1 opacity-75">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2 rounded-full ${
              isRecording
                ? 'bg-red-100 text-red-600'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}