import BouncyCheckbox from "react-native-bouncy-checkbox";

export interface ICheckBox {
    text: string;
}

export function CheckBox({ text }: ICheckBox) {
    return (
        <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            text={text}
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{ fontFamily: "JosefinSans-Regular", textDecorationLine: "none" }}
            onPress={() => {}}
        />
    );
}
