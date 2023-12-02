import { useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface DropdownProps {
    items: { label: string; value: string }[];
    style: ViewStyle;
    initialValue?: string;
    placeholder?: string;
    onChangeValue?: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
    items,
    initialValue,
    placeholder,
    style,
    onChangeValue,
}: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [dropdownItems, setItems] = useState(items);

    useEffect(() => {
        if (value) {
            onChangeValue?.(value);
        }
    }, [value]);

    return (
        <View style={style}>
            <DropDownPicker
                open={open}
                value={value || null}
                items={dropdownItems}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={placeholder}
            />
        </View>
    );
};
