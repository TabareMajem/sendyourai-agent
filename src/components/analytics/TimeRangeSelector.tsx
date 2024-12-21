import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface TimeRangeSelectorProps {
  value: {
    start: Date;
    end: Date;
  };
  onChange: (range: { start: Date; end: Date }) => void;
}

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const presetRanges = [
    { label: 'Today', days: 0 },
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'Last 90 Days', days: 90 }
  ];

  const handlePresetClick = (days: number) => {
    const end = new Date();
    const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    onChange({ start, end });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Calendar className="w-5 h-5 mr-2" />
        {value.start.toLocaleDateString()} - {value.end.toLocaleDateString()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {presetRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => handlePresetClick(range.days)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
              >
                {range.label}
              </button>
            ))}
            <div className="border-t border-gray-100 my-1"></div>
            <button
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              Custom Range
            </button>
          </div>
        </div>
      )}
    </div>
  );
}