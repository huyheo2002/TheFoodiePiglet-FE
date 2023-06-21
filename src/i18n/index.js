import React from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// import locales
// En (English)
import HEADER_EN from "../locales/en/header.json";
import HOME_EN from "../locales/en/home.json";
import FOOTER_EN from "../locales/en/footer.json";

// Vi (Vietnamese)
import HEADER_VI from "../locales/vi/header.json";
import HOME_VI from "../locales/vi/home.json";
import FOOTER_VI from "../locales/vi/footer.json";

// export const locales = {
//   en: "English",
//   vi: "Vietnamese",
// };

const resources = {
  en: {
    header: HEADER_EN,
    home: HOME_EN,
    footer: FOOTER_EN,    
  },
  vi: {
    header: HEADER_VI,
    home: HOME_VI, 
    footer: FOOTER_VI,    
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  ns: ["header", "home", "footer"],
  defaultNS: "home",
  interpolation: {
    escapeValue: false,
  },
});
