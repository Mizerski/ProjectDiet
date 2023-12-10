import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors } from "react-native/Libraries/NewAppScreen";

type ButtonType = "submit" | "danger" | "action" | "busy";

interface LoadingButtonProps {
  disabled: boolean;
  isLoading: boolean;
  loadingText?: string;
  onPress: () => void;
  submitText?: string;
  type?: ButtonType;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  disabled,
  isLoading,
  loadingText,
  onPress,
  submitText = "",
  type = "submit",
}) => {
  const { t } = useTranslation();

  let title = submitText;
  let buttonColor: string;
  let textColor: string;
  let borderColor: string;

  if (isLoading || disabled) {
    buttonColor = Colors.gray;
    textColor = Colors.black;
    borderColor = Colors.gray;
    if (isLoading) {
      title = loadingText || t("loading");
    }
  } else {
    switch (type) {
      case "danger": {
        buttonColor = Colors.white;
        textColor = Colors.alert_red;
        borderColor = Colors.alert_red;
        break;
      }
      case "action": {
        buttonColor = Colors.white;
        textColor = Colors.black;
        borderColor = Colors.black;
        break;
      }
      case "submit": {
        buttonColor = Colors.main_green;
        textColor = Colors.white;
        borderColor = Colors.main_green;
        break;
      }
      case "busy": {
        buttonColor = Colors.alert_red;
        textColor = Colors.white;
        borderColor = Colors.alert_red;
        break;
      }
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonColor, borderColor: borderColor },
        type === "submit" ? styles.submitButton : {},
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[styles.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: "3%",
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
  },
  submitButton: {
    shadowColor: Colors.shadowColor,
    shadowRadius: 35,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
  },
});
export default LoadingButton;
