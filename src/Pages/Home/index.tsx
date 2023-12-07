import { BlurView } from "expo-blur";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TableItemsModal } from "../../Views/RegisterProduct/ModalOptions";

export function HomeScreen() {
    const { t } = useTranslation();

    const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [scannedData] = useState<{ [label: string]: string }>({});

    function handleBarCodeScanned() {
        setScanned(true);
        setIsCameraVisible(false);
    }

    if (!hasPermission) {
        return <View />;
    }

    if (!hasPermission.granted) {
        return (
            <Modal animationType="slide" transparent={true}>
                <View style={styles.PermissionModal}>
                    <Text>{t("Camera.Permission")}</Text>
                    <Button onPress={setHasPermission} title={t("Text.GrantPermission")} />
                </View>
            </Modal>
        );
    }

    return (
        <View style={styles.container}>
            <Modal visible={isCameraVisible} animationType="slide" transparent={true}>
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={() => setIsCameraVisible(false)}
                >
                    <BlurView style={styles.absolute} intensity={10} tint="light">
                        <View style={styles.modalContainer}>
                            <View style={styles.cameraContainer}>
                                <View style={styles.roundedCamera}>
                                    <Camera
                                        type={CameraType.back}
                                        style={styles.Camera}
                                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                    >
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                style={styles.button}
                                                onPress={() => setIsCameraVisible(false)}
                                            ></TouchableOpacity>
                                            <Button
                                                title={t("Button.Barcode")}
                                                onPress={() => handleBarCodeScanned()}
                                            />
                                        </View>
                                    </Camera>
                                </View>
                            </View>
                        </View>
                    </BlurView>
                </TouchableOpacity>
            </Modal>
            {scanned ? (
                <TableItemsModal />
            ) : (
                // <RegisterProduct
                //     handleClickBack={() => {
                //         setScanned(false);
                //         setScannedData({});
                //     }}
                //     handleClickConfirm={(values) => {
                //         setScanned(false);
                //         setScannedData(values);
                //     }}
                // />
                <View>
                    <Button title={t("Camera.Title")} onPress={() => setIsCameraVisible(true)} />
                    {Object.entries(scannedData).map(([key, value], i) => {
                        return (
                            <View key={i} style={{ marginTop: 20 }}>
                                <Text>
                                    {key} - {value}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    PermissionModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    roundedCamera: {
        flex: 1,
        borderRadius: 50,
        overflow: "hidden",
        borderColor: "green",
        borderWidth: 3,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cameraContainer: {
        width: "80%",
        height: "30%",
        backgroundColor: "transparent",
    },
    Camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        backgroundColor: "transparent",
    },
    button: {
        alignSelf: "flex-end",
        alignItems: "center",
    },

    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
