import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "../../Components/Dropdown";
import { useLanguage } from "../../Hooks/Languages";
import { dropdownItems } from "../../Constants/DropdownItems";
import React from "react";

export function SettingsScreen() {
  const { t, language, handleLanguageChange } = useLanguage();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.labelLanguageContainer}>{t("Text.Language")}</Text>
        <Dropdown
          items={dropdownItems(t)}
          value={language}
          onValueChange={handleLanguageChange}
          style={{ width: "90%" }}
          t={t}
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
