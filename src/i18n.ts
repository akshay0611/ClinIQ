import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Add translations here if we want to translate the UI as well
// For now, we mainly use i18n to pass the selected language to Gemini
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { "language": "English" } },
      es: { translation: { "language": "Spanish" } },
      hi: { translation: { "language": "Hindi" } }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
