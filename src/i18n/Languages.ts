import "intl-pluralrules";
import pt from "./json/pt.json";
import en from "./json/en.json";
import es from "./json/es.json";

export type SupportedLanguage = "pt" | "en" | "es";

type LanguageResource = { [p in SupportedLanguage]: { translation: any } };

function getLanguageResources(): LanguageResource {
  return {
    pt: { translation: pt.pt },
    en: { translation: en.en },
    es: { translation: es.es },
  };
}

function getLanguageResourceTags(): SupportedLanguage[] {
  return Object.keys(getLanguageResources()) as SupportedLanguage[];
}

export { getLanguageResources, getLanguageResourceTags };
