import BouncyCheckbox from "react-native-bouncy-checkbox";

export interface ICheckBox {
    isChecked: boolean;
    onPress: () => void;
    text: string;
}

export function CheckBox({ text, onPress, isChecked }: ICheckBox) {
    return (
        <BouncyCheckbox
            size={28}
            fillColor="red"
            unfillColor="#FFFFFF"
            text={text}
            disableBuiltInState
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{ fontFamily: "JosefinSans-Regular", textDecorationLine: "none" }}
            onPress={onPress}
            isChecked={isChecked}
        />
    );
}
