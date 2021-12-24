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
        banner_subtitle: "You will be able to invest in agricultural businesses with real support",
        card: {
          new_agro: {
            title: "New Agro cash generated",
            number: "546.129",
            button_text: "Buy Tokens"
          },
          actives: {
            title: "Total actives",
            number: "USD 546.129",
            button_text: "Explanation of how your total assets are made up"
          },
          nmilk: {
            title: "Your NMILK Tokens",
            description: "Each NMILK Token is equivalent to xxxx liters of real milk from the dairy. A new affordable and affordable way to invest in a dairy farm.",
            third_text: "2.750.000",
            button_text: "Buy New Milk"
          },
          cows: {
            title: "Milking cows",
            description: "Each real Milking Cow is equivalent to 5,500“ New Milk ”Tokens (NMILK)",
            third_text: "500",
            button_text: "My investments",
            fourth_text: "Your assets",
            fifth_text: "1,3 cows",
          },
        },
        modal: {
          cancel: 'Cancel',
          submit: 'Submit',
          field_visit_title: 'Field visit request',
          field_visit_description: 'Please, complete your information and we will contact you in the next 48 hours.',
          field_visit_submit: 'Request visit'
        }
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
        banner_subtitle: "Vas a poder invertir en negocios agropecuarios con respaldo real",
        card: {
          new_agro: {
            title: "New Agro cash generados",
            number: "546.129",
            button_text: "Comprar New Agro Tokens"
          },
          actives: {
            title: "Activos totales",
            number: "USD 546.129",
            third_text: "Explicación de cómo se componen sus activos totales"
          },
          nmilk: {
            title: "Tus Tokens NMILK",
            description: "Cada NMILK Token equivale a xxxx Litros de leche reales del tambo. Una nueva forma accesible y económica de invertir en un tambo.",
            third_text: "2.750.000",
            button_text: "Comprar New Milk"
          },
          cows: {
            title: "Vacas de ordeñe",
            description: "Cada Vaca de Ordeñe real, equivale a 5.500 Tokens “New Milk” (NMILK)",
            third_text: "500",
            button_text: "Mis inversiones",
            fourth_text: "Tus activos",
            fifth_text: "1,3 vacas",
          },
        },
      },
      modal: {
        cancel: 'Cancelar',
        submit: 'Enviar',
        field_visit_title: 'Solicitud de visita al campo',
        field_visit_description: 'Por favor, completá tus datos y nos pondremos en contacto con vos en las proximas 48hs.',
        field_visit_submit: 'Solicitar visita'
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
