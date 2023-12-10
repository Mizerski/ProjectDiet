import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
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
          isEmailValid(formData.email as string) ? "" : t("invalidEmail"),
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

  const onLoginSuccess = async (response: any) => {
    setIsLoading(false);

    const token = response.data.token;
    const userId = response.data.user_id;
    await storeToken(
      token,
      formData.rememberMe as boolean,
      formData.email as string,
      userId
    );

    cleanLoginForm();

    navigation.navigate("Home");
  };

  const onLoginError = (error: any) => {
    setIsLoading(false);
    setHasError(true);
    console.log(error);
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
        user.email === formData.email && user.password === formData.password
    );
    if (user) {
      onLoginSuccess(user);
    } else {
      onLoginError("Usuário não encontrado");
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
          placeholder="Digite seu email"
          inputContainerStyle={{
            height: 50,
          }}
        />
        <CTextField
          form={form}
          placeholder="Digite sua senha"
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
