import React, { FC, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: boolean;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  editable?: boolean;
  nonEditableStyle?: ViewStyle;
}

const InputField: FC<InputFieldProps> = ({
  label,
  editable,
  containerStyle,
  inputStyle,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        isFocused && styles.focusedContainer,
        !editable && styles.notEditable,
      ]}
    >
      <TextInput
        placeholder={label}
        editable={editable}
        style={[styles.input, inputStyle, isFocused && styles.focusedInput]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        allowFontScaling={true}
        {...restProps}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    borderColor: Colors.grayDisabled,
    alignItems: "center",
    flexDirection: "row",
  },
  focusedContainer: {
    borderColor: Colors.main_green,
  },
  notEditable: {
    backgroundColor: Colors.gray,
  },
  input: {
    fontSize: 15,
    color: Colors.newGray,
  },
  focusedInput: {
    borderColor: Colors.main_green,
  },
});

export default InputField;
