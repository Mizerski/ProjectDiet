import React, { Dispatch, ForwardRefRenderFunction, SetStateAction } from "react";
import { StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle } from "react-native";

interface LoginButtonProps extends TextInputProps {
    type: string,
    setText: Dispatch<SetStateAction<string>>,
    textValue: string,
    newStyle?: StyleProp<ViewStyle>;
}

export const LoginButton: ForwardRefRenderFunction<TextInput, LoginButtonProps> = (
    { type, setText, textValue, newStyle, ...props }, ref) => {
    switch (type) {
        case 'email':
            return <TextInput
                onChangeText={setText}
                value={textValue}
                autoComplete="email"
                autoFocus={true}
                style={[newStyle, styles.emailInput]}
                {...props}
                ref={ref}
            />
        case 'password':
            return <TextInput
                onChangeText={setText}
                value={textValue}
                secureTextEntry={true}
                autoComplete="password"
                style={[newStyle, styles.emailInput]}
            />
        default:
            return <TextInput
                onChangeText={setText}
                value={textValue}
                style={[newStyle, styles.emailInput]}
            />
    }
}

const styles = StyleSheet.create({
    emailInput: {
        marginTop: 10,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        width: 300,
    },
})