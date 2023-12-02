import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ViewStyle, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import "../../i18n/i18n";
import "intl-pluralrules";
interface DropdownProps {
  items: { label: string; value: string }[];
  placeholder: string;
  style: ViewStyle;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  placeholder,
  style,
}) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(i18n.language);
  const [dropdownItems, setItems] = useState(items);

  useEffect(() => {
    i18n.changeLanguage(value);
  }, [value]);

  return (
    <View style={style}>
      <DropDownPicker
        open={open}
        value={value}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={placeholder}
      />
    </View>
  );
};
