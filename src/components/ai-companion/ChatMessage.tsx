import React from 'react';
import { Bot, User, CheckCircle, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.type === 'ai';

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-2xl ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 ${isAI ? 'mr-3' : 'ml-3'}`}>
          {isAI ? (
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-600" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          )}
        </div>

        <div className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
          <div
            className={`px-4 py-2 rounded-lg ${
              isAI
                ? 'bg-white border border-gray-200'
                : 'bg-indigo-600 text-white'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-xs text-gray-500">
              {message.timestamp.toLocaleTimeString()}
            </span>
            {message.status && (
              <>
                {message.status === 'sending' && (
                  <div className="w-3 h-3 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
                )}
                {message.status === 'sent' && (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                )}
                {message.status === 'error' && (
                  <AlertCircle className="w-3 h-3 text-red-500" />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}