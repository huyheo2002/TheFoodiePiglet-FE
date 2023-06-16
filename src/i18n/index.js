import React from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// import locales
import HEADER_EN from "../locales/en/header.json";
import HOME_EN from "../locales/en/home.json";
import HEADER_VI from "../locales/vi/header.json";
import HOME_VI from "../locales/vi/header.json";

// export const locales = {
//   en: "English",
//   vi: "Vietnamese",
// };

const resources = {
  en: {
    header: HEADER_EN,
    home: HOME_EN,    
  },
  vi: {
    header: HEADER_VI,
    home: HOME_VI,    
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  ns: ["header", "home"],
  defaultNS: "home",
  interpolation: {
    escapeValue: false,
  },
});
