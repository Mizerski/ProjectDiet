import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "../../Components/Dropdown";

export function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.labelLanguageContainer}>{t("Text.Language")}</Text>
        <Dropdown
          items={[
            { label: "Português", value: "pt-BR" },
            { label: "Inglês", value: "en-US" },
          ]}
          value={language}
          onValueChange={handleLanguageChange}
          style={{ width: "90%" }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  labelLanguageContainer: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
