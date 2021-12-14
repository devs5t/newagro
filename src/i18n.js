import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      Test: "Hey. I am a test text, can you translate me?",
    },
  },
  fr: {
    translation: {
      Test: "Hey. Je suis un texte de test, pouvez-vous me traduire",
    },
  },
  de: {
    translation: {
      Test: "Hallo. Ich bin ein Testtext, kannst du mich übersetzen",
    },
  },
  nl: {
    translation: {
      Test: "Hallo. Ik ben een testtekst, kun je me vertalen?",
    },
  },
  es: {
    translation: {
      Test: "Oye. Soy un texto de prueba, ¿puedes traducirme?",
    },
  },
  ja: {
    translation: {
      Test: "おい。私はテストテキストです、翻訳してくれませんか",
    },
  },
  zh: {
    translation: {
      Test: "嘿。我是一个测试文本，你能翻译我吗",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: {
      default: ["en"],
    },
    interpolation: {
      escapeValue: false,
    },
  });
