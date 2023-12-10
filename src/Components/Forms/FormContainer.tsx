import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Colors from "../../../assets/styles/Colors";

interface FormItemContainerProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export const FormItemContainer = (
  props: React.PropsWithChildren<FormItemContainerProps>
) => {
  const { children, style, onPress } = props;
  return (
    <Pressable
      onPress={() => onPress && onPress()}
      style={{ width: "100%", backgroundColor: Colors.background }}
    >
      <View style={[styles.body, style]}>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  body: {
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: "left",
  },
});
