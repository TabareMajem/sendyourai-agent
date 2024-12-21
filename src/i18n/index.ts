import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './translations/en';
import { ja } from './translations/ja';
import { ko } from './translations/ko';
import { zh } from './translations/zh';
import { es } from './translations/es';
import { pt } from './translations/pt';
import { ru } from './translations/ru';
import { fr } from './translations/fr';
import { it } from './translations/it';
import { de } from './translations/de';

export const languages = {
  en: { nativeName: 'English' },
  ja: { nativeName: '日本語' },
  ko: { nativeName: '한국어' },
  zh: { nativeName: '中文' },
  es: { nativeName: 'Español' },
  pt: { nativeName: 'Português' },
  ru: { nativeName: 'Русский' },
  fr: { nativeName: 'Français' },
  it: { nativeName: 'Italiano' },
  de: { nativeName: 'Deutsch' }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ja: { translation: ja },
      ko: { translation: ko },
      zh: { translation: zh },
      es: { translation: es },
      pt: { translation: pt },
      ru: { translation: ru },
      fr: { translation: fr },
      it: { translation: it },
      de: { translation: de }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;