import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { languages } from '../../i18n/config';

interface LanguageSelectorProps {
  variant?: 'minimal' | 'full';
}

export function LanguageSelector({ variant = 'full' }: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang && Object.keys(languages).includes(storedLang)) {
      setCurrentLanguage(storedLang);
      i18n.changeLanguage(storedLang);
    }
  }, [i18n]);

  const handleLanguageChange = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      setCurrentLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
      setIsOpen(false);
      
      // Force reload to ensure all components update
      window.location.reload();
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  if (variant === 'minimal') {
    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <Globe className="w-5 h-5" />
          <span className="text-sm">{languages[currentLanguage as keyof typeof languages]?.nativeName}</span>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            {Object.entries(languages).map(([code, { nativeName }]) => (
              <button
                key={code}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLanguageChange(code);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
              >
                {nativeName}
                {code === currentLanguage && <Check className="w-4 h-4 text-indigo-600" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Globe className="w-5 h-5 mr-2" />
        {languages[currentLanguage as keyof typeof languages]?.nativeName}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {Object.entries(languages).map(([code, { nativeName }]) => (
            <button
              key={code}
              onClick={(e) => {
                e.stopPropagation();
                handleLanguageChange(code);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
            >
              {nativeName}
              {code === currentLanguage && <Check className="w-4 h-4 text-indigo-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}