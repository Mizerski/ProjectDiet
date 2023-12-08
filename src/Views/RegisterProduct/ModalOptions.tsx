import { BlurView } from "expo-blur";
import { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { initialProducts } from "../../../mock/Products/Products";
import { CheckBox } from "../../Components/CheckBox";

export interface ITableItemsModal {
    closeModal: () => void;
}

export function TableItemsModal({ closeModal }: ITableItemsModal) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    function selectAllItems() {
        setSelectAll((prev) => {
            if (prev) {
                setSelectedItems([]);
                return false;
            }
            setSelectedItems([...new Set(initialProducts.map(({ label }) => label))]);
            return true;
        });
    }

    function handleSelectItem(label: string) {
        setSelectedItems((prev) => {
            if (prev.includes(label)) {
                if (prev.length === initialProducts.length) {
                    setSelectAll(false);
                }
                return prev.filter((item) => item !== label);
            }
            if (prev.length === initialProducts.length - 1) {
                setSelectAll(true);
            }
            return [...prev, label];
        });
    }

    function checkIsChecked(label: string) {
        return selectedItems.includes(label);
    }

    return (
        <View style={styles.container}>
            <Modal visible={true} animationType="slide" transparent={true}>
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={closeModal}>
                    <View style={styles.absolute}>
                        <BlurView style={styles.absolute} intensity={10} tint="light">
                            <View
                                style={styles.checkBoxContainer}
                                onStartShouldSetResponder={() => true}
                                onResponderReject={(e) => e.stopPropagation()}
                            >
                                <CheckBox text={"Selecionar Tudo"} onPress={selectAllItems} isChecked={selectAll} />
                                {initialProducts.map(({ label }, i) => (
                                    <CheckBox
                                        key={i}
                                        text={label}
                                        onPress={() => {
                                            handleSelectItem(label);
                                        }}
                                        isChecked={checkIsChecked(label)}
                                    />
                                ))}
                            </View>
                        </BlurView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    absolute: {
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    checkBoxContainer: {
        borderRadius: 20,
        gap: 20,
        backgroundColor: "pink",
        width: "80%",
        height: "60%",
        justifyContent: "center",
        paddingHorizontal: "5%",
    },
});
