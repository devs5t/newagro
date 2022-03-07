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
        pair_wallet: 'Pair Wallet',
        wrong_wallet: 'Wrong Wallet'
      },
      footer: {
        exchange_rate: "Exchange Rate",
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
            title: "New Agro coin generated",
            number: "{{value}} NAC",
            button_text: "Buy Tokens"
          },
          actives: {
            title: "Total Assets",
            number: "{{value}} USD",
            button_text: "Explanation of how your total assets are made up"
          },
          nmilk: {
            title: "Total NMILK Tokens",
            description: "Each NMILK Token is equivalent to xxxx liters of real milk from the dairy. A new affordable and affordable way to invest in a dairy farm.",
            button_text: "Buy New Milk"
          },
          cows: {
            title: "Total Milking Cows",
            description: "Each real Milking Cow is equivalent to 5,500“ New Milk ”Tokens (NMILK)",
            button_text: "My investments",
            fourth_text: "Your assets",
            fifth_text: "{{nmilkUserAssets}} cows ({{userMilkingCows}} NMILK)",
          },
        },
        map: {
          title: "Know the physical location of the Dairy",
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
        cows: "({{value}} cows)",
        watch_cams: "Watch live cameras",
        deposit_buy: "Deposit / Buy",
        retire: "Harvest",
        reinvest: "Reinvest",
        deposited: "Deposited",
        earnings: "Earnings",
        withdraw: "Withdraw",
        assets: "Your total {{token}} assets",
        card_milk: {
          title: "New Milk (NMILK)",
          subtitle: "APR {{apr}}%",
          buy: "Buy",
        },
        card_beef: {
          title: "New Beef (NBEEF)",
          subtitle: "APR {{apr}}%",
          buy: "Buy",
        },
        card_land: {
          title: "New LAND (NLAND)",
          subtitle: "APR {{apr}}%",
          buy: "Buy",
        },
        rentability: {
          title1: "Milking cows",
          title2: "Your field",
          description: 'Each real Milking Cow is equivalent to 5,500 “New Milk” Tokens',
          subtitle1: "Profitability",
          profitability_description: "{{value}} NAC by cow monthly",
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
        suggested_price: 'Suggested price',
        button_buy: 'Buy',
        button_sell: 'Sell',
      },
      docs: {
        banner: {
          title: "Transparency New Agro",
          subtitle: "Know the documentation of your assets",
        },
        buttons: {
          doc_tech: "Technical Documentation",
          page_inst: "Institutional Page",
        },
        cards: {
          card1_title: "Milk delivery remittance",
          card1_subtitle: "566 Remittance",
          see_docs: "SEE DOCUMENTATION",
          card2_title: "Georeference",
          card3_title: "Live Camera",
          card3_subtitle: "4 live cameras",
          card4_title: "Caravan Listing",
          card4_subtitle: "756 Listings",
        }
      },
      deposit_token_form: {
        deposit: 'Deposit',
        amount: 'Amount',
        available: 'available',
        cancel: 'Cancel',
        warning_description: 'Are you sure you want to withdraw your Tokens {{token}}?\n By removing them, you will stop generating profits to have them.'
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
        pair_wallet: 'Vincular Billetera',
        wrong_wallet: 'Billetera Equivocada'
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
            title: "New Agro coin generados",
            number: "{{value}} NAC",
            button_text: "Comprar New Agro Tokens"
          },
          actives: {
            title: "Activos totales",
            number: "{{value}} USD",
            third_text: "Explicación de cómo se componen sus activos totales"
          },
          nmilk: {
            title: "Tus Tokens NMILK",
            description: "Cada NMILK Token equivale a xxxx Litros de leche reales del tambo. Una nueva forma accesible y económica de invertir en un tambo.",
            button_text: "Comprar New Milk"
          },
          cows: {
            title: "Vacas de ordeñe",
            description: "Cada Vaca de Ordeñe real, equivale a 5.500 Tokens “New Milk” (NMILK)",
            button_text: "Mis inversiones",
            fourth_text: "Tus activos",
            fifth_text: "{{nmilkUserAssets}} vacas ({{userMilkingCows}} NMILK)",
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
        warning: 'Advertencia'
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
        cows: "({{value}} vacas)",
        watch_cams: "Ver camaras en vivo",
        deposit_buy: "Depositar / Comprar",
        retire: "Retirar",
        reinvest: "Reinvertir",
        deposited: "Depositado",
        earnings: "Ganancias",
        withdraw: "Retirar",
        assets: "Tus Activos {{token}} Totales",
        card_milk: {
          title: "New Milk (NMILK)",
          subtitle: "TNA 50%",
          buy: "Comprar"
        },
        card_beef: {
          title: "New Beef (NBEEF)",
          subtitle: "TNA 50%",
          buy: "Comprar",
        },
        card_land: {
          title: "New LAND (NLAND)",
          subtitle: "TNA 50%",
          buy: "Comprar",
        },
        rentability: {
          title1: "Vacas de ordeñe",
          title2: "Tu campo",
          description: 'Cada Vaca de Ordeñe real, equivale a 5.500 Tokens “New Milk”',
          subtitle1: "Rentabilidad",
          profitability_description: "{{value}} NAC por vaca mensualmente",
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
        suggested_price: 'Precio sugerido',
        button_buy: 'Comprar',
        button_sell: 'Vender',
      },
      docs: {
        banner: {
          title: "Transparencia New Agro",
          subtitle: "Conocé la documentación de tus activos",
        },
        buttons: {
          doc_tech: "Documentación técnica",
          page_inst: "Página Institucional",
        },
        cards: {
          card1_title: "Remito de salida de Leche",
          card1_subtitle: "566 Remitos",
          see_docs: "VER DOCUMENTACIÓN",
          card2_title: "Georeferencia",
          card3_title: "Camara en vivo",
          card3_subtitle: "4 camaras en vivo",
          card4_title: "Listado de caravanas",
          card4_subtitle: "756 Listados",
        }
      },
      deposit_token_form: {
        deposit: 'Depositar',
        amount: 'Cantidad',
        available: 'disponibles',
        cancel: 'Cancelar',
        warning_description: '¿Estás seguro de que querés retirar tus Tokens {{token}}? \n Al sacarlos, dejarás de generar ganancias para tenerlos.'
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
