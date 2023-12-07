import { StyleSheet, Text, TextInput, View } from "react-native";

export interface IInputText {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function InputText({ label, value, onChange, placeholder }: IInputText) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input} //
                onChangeText={onChange} //
                value={value} //
                placeholder={placeholder} //
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        alignSelf: "flex-start",
        marginLeft: 20,
        marginBottom: 8,
    },
    input: {
        width: "90%",
        fontSize: 20,
        height: 32,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});
