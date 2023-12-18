import React, { useState } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import InputField from "../Inputs/InputField";
import Colors from "../../../assets/styles/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface CustomStyle {
  fieldContainer?: ViewStyle;
  inputField?: ViewStyle;
  errorMessage?: ViewStyle;
  fieldLabel?: ViewStyle;
}

interface SimpleTextFieldProps {
  label: string;
  initialValue: string;
  onValueChange: (value: string) => void;
  customStyle?: StyleSheet.NamedStyles<CustomStyle>;
  inputContainerStyle?: ViewStyle;
  isNumericKeyboard?: boolean;
}

const TableTextField: React.FC<SimpleTextFieldProps> = ({
  label,
  initialValue,
  onValueChange,
  customStyle,
  inputContainerStyle,
  isNumericKeyboard,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChangeText = (text: string) => {
    setValue(text);
    onValueChange(text);
  };
  const defaultInputFieldStyle = { flex: 1 };
  const defaultInputContainerStyle = { marginTop: hp("1%") };

  return (
    <View style={customStyle?.fieldContainer}>
      <Text style={[styles.fieldLabel, { marginTop: 10 }]}>{label}</Text>
      <InputField
        label=""
        editable={true}
        value={value}
        placeholderTextColor={Colors.gray}
        placeholder={label}
        onChangeText={handleChangeText}
        keyboardType={isNumericKeyboard ? "numeric" : "default"}
        style={[
          defaultInputFieldStyle,
          customStyle?.inputField,
          { color: Colors.black },
        ]}
        containerStyle={StyleSheet.flatten([
          defaultInputContainerStyle,
          inputContainerStyle,
        ])}
      />
    </View>
  );
};

const styles: StyleSheet.NamedStyles<CustomStyle> = StyleSheet.create({
  fieldContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 16,
    color: Colors.black,
  },
  inputField: {
    flex: 1,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: Colors.black,
  },
});

export default TableTextField;
