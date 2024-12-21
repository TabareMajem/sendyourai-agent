import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        className={`
          appearance-none relative block w-full px-3 py-2 border rounded-md
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
          ${error ? 'border-red-300' : 'border-gray-300'}
        `}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}