import { useEffect, useState } from "react";
import { ViewStyle, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
interface DropdownProps {
  items: { label: string; value: string }[];
  placeholder?: string;
  style: ViewStyle;
  value: string;
  onValueChange: (value: string) => void;
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
    onValueChange(selectedValue);
  }, [selectedValue]);

  return (
    <View style={style}>
      <DropDownPicker
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
