import { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface DropdownProps {
  items: { label: string; value: string }[];
  placeholder?: string;
  style: ViewStyle;
  value: string;
  onValueChange: (value: string) => void;
  t?: TFunction;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  placeholder,
  style,
  value,
  onValueChange,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [dropdownItems, setItems] = useState(items);
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setItems(items);
  }, [items]);

  useEffect(() => {
    onValueChange(selectedValue);
  }, [selectedValue]);

  return (
    <View style={style}>
      <DropDownPicker
        testID="dropdown"
        open={open}
        value={selectedValue}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={setSelectedValue}
        setItems={setItems}
        placeholder={placeholder}
      />
    </View>
  );
};
