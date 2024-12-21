import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

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
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    supportedLngs: Object.keys(languages),
    defaultNS: 'common',
    ns: ['common', 'landing', 'admin', 'workflows', 'industries'],
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;