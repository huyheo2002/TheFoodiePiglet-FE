import React from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// import locales
// En (English)
import HEADER_EN from "../locales/en/header.json";
import HOME_EN from "../locales/en/home.json";
import FOOTER_EN from "../locales/en/footer.json";
import AUTH_EN from "../locales/en/auth.json";
import ADMIN_EN from "../locales/en/admin.json";
import DATATABLE_EN from "../locales/en/dataTable.json";


// Vi (Vietnamese)
import HEADER_VI from "../locales/vi/header.json";
import HOME_VI from "../locales/vi/home.json";
import FOOTER_VI from "../locales/vi/footer.json";
import AUTH_VI from "../locales/vi/auth.json";
import ADMIN_VI from "../locales/vi/admin.json";
import DATATABLE_VI from "../locales/vi/dataTable.json";


// export const locales = {
//   en: "English",
//   vi: "Vietnamese",
// };

const resources = {
  en: {
    header: HEADER_EN,
    home: HOME_EN,
    footer: FOOTER_EN,
    auth: AUTH_EN,
    admin: ADMIN_EN,
    table: DATATABLE_EN,
  },
  vi: {
    header: HEADER_VI,
    home: HOME_VI,
    footer: FOOTER_VI,
    auth: AUTH_VI,
    admin: ADMIN_VI,
    table: DATATABLE_VI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  ns: ["header", "home", "footer", "auth", "admin", "table"],
  defaultNS: "home",
  interpolation: {
    escapeValue: false,
  },  
});
