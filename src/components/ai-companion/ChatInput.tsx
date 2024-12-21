import React, { useRef } from 'react';
import { Send, Mic, Paperclip, X } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onVoiceInput: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRecording: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  onVoiceInput,
  onFileUpload,
  isRecording
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-end space-x-4">
        {/* File Upload */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileUpload}
          className="hidden"
          multiple
        />

        {/* Text Input */}
        <div className="flex-1">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full resize-none rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-2 text-sm"
            rows={1}
          />
        </div>

        {/* Voice Input */}
        <button
          onClick={onVoiceInput}
          className={`p-2 rounded-full ${
            isRecording
              ? 'bg-red-100 text-red-600'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}
        >
          {isRecording ? (
            <X className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>

        {/* Send Button */}
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className="p-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}