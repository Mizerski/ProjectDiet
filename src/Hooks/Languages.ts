import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export async function setLanguageData(value: string): Promise<void> {
  try {
    await AsyncStorage.setItem("language", value);
  } catch (e) {
    console.error(e);
  }
}

export async function getLanguageData(): Promise<string | null> {
  try {
    const storedLanguage = await AsyncStorage.getItem("language");
    return storedLanguage;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function useLanguage() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    getLanguageData().then((storedLanguage) => {
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    });
  }, []);

  const handleLanguageChange = async (value: string) => {
    setLanguage(value);
    await i18n.changeLanguage(value);
    setLanguageData(value);
  };

  return { t, language, handleLanguageChange };
}

export async function initializeLanguage() {
  const storedLanguage = await getLanguageData();
  if (storedLanguage) {
    await i18n.changeLanguage(storedLanguage);
  }
}
