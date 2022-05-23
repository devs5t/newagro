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
        transparency: "Transparency",
        news: "News",
        admin: "Admin",
        pair_wallet: "Pair Wallet",
        wrong_wallet: "Wrong Wallet",
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
        banner_subtitle:
          "You will be able to invest in agricultural businesses with real support",
        card: {
          new_agro: {
            title: "Income generated",
            button_text: "Buy Tokens",
          },
          actives: {
            title: "Total Assets",
            third_text: "Corresponds to the market value of all NewLand, NewMilk and NewBeef issued up to today",
          },
          nmilk: {
            title: "Total NMILK Tokens",
            description: "Each NMILK Token is equivalent to one liter of real milk from the dairy. A new affordable and affordable way to invest in a dairy farm.",
            button_text: "Buy NMILK",
          },
          nland: {
            title: "Total NLAND Tokens",
            description: "Each NLAND token is equivalent to a productive hectare that yields 10 quintals of soy annually.",
            button_text: "Buy NLAND",
          },
          nbeef: {
            title: "Total NBEEF Tokens",
            description: "The NBEEF Tokens will be equivalent to a beef production cattle rodeo for which you will receive equivalent income in kilograms of meat.",
            button_text: "Buy NBEEF",
          },
        },
        secondary_card: {
          assets: "Your assets",
          investment: "My investments",
          nmilk: {
            title: "Milking cows",
            description: "NMILK were issued representing a herd equivalent to this number of milking cows.",
            assetsDescription: "{{userAssetsAuxiliary}} cows",
          },
          nland: {
            title: "Productive Hectares",
            description: "NLAND were issued representing this amount of hectares.",
            assetsDescription: "{{userAssetsAuxiliary}} hectares",
          },
          nbeef: {
            title: "Beef Roundup",
            description: "NBEEF will be issued representing a real number of animals.",
            assetsDescription: "{{userAssetsAuxiliary}} steers",
          }
        },
        map: {
          title: "Know the physical location of the Dairy",
          location: "De la Garma, Buenos Aires",
        },
      },
      form: {
        cancel: "Cancel",
        submit: "Submit",
        warning: "Warning",
        success: "Successfull",
      },
      field_visit_form: {
        name: "Name",
        lastname: "Lastname",
        mail: "Mail",
        tentative_date: "Tentative date",
        title: "Field visit request",
        description:
          "Please, complete your information and we will contact you in the next 48 hours.",
        submit: "Request visit",
        successfully_sent_title: "Request sent successfully",
        successfully_sent_description:
          "We will contact you in the next 48 hours to confirm the visit",
      },
      exchange_ars_form: {
        buy: 'Purchase',
        sell: 'Sale',
        title: "ARS {{tab}} request",
        description: "Please, complete your information and we will contact you in the next 48 hours.",
        name: "Name",
        lastname: "Lastname",
        mail: "Mail",
        dni: "DNI",
        phone: "Phone",
        token: "Token",
        amount: "Amount",
        price: "Price",
        submit: "Request {{tab}} ARS",
        successfully_sent_title: "Request sent successfully",
        successfully_sent_description:
          "We will contact you in the next 48 hours to confirm the {{tab}}",
      },
      investment: {
        apr: "APR",
        text: "*Remember that in order to receive your earnings it is necessary that you have your Tokens deposited",
        watch_cams: "Watch live cameras",
        deposit: "Deposit",
        buy: "Buy",
        retire: "Harvest",
        reinvest: "Reinvest",
        deposited: "Deposited",
        earnings: "Earnings",
        withdraw: "Withdraw",
        total_assets: "Your total {{token}} assets",
        pending : "pending",
        cards: {
          nmilk: {
            title: "New Milk (NMILK)",
            description: "NMILK Tokens can be deposited into this pool to receive part of the rental income equivalent to a liter of milk from the rodeos they represent or withdrawn to sell. You will receive the rent in NAC that you can automatically exchange to USDT or use to buy other tokens.",
            auxiliaryDescription: "cows"
          },
          nland: {
            title: "New LAND (NLAND)",
            description: "NLAND Tokens can be deposited in this pool to receive part of the rental income equivalent to kilos of soybeans from the fields they represent or withdraw them to sell them. You will receive the rent in NACoin that you can automatically exchange to USDT or use to buy other tokens.",
            auxiliaryDescription: "hectares"
          },
          nbeef: {
            title: "New Beef (NBEEF)",
            description: "",
            auxiliaryDescription: "steers"
          }
        },
        assets: {
          title: 'Your Field 3.0',
          description: 'Each NewAgro Coin token represents physical assets.',
          nmilk: 'milking cows',
          nland: 'hectares',
          nbeef: 'steers'
        },
        rentability: {
          profitability: "Profitability",
          historical_earnings: "Historical earnings:",
          your_assets: "Your assets",
          nmilk: {
            assets_title: "Total milking cows",
            assets_description: "Each real Milking Cow is equivalent to 5,500 “New Milk” Tokens",
            profitability_description: "NAC by milking cow monthly",
            user_assets_title: 'Your dairy 3.0',
            user_assets_description: 'milking cows',
          },
          nland: {
            assets_title: "Crops",
            assets_description: "Each NLAND token represents a rented agricultural hectare for 10 quintals of soybeans per year",
            profitability_description: "NAC by hectare monthly",
            user_assets_title: 'Your agricultural field 3.0',
            user_assets_description: 'hectares',
          },
          nbeef: {
            assets_title: "Milking cows",
            assets_description: "Each real Milking Cow is equivalent to 5,500 “New Milk” Tokens",
            profitability_description: "NAC by cow monthly",
            user_assets_title: 'Your dairy 3.0',
            user_assets_description: 'liters of milk',
          },
        },
      },
      exchange: {
        tab_buy: "Buy",
        tab_sell: "Sell",
        helper_top_buy: "* Deposit your tokens to receive the investment",
        helper_top_sell:
          "* Keep in mind that selling your tokens is not instantaneous, since the transaction is made when there is a buyer for them",
        helper_bottom_buy: "{{amount}} {{token}} currently available to buy",
        helper_bottom_sell: "*Remember to withdraw your tokens from the pool to be able to sell them",
        from: "From",
        to: "To",
        amount: "Amount",
        price: "Price",
        suggested_price: "Suggested price",
        button_approve: "Approve",
        button_buy: "Buy",
        button_sell: "Sell",
        user_from_assets: "{{amount}} {{token}} available",
        exchange_fee: "Exchange fee: {{fee}}%",
        table: {
          status: "Status",
          order_number: "Order number",
          date: "Date",
          amount: "Amount",
          price: "Price",
          confirmed: "Confirmed",
          processing: "Processing",
          remove: "Remove"
        },
        buy_success_title: "Buy {{token}}",
        buy_success_subtitle: "Success",
        buy_success_description: "Recorda depositar tus tokens para generar rentabilidad",
        buy_success_button: "Go to investment",
        sell_success_title: "Sell {{token}}",
        sell_success_subtitle: "Success",
        sell_success_description_instant: "You successfully sold {{amount}} {{token}}",
        sell_success_description_pending: "You put up for sale {{amount}} {{token}}",
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
          card1_title2: "Land delivery remittance",
          card1_subtitle: "{{filesLength}} Remittance",
          see_docs: "SEE DOCUMENTATION",
          card2_title: "Georeference",
          card3_title: "Live Camera",
          card3_goto: "Watch cameras",
          card4_title: "Caravan Listing",
          card4_subtitle: "756 Listings",
        },
      },
      admin: {
        edit: "Edit",
        old_issues: "Old issues",
        available_funds: "Funds available in the Liquidity Fund:",
        nac_in_circulation: "NAC in circulation",
        nac_emitted_nmilk: "Number of liters of milk for 30 days per dairy cow (6000 NMILK)",
        nac_emitted_nland: "Number of quintals of soybean per year per hectare (NLAND)",
        nac_emitted_nbeef: "Number of liters of milk for 30 days per dairy cow (6000 NMILK)",
        token_emitted: "Minter / Generation of Tokens {{token}}",
        nac_issue: {
          title: "Change NAC Issue",
          description: "Complete the following fields to confirm the change in the issuance of New Agro Cash (NAC)",
          warning_title: "Are you sure you want to change the NAC issue?",
          warning_description: "The change in NAC issuance implies changing the performance of all investment pools.",
          confirmation_phrase: "I want to change the NAC issue",
          confirmation_phrase_aux: "Wrote in this field the phrase “{{confirmationPhrase}}”",
          actual_issue: "Actual issue",
          new_issue: "New issue",
          submit: "Confirm issue",
          successfully_sent_title: "NAC issued changed successfully"
        },
        token_issue: {
          title: "New issuance of Tokens {{token}}",
          description: "Complete the following fields to confirm the issuance of new Tokens {{token}}.",
          warning_title: "Are you sure you want to issue new {{token}} Tokens?",
          warning_description: "The issuance of new Tokens {{token}} is equivalent to having more hectares in the field. Make sure you have the necessary real support.",
          confirmation_phrase: "I want to issue new tokens {{token}}",
          confirmation_phrase_aux: "Wrote in this field the phrase “{{confirmationPhrase}}”",
          total_issue: "Total Issued",
          new_issue: "New issue",
          link_new_issue: "Link {{index}} - New issue",
          submit: "Confirm issue",
          successfully_sent_title: "Token {{token}} issued successfully"
        }
      },
      deposit_token_form: {
        deposit: "Deposit",
        amount: "Amount",
        available: "available",
        cancel: "Cancel",
        warning_description: "You successfully deposited {{amount}} {{token}}",
        approve: "Approve",
      },
      withdraw_token_form: {
        withdraw: "Withdraw",
        amount: "Amount",
        available: "available",
        cancel: "Cancel",
        warning_description: "You successfully withdrew {{amount}} {{token}}",
        approve: "Approve",
      },
      no_wallet: {
        title: "Connection error",
        subtitle: "Wallet not connected",
        description: "New Agro Coin is compatible with Metamask",
        or: "or",
        metamask_button: "Create wallet",
      },
      error: {
        generic: "Opsss, an error has occurred, try again later."
      },
      list: {
        not_found: "Files not found",
      },
      button: {
        step_1_2: "Step 1 of 2"
      },
      global_password: {
        password_label: 'Enter password',
        submit: 'Enter',
        wrong_password: "Wrong password"
      }
    },
  },
  es: {
    translation: {
      navbar: {
        home: "Inicio",
        investment: "Inversiones",
        exchange: "Compra/Venta",
        transparency: "Transparencia",
        news: "Novedades",
        admin: "Administrador",
        pair_wallet: "Conectar Billetera",
        wrong_wallet: "Billetera Equivocada",
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
        banner_subtitle:
          "Vas a poder invertir en negocios agropecuarios con respaldo real",
        card: {
          new_agro: {
            title: "Renta generada",
            button_text: "Comprar Tokens",
          },
          actives: {
            title: "Activos totales",
            third_text: "Corresponde al valor de mercado de todos los NewLand, NewMilk y NewBeef emitidos hasta hoy",
          },
          nmilk: {
            title: "Tokens NMILK tolales",
            description:
              "Cada NMILK Token equivale a un litro de leche real del tambo. Una nueva forma accesible y económica de invertir en un tambo.",
            button_text: "Comprar NMILK",
          },
          nland: {
            title: "Tokens NLAND tolales",
            description:
              "Cada token de NLAND equivale a una hectárea productiva que rinde 10 quintales de soja anuales.",
            button_text: "Comprar NLAND",
          },
          nbeef: {
            title: "Tokens NBEEF tolales",
            description:
              "Los Tokens NBEEF van a equivaler a un rodeo vacuno de producción de carne por el que recibirás renta equivalente en kilogramos de carne.",
            button_text: "Comprar NBEEF",
          },
        },
        secondary_card: {
          assets: "Tus activos",
          investment: "Mis inversiones",
          nmilk: {
            title: "Vacas en ordeñe",
            description: "Se emitieron NMILK representando un rodeo equivalente a esta cantidad de vacas en ordeñe.",
            assetsDescription: "{{userAssetsAuxiliary}} vacas",
          },
          nland: {
            title: "Hectáreas Productivas",
            description: "Se emitieron NLAND representando esta cantidad de hectáreas.",
            assetsDescription: "{{userAssetsAuxiliary}} hectáreas",
          },
          nbeef: {
            title: "Rodeo Vacuno",
            description: "Se emitirán NewBeef representando una cantidad real de animales.",
            assetsDescription: "{{userAssetsAuxiliary}} novillos",
          }
        },
        map: {
          title: "Conocé la ubicación física del Campo",
          location: "De la Garma, Buenos Aires",
        },
      },
      form: {
        cancel: "Cancelar",
        submit: "Enviar",
        warning: "Advertencia",
        success: "Éxito",
      },
      field_visit_form: {
        name: "Nombre",
        lastname: "Apellido",
        mail: "Mail",
        tentative_date: "Fecha tentativa",
        title: "Solicitud de visita al campo",
        description:
          "Por favor, completá tus datos y nos pondremos en contacto con vos en las proximas 48hs.",
        submit: "Solicitar visita",
        successfully_sent_title: "Solicitud enviada con éxito",
        successfully_sent_description:
          "Nos pondremos en contacto con vos en las próximas 48 hs para confirmar la visita",
      },
      exchange_ars_form: {
        buy: 'Compra',
        sell: 'Venta',
        title: "Solicitud de {{tab}} de ARS",
        description: "Por favor, completa yus datos y nos pondremos en contacto con vos en las próximas 48hs",
        name: "Nombre",
        lastname: "Apellido",
        mail: "Mail",
        dni: "DNI",
        phone: "Teléfono",
        token: "Token",
        amount: "Cantidad",
        price: "Precio",
        submit: "Solicitar {{tab}} ARS",
        successfully_sent_title: "Solicitud enviada con éxito",
        successfully_sent_description:
          "Nos pondremos en contacto con vos en las próximas 48 hs para confirmar la {{tab}}",
      },
      investment: {
        apr: "TNA",
        text: "*Recordá que para poder recibir tus ganancias es necesario que tengas tus Tokens depositados",
        watch_cams: "Ver camaras en vivo",
        deposit: "Depositar",
        buy: "Comprar",
        retire: "Retirar",
        reinvest: "Reinvertir",
        deposited: "Depositado",
        earnings: "Ganancias",
        withdraw: "Retirar",
        total_assets: "Tus Activos {{token}} Totales",
        pending: "pendientes",
        cards: {
          nmilk: {
            title: "New Milk (NMILK)",
            description: "Los Tokens NMILK pueden depositarse en este pool para recibir parte de la renta del alquiler equivalente a litro de leche de los rodeos que representan o retirarlos para venderlos. El alquiler lo recibirás en NAC que puedes intercambiar automáticamente a USDT o utilizar para comprar otros tokens.",
            auxiliaryDescription: "vacas"
          },
          nland: {
            title: "New LAND (NLAND)",
            description: "Los Tokens NLAND pueden depositarse en este pool para recibir parte de la renta del alquiler equivalentes a kilos de soja de los campos que representan o retirarlos para venderlos. El alquiler lo recibirás en NACoin que puedes intercambiar automáticamente a USDT o utilizar para comprar otros tokens.",
            auxiliaryDescription: "hectáreas"
          },
          nbeef: {
            title: "New Beef (NBEEF)",
            description: "",
            auxiliaryDescription: "novillos"
          }
        },
        assets: {
          title: 'Tu Campo 3.0',
          description: 'Cada token de NewAgro Coin representa activos físicos.',
          nmilk: 'vacas lecheras',
          nland: 'hectáreas',
          nbeef: 'novillos'
        },
        rentability: {
          profitability: "Rentabilidad",
          historical_earnings: "Ganancias históricas:",
          your_assets: "Tus activos",
          nmilk: {
            assets_title: "Totalidad de vacas de ordeñe",
            assets_description: "Cada Vaca de Ordeñe real, equivale a 5.500 Tokens “New Milk”",
            profitability_description: "NAC por vaca lechera por mes",
            user_assets_title: 'Tu tambo 3.0',
            user_assets_description: 'vacas lecheras',
          },
          nland: {
            assets_title: "Cultivos",
            assets_description: "Cada token de NLAND representa una hectárea agrícola alquilada en 10 quintales de soja anuales",
            profitability_description: "NAC por hectárea por mes",
            user_assets_title: 'Tu campo agricola 3.0',
            user_assets_description: 'hectáreas',
          },
          nbeef: {
            assets_title: "Vacas de ordeñe",
            assets_description: "Cada Vaca de Ordeñe real, equivale a 5.500 Tokens “New Milk",
            profitability_description: "NAC por vaca mensualmente",
            user_assets_title: 'Tu Tambo 3.0',
            user_assets_description: 'litros de Leche',
          },
        },
      },
      exchange: {
        tab_buy: "Comprar",
        tab_sell: "Vender",
        helper_top_buy: "* Depositá tus tokens para recibir la inversion",
        helper_top_sell:
          "* Tené en cuenta que vender tus tokens no es instantaneo, ya que la oparacion se efectua cuando haya un comprador para los mismos",
        helper_bottom_buy: "{{amount}} {{token}} disponibles para comprar actualmente",
        helper_bottom_sell: "*Recordá retirar tus tokens del pool para poder venderlos",
        from: "De",
        to: "A",
        amount: "Cantidad",
        price: "Precio",
        suggested_price: "Precio sugerido",
        button_approve: "Aprobar",
        button_buy: "Comprar",
        button_sell: "Vender",
        user_from_assets: "{{amount}} {{token}} disponibles",
        exchange_fee: "Tasa de cambio: {{fee}}%",
        table: {
          status: "Estado",
          order_number: "N. de orden",
          date: "Fecha",
          amount: "Monto",
          price: "Precio",
          confirmed: "Confirmada",
          processing: "En Proceso",
          remove: "Borrar"
        },
        buy_success_title: "Compra {{token}}",
        buy_success_subtitle: "Éxito",
        buy_success_description: "Recorda depositar tus tokens para generar rentabilidad",
        buy_success_button: "Ir a inversiones",
        sell_success_title: "Venta {{token}}",
        sell_success_subtitle: "Éxito",
        sell_success_description_instant: "Vendiste exitosamente {{amount}} {{token}}",
        sell_success_description_pending: "Pusiste en venta {{amount}} {{token}}",
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
          card1_title2: "Escritura de los campos",
          card1_subtitle: "{{filesLength}} Remitos",
          see_docs: "VER DOCUMENTACIÓN",
          card2_title: "Georeferencia",
          card3_title: "Camara en vivo",
          card3_goto: "Ver camaras",
          card4_title: "Listado de caravanas",
          card4_title2: "Contrato de alquiler de los campos",
          card4_subtitle: "756 Listados",
        },
      },
      admin: {
        edit: "Editar",
        old_issues: "Emisiones anteriores",
        available_funds: "Fondos disponibles en el Fondo de Liquidez:",
        nac_in_circulation: "NAC en circulación",
        nac_emitted_nmilk: "Cantidad de litros de leche por 30 dias por vaca lechera (6000 NMILK)",
        nac_emitted_nland: "Cantidad de quintales de soja por año por hectarea (NLAND)",
        nac_emitted_nbeef: "Cantidad de litros de leche por 30 dias por vaca lechera (6000 NMILK)",
        token_emitted: "Minter / Generación de Tokens {{token}}",
        nac_issue: {
          title: "Cambiar emisión de NAC",
          description: "Completá los siguientes campos para corroborar el cambio en la emisión de New Agro Cash (NAC)",
          warning_title: "¿Estás seguro de que querés cambiar la emisión de NAC?",
          warning_description: "El cambio de emisión de NAC implica cambiar el rendimiento de todos los pooles de inversión.",
          confirmation_phrase: "Quiero cambiar la emisión de NAC",
          confirmation_phrase_aux: "Escribí en este campo la frase “{{confirmationPhrase}}”",
          actual_issue: "Emisión actual",
          new_issue: "Nueva emisión",
          submit: "Confirmar Emisión",
          successfully_sent_title: "Emisión de NAC cambiada correctamente"
        },
        token_issue: {
          title: "Nueva emisión de Tokens {{token}}",
          description: "Completá los siguientes campos para corroborar la emisión de nuevos Tokens {{token}}.",
          warning_title: "¿Estás seguro de que querés emitir nuevos Tokens {{token}}?",
          warning_description: "La emisión de nuevos Tokens {{token}} es equivalente a tener más hectáreas en el campo. Asegurate de tener el respaldo real necesario.",
          confirmation_phrase: "Quiero emitir nuevos tokens {{token}}",
          confirmation_phrase_aux: "Escribí en este campo la frase “{{confirmationPhrase}}”",
          total_issue: "Total emitido",
          new_issue: "Nueva emisión",
          link_new_issue: "Link {{index}} - Nueva emisión",
          submit: "Confirmar Emisión",
          successfully_sent_title: "Emisión de Tokens {{token}} creada correctamente"
        }
      },
      deposit_token_form: {
        deposit: "Depositar",
        amount: "Cantidad",
        available: "disponibles",
        cancel: "Cancelar",
        warning_description: "Depositaste exitosamente {{amount}} {{token}}",
        approve: "Aprobar",
      },
      withdraw_token_form: {
        withdraw: "Retirar",
        amount: "Cantidad",
        available: "disponibles",
        cancel: "Cancelar",
        warning_description: "Retiraste exitosamente {{amount}} {{token}}",
        approve: "Aprobar",
      },
      no_wallet: {
        title: "Error de conexión",
        subtitle: "Billetera no conectada",
        description: "New Agro Coin es compatible con Metamask",
        or: "o",
        metamask_button: "Crear billetera",
      },
      error: {
        generic: "Opsss, ocurrió un error. Intente mas tarde."
      },
      list: {
        not_found: "No hay archivos encontrados",
      },
      button: {
        step_1_2: "Paso 1 de 2"
      },
      global_password: {
        password_label: 'Ingresar contraseña',
        submit: 'Ingresar',
        wrong_password: "Contraseña incorrecta"
      }
    },
  },
};

const browserLanguage = detectBrowserLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("i18nextLng") || browserLanguage || "es",
  fallbackLng: {
    default: ["es"],
  },
  interpolation: {
    escapeValue: false,
  },
});
