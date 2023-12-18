import "intl-pluralrules";
import i18n, { TFunction } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { SupportedLanguage, getLanguageResources } from "./Languages";

const DEFAULT_LANGUAGE_TAG = "en";

function getCurrentLanguageTag(): SupportedLanguage {
  return i18n.language as SupportedLanguage;
}

function getBestLanguageTag() {
  const bestLang = Localization.locale;
  return bestLang || DEFAULT_LANGUAGE_TAG;
}

i18n.use(initReactI18next).init({
  resources: getLanguageResources(),
  fallbackLng: DEFAULT_LANGUAGE_TAG,
  lng: getBestLanguageTag(),
});

export type TranslateFunc = TFunction<"translation", undefined>;

export { i18n, getCurrentLanguageTag };
