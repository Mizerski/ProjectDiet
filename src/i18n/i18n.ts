import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import "intl-pluralrules";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Welcome to React": "Welcome to React and react-i18next",
      },
    },
    pt: {
      translation: {
        "Welcome to React": "Bem-vindo ao React e react-i18next",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
