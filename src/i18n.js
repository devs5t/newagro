import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      Test: "Hey. I am a test text, can you translate me?",
    },
  },
  es: {
    translation: {
      Test: "Oye. Soy un texto de prueba, ¿puedes traducirme?",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "es",
    fallbackLng: {
      default: ["es"],
    },
    interpolation: {
      escapeValue: false,
    },
  });
