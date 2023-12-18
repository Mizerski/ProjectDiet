import BouncyCheckbox from "react-native-bouncy-checkbox";
import Colors from "../../../assets/styles/Colors";

export interface ICheckBox {
  isChecked: boolean;
  onPress: () => void;
  text: string;
}

export function CheckBox({ text, onPress, isChecked }: ICheckBox) {
  return (
    <BouncyCheckbox
      size={28}
      fillColor={Colors.black}
      unfillColor="#FFFFFF"
      text={text}
      disableBuiltInState
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={{ textDecorationLine: "none" }}
      onPress={onPress}
      isChecked={isChecked}
    />
  );
}
