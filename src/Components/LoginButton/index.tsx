import React, {
    Dispatch,
    ForwardRefRenderFunction,
    SetStateAction,
    forwardRef,
} from "react";
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    ViewStyle,
    TextInput as RNTextInput,
} from "react-native";

interface LoginButtonProps extends Omit<TextInputProps, 'ref'> {
    type: "email" | "password" | undefined;
    setText: Dispatch<SetStateAction<string>>;
    textValue: string;
    newStyle?: StyleProp<ViewStyle>;

}


const LoginButton: ForwardRefRenderFunction<RNTextInput, LoginButtonProps> = (
    { type, setText, textValue, newStyle, ...props },
    ref
) => {

    switch (type) {
        case "email":
            return (
                <TextInput
                    onChangeText={setText}
                    value={textValue}
                    autoComplete="email"
                    style={[styles.emailInput, newStyle]}
                    {...props}
                    ref={ref}
                />
            );
        case "password":
            return (
                <TextInput
                    onChangeText={setText}
                    value={textValue}
                    secureTextEntry={true}
                    autoComplete="password"
                    style={[styles.emailInput, newStyle]}
                    {...props}
                    ref={ref}
                />
            );
        default:
            return (
                <TextInput
                    onChangeText={setText}
                    value={textValue}
                    style={[newStyle, styles.emailInput]}
                    {...props}
                    ref={ref}
                />
            );
    }
};

const styles = StyleSheet.create({
    emailInput: {
        marginTop: 10,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5,
        width: 300,
        borderColor: "#ccc",
    },
    errorInput: {
        borderColor: "red",
        boxShadow: "0 0 5px red",
    },
});

export default forwardRef(LoginButton);