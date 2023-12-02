import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "./json/en-US.json";
import ptBR from "./json/pt-BR.json";

i18n.use(initReactI18next).init({
  resources: {
    "pt-BR": ptBR,
    "en-US": enUS,
  },
  lng: "pt-BR",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
