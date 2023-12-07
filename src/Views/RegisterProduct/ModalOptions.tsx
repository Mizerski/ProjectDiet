import { BlurView } from "expo-blur";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { CheckBox } from "../../Components/CheckBox";
import { initialProducts } from "../../Mock/Products";

export function TableItemsModal() {
    return (
        <View style={styles.container}>
            <Modal visible={true} animationType="slide" transparent={true}>
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={() => console.log("Sair")}
                >
                    <BlurView style={styles.absolute} intensity={10} tint="light">
                        <View style={styles.modalContainer}>
                            <View style={styles.checkBoxContainer}>
                                <CheckBox text={"Selecionar Todos"} />
                                {initialProducts.map((product, i) => (
                                    <CheckBox key={i} text={product.label} />
                                ))}
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
    },
    absolute: {
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    checkBoxContainer: {
        gap: 12,
        backgroundColor: "pink",
        width: "75%",
        height: "50%",
        justifyContent: "center",
        paddingHorizontal: "15%",
    },
});
