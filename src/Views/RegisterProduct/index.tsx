import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { Button, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { InputText } from "../../Components/Inputs/InputText";

export interface IRegisterProduct {
    products: string[];
    handleClickBack: () => void;
    handleClickRegister: (inputValues: { [label: string]: string }) => void;
}

export function RegisterProduct({ products, handleClickBack, handleClickRegister }: IRegisterProduct) {
    const [inputValues, setInputValues] = useState<{ [label: string]: string }>({});

    function filterLabel(value: string) {
        const regex = /[^0-9.,]/g;
        return value.replace(regex, "") || "";
    }

    function handleInputChange(label: string, value: string) {
        setInputValues((prevValues) => {
            return {
                ...prevValues,
                [label]: filterLabel(value),
            };
        });
    }

    return (
        <View style={styles.container}>
            <Modal visible={true} animationType="slide" transparent={true}>
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={() => {}}>
                    <BlurView intensity={10} tint="light" style={styles.absolute}>
                        <View style={styles.backgroundModalContainer}>
                            <ScrollView style={styles.scrollView}>
                                {products.map((label, i) => {
                                    return (
                                        <View key={i} style={styles.viewLabels}>
                                            <InputText
                                                placeholder="valor da medida"
                                                label={label}
                                                value={inputValues[label] || ""}
                                                onChange={(e) => handleInputChange(label, e)}
                                            />
                                            <Ionicons name="trash" size={32} color="red" />
                                        </View>
                                    );
                                })}
                            </ScrollView>
                            <View style={styles.buttons}>
                                <View style={styles.backButton}>
                                    <Button color={"red"} title="Voltar" onPress={handleClickBack} />
                                </View>
                                <View style={styles.registerButton}>
                                    <Button
                                        color={"green"}
                                        title="Registrar"
                                        onPress={() => handleClickRegister(inputValues)}
                                    />
                                </View>
                            </View>
                        </View>
                    </BlurView>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
        marginHorizontal: 12,
        gap: 12,
    },
    backgroundModalContainer: {
        backgroundColor: "pink",
    },
    absolute: {
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 60,
    },
    scrollView: {
        marginVertical: 10,
    },
    addButton: {
        width: 40,
    },
    viewLabels: {
        flex: 1,
        marginVertical: 20,
        alignItems: "center",
        width: "90%",
        flexDirection: "row",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 10,
        marginHorizontal: 12,
        gap: 12,
    },
    registerButton: {
        height: 40,
        width: "50%",
    },
    backButton: {
        height: 40,
        width: "50%",
    },
});
1;
