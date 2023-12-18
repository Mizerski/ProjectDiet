import { TFormData, TFormErrors } from "../../Classes/Form";

export enum NutriTableFormFields {
  NAME_PRODUCT = "nameProduct",
  NUTRI_TABLE = "nutriTable",
  NUTRI_TABLE_VALUE = "nutriTableValue",
}

export const NutriTableEmptyFormFields: TFormData<NutriTableFormFields> = {
  [NutriTableFormFields.NAME_PRODUCT]: "",
  [NutriTableFormFields.NUTRI_TABLE]: "",
  [NutriTableFormFields.NUTRI_TABLE_VALUE]: "",
};

export const NutriTableInitializeFormFields =
  (): TFormErrors<NutriTableFormFields> => {
    return {
      [NutriTableFormFields.NAME_PRODUCT]: undefined,
      [NutriTableFormFields.NUTRI_TABLE]: undefined,
      [NutriTableFormFields.NUTRI_TABLE_VALUE]: undefined,
    };
  };
