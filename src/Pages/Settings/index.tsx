import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../../Components/Dropdown";

export function SettingsScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Dropdown
        items={[
          { label: "Portugues", value: "pt" },
          { label: "Ingles", value: "en" },
        ]}
        placeholder="Select an item"
        style={{ alignItems: "center", justifyContent: "center", width: "50%" }}
      />
      <Text>{t("Welcome to React")}</Text>
    </View>
  );
}
