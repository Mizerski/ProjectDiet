import { StyleSheet, View } from "react-native";
import React from "react";

interface TwoButtonRowProps {
  buttonLeft: React.ReactNode;
  buttonRight: React.ReactNode;
}

export const TwoButtonRow: React.FC<TwoButtonRowProps> = ({
  buttonLeft,
  buttonRight,
}) => {
  return (
    <View style={styles.row}>
      <View style={{ width: "48%" }}>{buttonLeft}</View>
      <View style={{ width: "48%" }}>{buttonRight}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
