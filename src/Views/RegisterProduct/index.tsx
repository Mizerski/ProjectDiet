import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { Dropdown } from "../../Components/Dropdown";
import { InputText } from "../../Components/Inputs/InputText";
import { initialProducts } from "../../Mock/Products";

export interface IProduct {
    productCode: number;
    quantidadeDaPorcao: string;
    carboidratos?: string;
    fibraAlimentar?: string;
    gordurasSaturadas?: string;
    gordurasTotais?: string;
    gordurasTrans?: string;
    proteinas?: string;
    sodio?: string;
    valorEnergetico?: string;
}

export interface IRegisterProduct {
    handleClickConfirm: (values: { [label: string]: string }) => void;
    handleClickBack: () => void;
}

export const Measures = ["g", "mg", "kJ", "kcal"];

export function RegisterProduct({ handleClickBack, handleClickConfirm }: IRegisterProduct) {
    const [labelsList, setLabelsList] = useState<{ label: string; value: string }[]>(initialProducts);
    const [labels, setLabels] = useState<string[]>([]);
    const [selectedLabel, setSelectedLabel] = useState<string>("");
    const [inputValues, setInputValues] = useState<{ [label: string]: string }>({});

    function handleConfirm() {
        if (labels.length === 0) return;
        if (labels.length !== Object.keys(inputValues).length) return;

        handleClickConfirm(inputValues);
        resetValues();
    }

    function resetValues() {
        setLabelsList(initialProducts);
        setLabels([]);
        setSelectedLabel("");
        setInputValues({});
    }

    function handleInputChange(label: string, value: string) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [label]: value,
        }));
    }

    function handleAddLabel(label: string) {
        if (label === "") return;
        setLabels([...labels, label]);
        setLabelsList(labelsList.filter((item) => item.label !== label));
        setSelectedLabel("");
    }

    function removeLabel(label: string) {
        const valueLabel = initialProducts.find((item) => item.label === label)?.value;
        if (valueLabel) {
            setLabels(labels.filter((item) => item !== label));
            setLabelsList([...labelsList, { label, value: label }]);
            setSelectedLabel(label);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.dropdown}>
                <Dropdown
                    items={labelsList}
                    onValueChange={(value) => {
                        const item = labelsList.find((item) => item.value === value);
                        setSelectedLabel(item?.label || "");
                    }}
                    style={{ width: "80%" }}
                    value=""
                />
                <View style={styles.addButton}>
                    <Button title="+" onPress={() => handleAddLabel(selectedLabel)} />
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                {labels.map((label, i) => {
                    return (
                        <View key={i} style={styles.viewLabels}>
                            <InputText
                                placeholder="valor da medida"
                                label={label}
                                value={inputValues[label] || ""}
                                onChange={(e) => handleInputChange(label, e)}
                            />
                            <Ionicons name="trash" size={32} color="red" onPress={() => removeLabel(label)} />
                        </View>
                    );
                })}
            </ScrollView>
            <View style={styles.buttons}>
                <View style={styles.backButton}>
                    <Button color={"red"} title="Voltar" onPress={handleClickBack} />
                </View>
                <View style={styles.confirmButton}>
                    <Button color={"green"} title="Cadastrar" onPress={() => handleConfirm} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
    },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
        marginHorizontal: 12,
        gap: 12,
    },
    addButton: {
        width: 40,
    },
    scrollView: {
        flex: 1,
        width: "100%",
        gap: 20,
        // backgroundColor: "pink",
        marginVertical: 10,
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
        marginVertical: 6,
        marginHorizontal: 12,
        gap: 12,
    },
    confirmButton: {
        height: 40,
        width: "50%",
    },
    backButton: {
        height: 40,
        width: "50%",
    },
});
