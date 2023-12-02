import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "./en-US.json";
import ptBR from "./pt-BR.json";

i18n.use(initReactI18next).init({
    resources: {
        "pt-BR": ptBR,
        "en-US": enUS,
    },
    lng: "pt-BR",
    interpolation: {
        escapeValue: false,
    },
});
