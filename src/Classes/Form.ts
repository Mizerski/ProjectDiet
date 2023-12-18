import { TranslateFunc } from "../i18n";
import { Dispatch, SetStateAction } from "react";

type FailedFields = { [key: string]: string[] };

export type TFormValue = string | number | boolean;

export type TFormData<T extends string> = Record<T, TFormValue>;

export type TFormErrors<T extends string> = Record<T, TFormValue | undefined>;

export type SetFormDataFunc<T extends string> = (
  value: Dispatch<SetStateAction<TFormData<T>>>
) => void;

class CForm<T extends string> {
  private readonly mandatoryFields: T[];
  private readonly additionalValidations: {
    [p: string]: () => string | undefined;
  };

  constructor(
    mandatoryFields: T[],
    additionalValidations: { [p: string]: () => string | undefined }
  ) {
    this.mandatoryFields = mandatoryFields;
    this.additionalValidations = additionalValidations;
  }

  public updateField(
    setFormData: Dispatch<SetStateAction<TFormData<T>>>,
    name: T,
    value: TFormValue
  ) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  public formHasErrors(errors: Partial<TFormErrors<T>>) {
    return Object.keys(errors).length !== 0;
  }

  public getResponseErrors(
    formData: TFormData<T>,
    failedFields: FailedFields
  ): TFormErrors<T> {
    const errors: Partial<TFormErrors<T>> = {};
    (Object.keys(formData) as Array<keyof TFormData<T>>).forEach((key) => {
      if (failedFields[key]) {
        errors[key] = failedFields[key].join("\n");
      }
    });
    return errors as TFormErrors<T>;
  }

  public validateForm(formData: TFormData<T>, t: TranslateFunc) {
    const errors: Partial<TFormErrors<T>> = {};
    const mandatoryFieldsStr = this.mandatoryFields as string[];
    Object.keys(formData).forEach((key) => {
      if (
        mandatoryFieldsStr.includes(key) &&
        (formData[key as T] === null ||
          formData[key as T] === "" ||
          formData[key as T] === undefined)
      ) {
        errors[key as T] = t("Error.Required");
      }
    });

    if (this.additionalValidations !== undefined) {
      Object.keys(this.additionalValidations).forEach((key) => {
        const error = this.additionalValidations[key]();
        if (error) {
          const prevError = errors[key as T] ? errors[key as T] + "\n" : "";
          errors[key as T] = prevError + error;
        }
      });
    }
    return errors as TFormErrors<T>;
  }
}

export { CForm };
