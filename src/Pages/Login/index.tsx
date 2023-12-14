import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { userTable } from "../../../mock/db/user";
import { useNavigation } from "@react-navigation/native";
import { CForm, TFormData, TFormErrors } from "../../Classes/Form";
import {
  LoginFormEmptyFields,
  LoginFormFields,
  LoginFormInitializeErrors,
} from "./LoginForm";
import isEmailValid from "../../Constants/Regex";
import { useTranslation } from "react-i18next";
import { DB, DBKeyString } from "../../Database/Storage";
import CTextField from "../../Components/Forms/TextField";
import LoadingButton from "../../Components/Buttons/ButtonLoading";
import Colors from "../../../assets/styles/Colors";
import { FormItemContainer } from "../../Components/Forms/FormContainer";
import { IUser } from "../../Interface/User";

export function LoginScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [formData, setFormData] =
    useState<TFormData<LoginFormFields>>(LoginFormEmptyFields);
  const [formErrors, setFormErrors] = useState<TFormErrors<LoginFormFields>>(
    LoginFormInitializeErrors()
  );
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);

  async function storeToken(
    token: string,
    rememberEmail: boolean,
    email: string,
    userId: number
  ) {
    await DB.setItemStr(DBKeyString.authToken, token);
    await DB.setItemStr(DBKeyString.userID, userId.toString());
    if (rememberEmail) {
      await DB.setItemStr(DBKeyString.userEmail, email.toLowerCase());
    } else {
      await DB.removeItem(DBKeyString.userEmail);
    }
  }

  const validateFormRef = useRef<
    (() => Partial<TFormErrors<LoginFormFields>>) | null
  >(null);

  const form = useMemo(() => {
    return new CForm<LoginFormFields>(
      [LoginFormFields.EMAIL, LoginFormFields.PASSWORD],
      {
        [LoginFormFields.EMAIL]: () =>
          isEmailValid(formData.email as string) ? "" : t("Login.Error.Email"),
      }
    );
  }, [formData.email, t]);

  const cleanLoginForm = () => {
    setHasSubmit(false);
    if (!formData.rememberMe as boolean) {
      form.updateField(setFormData, LoginFormFields.EMAIL, "");
    }
    form.updateField(setFormData, LoginFormFields.PASSWORD, "");
  };

  const onLoginSuccess = async (user: Partial<IUser>) => {
    setIsLoading(false);

    const token = user.token || "token_simulado";
    const userId = user.id;

    if (token && userId) {
      await storeToken(
        token,
        formData.rememberMe as boolean,
        formData.email as string,
        userId
      );
      cleanLoginForm();
      navigation.navigate("MainTab", { screen: "HomeScreen" });
    }
  };

  const validateForm = useCallback(() => {
    const errors: Partial<TFormErrors<LoginFormFields>> = form.validateForm(
      formData,
      t
    );
    setFormErrors(errors as TFormErrors<LoginFormFields>);
    setHasError(form.formHasErrors(errors));
    return errors;
  }, [formData, t, form]);

  useEffect(() => {
    if (validateFormRef.current === null) {
      const initializeData = async () => {
        const savedEmail = await DB.getItemStr(DBKeyString.userEmail);
        if (savedEmail) {
          form.updateField(setFormData, LoginFormFields.EMAIL, savedEmail);
          form.updateField(setFormData, LoginFormFields.REMEMBER_ME, true);
        } else {
          form.updateField(setFormData, LoginFormFields.REMEMBER_ME, false);
        }
      };
      initializeData();
    }

    validateFormRef.current = validateForm;
  }, [form, validateForm]);

  useEffect(() => {
    if (validateFormRef.current !== null && hasSubmit) {
      validateForm();
    }
  }, [form, formData, hasSubmit, validateForm]);

  const handleLoginPress = async () => {
    setHasSubmit(true);
    if (form.formHasErrors(formErrors)) {
      return;
    }
    setIsLoading(true);
    const user = userTable.find(
      (user) =>
        typeof formData.email === "string" &&
        typeof formData.password === "string" &&
        user.email.toLowerCase() === formData.email.toLowerCase() &&
        user.password.toLowerCase() === formData.password.toLowerCase()
    );
    if (user) {
      onLoginSuccess(user);
    } else {
      Alert.alert(t("Error"), t("Login.Error"));
      setIsLoading(false);
      setHasError(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <FormItemContainer>
        <CTextField
          form={form}
          label={"Email"}
          formData={formData}
          field={LoginFormFields.EMAIL}
          setFormData={setFormData}
          formErrors={formErrors}
          keyboardType="email-address"
          isMandatory={true}
          placeholder={t("Login.Email")}
          inputContainerStyle={{
            height: 50,
          }}
        />
        <CTextField
          form={form}
          placeholder={t("Login.Password")}
          label={"Password"}
          formData={formData}
          secureTextEntry={true}
          field={LoginFormFields.PASSWORD}
          setFormData={setFormData}
          isMandatory={true}
          formErrors={formErrors}
          inputContainerStyle={{
            height: 50,
          }}
        />
        <LoadingButton
          disabled={hasError}
          isLoading={isLoading}
          onPress={handleLoginPress}
          submitText={t("Login.Submit")}
        />
      </FormItemContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
});
