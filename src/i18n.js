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
        map: {
          title: "Know the physical location of the Tambo",
          location: "Tandil, Buenos Aires"
        },
      },
      form: {
        cancel: 'Cancel',
        submit: 'Submit',
      },
      field_visit_form: {
        name: 'Name',
        lastname: 'Lastname',
        mail: 'Mail',
        tentative_date: 'Tentative date',
        title: 'Field visit request',
        description: 'Please, complete your information and we will contact you in the next 48 hours.',
        submit: 'Request visit',
        successfully_sent_title: 'Request sent successfully',
        successfully_sent_description: 'We will contact you in the next 48 hours to confirm the visit'
      },
      investment: {
        text: "*Remember that in order to receive your earnings it is necessary that you have your Tokens deposited",
        card_milk: {
          title: "New Milk (NMILK)",
          subtitle: "TNA / APR 50%",
          buy: "Buy",
        },
        card_beef: {
          title: "New Beef (NBEEF)",
          subtitle: "TNA / APR 50%",
          buy: "Buy",
        },
        card_land: {
          title: "New LAND (NLAND)",
          subtitle: "TNA / APR 50%",
          buy: "Buy",
        },
        rentability: {
          title1: "Milking cows",
          title2: "Your field",
          description: 'Each real Milking Cow is equivalent to 5,500 “New Milk” Tokens',
          subtitle1: "Profitability",
          subtitle2: "Historical earnings:",
          currentBalance: "Your assets"
        },
      },
      exchange: {
        tab_buy: 'Buy',
        tab_sell: 'Sell',
        helper_top_buy: '* Deposit your tokens to receive the investment',
        helper_top_sell: '* Keep in mind that selling your tokens is not instantaneous, since the transaction is made when there is a buyer for them',
        helper_bottom_buy: 'currently available to buy',
        helper_bottom_sell: 'available for sale',
        from: 'From',
        to: 'To',
        amount: 'Amount',
        price: 'Price',
        button_buy: 'Buy',
        button_sell: 'Sell'
      },
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
        map: {
          title: "Conocé la ubicación física del Tambo",
          location: "Tandil, Buenos Aires"
        }
      },
      form: {
        cancel: 'Cancelar',
        submit: 'Enviar',
      },
      field_visit_form: {
        name: 'Nombre',
        lastname: 'Apellido',
        mail: 'Mail',
        tentative_date: 'Fecha tentativa',
        title: 'Solicitud de visita al campo',
        description: 'Por favor, completá tus datos y nos pondremos en contacto con vos en las proximas 48hs.',
        submit: 'Solicitar visita',
        successfully_sent_title: 'Solicitud enviado con éxito',
        successfully_sent_description: 'Nos pondremos en contacto con vos en las próximas 48 hs para confirmar la visita'
      },
      investment: {
        text: "*Recordá que para poder recibir tus ganancias es necesario que tengas tus Tokens depositados",
        card_milk: {
          title: "New Milk (NMILK)",
          subtitle: "TNA / APR 50%",
          buy: "Comprar",
        },
        card_beef: {
          title: "New Beef (NBEEF)",
          subtitle: "TNA / APR 50%",
          buy: "Comprar",
        },
        card_land: {
          title: "New LAND (NLAND)",
          subtitle: "TNA / APR 50%",
          buy: "Comprar",
        },
        rentability: {
          title1: "Vacas de ordeñe",
          title2: "Tu campo",
          description: 'Cada Vaca de Ordeñe real, equivale a 5.500 Tokens “New Milk”',
          subtitle1: "Rentabilidad",
          subtitle2: "Ganancias históricas:",
          currentBalance: "Tus activos"
        },
      },
      exchange: {
        tab_buy: 'Comprar',
        tab_sell: 'Vender',
        helper_top_buy: '* Depositá tus tokens para recibir la inversion',
        helper_top_sell: '* Tené en cuenta que vender tus tokens no es instantaneo, ya que la oparacion se efectua cuando haya un comprador para los mismos',
        helper_bottom_buy: 'disponibles para comprar actualmente',
        helper_bottom_sell: 'disponibles a la venta',
        from: 'De',
        to: 'A',
        amount: 'Cantidad',
        price: 'Precio',
        button_buy: 'Comprar',
        button_sell: 'Vender'
      },
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
