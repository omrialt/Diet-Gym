import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "./locales/en.json";
import heTranslations from "./locales/he.json";

i18n
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      he: {
        translation: heTranslations,
      },
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
