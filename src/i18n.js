import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detectBrowserLanguage from "detect-browser-language";

const resources = {
  en: {
    translation: {
      navbar: {
        home: "Home",
        investment: "Investment",
        exchange: "Exchange",
        docs: "Documentation",
        news: "News",
        admin: "Admin",
        pair_wallet: 'Pair Wallet'
      },
      footer: {
        exchange_rate: "Exchange Rate USD Today",
        field_visit: "Book your visit to the field",
        about_us: "Institutional site",
      },
      blog: {
        news: "Find out about New Agro's news",
        go_to: "Go To Blog",
      },
      home: {
        banner_title: "SOON: NLAND Token",
        banner_subtitle: "You will be able to invest in agricultural businesses with real support"
      }
    },
  },
  es: {
    translation: {
      navbar: {
        home: "Inicio",
        investment: "Inversiones",
        exchange: "Compra/Venta",
        docs: "Documentación",
        news: "Novedades",
        admin: "Administrador",
        pair_wallet: 'Vincular Billetera'
      },
      footer: {
        exchange_rate: "Cotización USD Hoy",
        field_visit: "Reservá tu visita al campo",
        about_us: "Página institucional",
      },
      blog: {
        news: "Enterate de todas las Novedades de New Agro",
        go_to: "Ir al Blog",
      },
      home: {
        banner_title: "Próximamente: NLAND Token",
        banner_subtitle: "Vas a poder invertir en negocios agropecuarios con respaldo real"
      }
    },
  },
};

const browserLanguage = detectBrowserLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || browserLanguage || "es",
    fallbackLng: {
      default: ["es"],
    },
    interpolation: {
      escapeValue: false,
    },
  });
