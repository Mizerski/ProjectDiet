import i18n from "i18next";
import "intl-pluralrules";
import { initReactI18next } from "react-i18next";
import enUS from "./json/en-US.json";
import esES from "./json/es-ES.json";
import ptBR from "./json/pt-BR.json";

i18n.use(initReactI18next).init({
    resources: {
        "pt-BR": ptBR,
        "en-US": enUS,
        "es-ES": esES,
    },
    lng: "pt-BR",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
