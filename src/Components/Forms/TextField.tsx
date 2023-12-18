import React, { Dispatch, SetStateAction } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { CForm, TFormData, TFormErrors } from "../../Classes/Form";
import InputField from "../Inputs/InputField";
import { getMandatoryLabel, BaseStyle } from "./Base/BaseFormField";
import Colors from "../../../assets/styles/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface CustomStyle {
  fieldContainer?: ViewStyle;
  inputField?: ViewStyle;
  errorMessage?: ViewStyle;
  fieldLabel?: ViewStyle;
}

interface FormFieldProps<T extends string> {
  form: CForm<T>;
  label: string;
  showLabel?: boolean;
  isMandatory?: boolean;
  editable?: boolean;
  formData: TFormData<T>;
  field: T;
  setFormData: Dispatch<SetStateAction<TFormData<T>>>;
  formErrors: TFormErrors<T>;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  placeholder?: string;
  customStyle?: StyleSheet.NamedStyles<CustomStyle>;
  inputContainerStyle?: ViewStyle;
}

class CTextField<T extends string> extends React.Component<FormFieldProps<T>> {
  render() {
    const {
      field,
      form,
      label,
      showLabel = true,
      isMandatory = true,
      editable = true,
      formData,
      setFormData,
      formErrors,
      keyboardType,
      secureTextEntry = false,
      placeholder,
    } = this.props;

    const defaultInputFieldStyle = { flex: 1 };
    const defaultInputContainerStyle = { marginTop: hp("1%") };

    return (
      <View style={this.props.customStyle?.fieldContainer}>
        {showLabel && (
          <Text style={[styles.fieldLabel, { marginTop: 10 }]}>
            {getMandatoryLabel(label, isMandatory)}
          </Text>
        )}
        <InputField
          label=""
          editable={editable}
          value={formData[field] as string}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onChangeText={(text) => form.updateField(setFormData, field, text)}
          placeholderTextColor={Colors.gray}
          placeholder={placeholder}
          style={[
            defaultInputFieldStyle,
            this.props.customStyle?.inputField,
            { color: Colors.black },
          ]}
          containerStyle={StyleSheet.flatten([
            defaultInputContainerStyle,
            this.props.inputContainerStyle,
          ])}
        />
        {formErrors[field] && (
          <Text style={styles.errorMessage}>{formErrors[field]}</Text>
        )}
      </View>
    );
  }
}

const styles: StyleSheet.NamedStyles<CustomStyle> = StyleSheet.create({
  ...BaseStyle.errorMessage,
  ...BaseStyle.fieldContainer,
  ...BaseStyle.fieldLabel,
});

export default CTextField;
