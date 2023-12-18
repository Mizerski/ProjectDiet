import { TFormData, TFormErrors } from "../../Classes/Form";

export enum LoginFormFields {
  EMAIL = "email",
  PASSWORD = "password",
  REMEMBER_ME = "rememberMe",
}

export const LoginFormEmptyFields: TFormData<LoginFormFields> = {
  [LoginFormFields.EMAIL]: "",
  [LoginFormFields.PASSWORD]: "",
  [LoginFormFields.REMEMBER_ME]: false,
};

export const LoginFormInitializeErrors = (): TFormErrors<LoginFormFields> => {
  return {
    [LoginFormFields.EMAIL]: undefined,
    [LoginFormFields.PASSWORD]: undefined,
    [LoginFormFields.REMEMBER_ME]: undefined,
  };
};
