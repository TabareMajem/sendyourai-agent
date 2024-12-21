import React from 'react';
import { Bot, Info, Settings } from 'lucide-react';

interface ChatHeaderProps {
  onToggleContext: () => void;
}

export function ChatHeader({ onToggleContext }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <Bot className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Companion</h2>
            <p className="text-sm text-gray-500">Always here to help</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleContext}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <Info className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}