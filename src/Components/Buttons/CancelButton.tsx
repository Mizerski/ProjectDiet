import React from "react";
import { useTranslation } from "react-i18next";
import LoadingButton from "./ButtonLoading";

interface CancelButtonProps {
  onPress: () => void;
  leftIcon?: React.ReactElement;
  submitText?: string;
}

export const CancelButton: React.FC<CancelButtonProps> = ({
  onPress,
  leftIcon,
  submitText,
}) => {
  const { t } = useTranslation();
  return (
    <LoadingButton
      submitText={submitText === undefined ? t("text.cancel") : submitText}
      type={"busy"}
      onPress={onPress}
      disabled={false}
      isLoading={false}
      leftIcon={leftIcon}
    />
  );
};
