import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import Colors from "../../../assets/styles/Colors";

type ButtonType = "submit" | "danger" | "action" | "busy";

interface LoadingButtonProps {
  disabled: boolean;
  isLoading: boolean;
  loadingText?: string;
  onPress: () => void;
  submitText?: string;
  type?: ButtonType;
  leftIcon?: React.ReactElement;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  disabled,
  isLoading,
  loadingText,
  onPress,
  submitText = "",
  type = "submit",
  leftIcon,
}) => {
  const { t } = useTranslation();

  let title = submitText;
  let buttonColor: string;
  let borderColor: string;
  let textColor: string;

  if (isLoading || disabled) {
    buttonColor = Colors.gray;
    borderColor = Colors.gray;
    textColor = Colors.black_alternative;
    if (isLoading) {
      title = loadingText || t("loading");
    }
  } else {
    textColor = Colors.black_alternative;
    switch (type) {
      case "danger": {
        buttonColor = Colors.white;
        borderColor = Colors.alert_red;
        textColor = Colors.alert_red;
        break;
      }
      case "action": {
        buttonColor = Colors.white;
        borderColor = Colors.black;
        textColor = Colors.black;
        break;
      }
      case "submit": {
        buttonColor = Colors.background;
        borderColor = Colors.black;
        textColor = Colors.black;
        break;
      }
      case "busy": {
        buttonColor = Colors.alert_red;
        borderColor = Colors.alert_red;
        textColor = Colors.white;
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {leftIcon}
        {isLoading ? (
          <ActivityIndicator
            color={Colors.black}
            style={{ marginLeft: 20 }}
            size={20}
          />
        ) : (
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        )}
      </View>
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
  },
});
export default LoadingButton;
