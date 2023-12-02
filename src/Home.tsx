import axios from "axios";
import { BlurView } from "expo-blur";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export default function HomeScreen() {
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [, setExistingData] = useState([]);

  const fetchExistingData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/barcode/123456789012"
      );
      setExistingData(response.data);
      console.log(response.data);
    } catch (error) {
      // console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchExistingData();
  }, []);
  const handleBarCodeScanned = async ({
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setScannedData(data);
    setIsCameraVisible(false);
    setScanned(false);

    try {
      const response = await axios.post("http://127.0.0.1:5000/barcode", {
        barcode: data,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const simulateBarCodeScanned = (type: string, data: string) => {
    handleBarCodeScanned({ type, data });
  };
  if (!hasPermission) {
    return <View />;
  }
  if (!hasPermission.granted) {
    return (
      <Modal animationType="slide" transparent={true}>
        <View style={styles.PermissionModal}>
          <Text>
            É necessário permissão para usar a câmera neste aplicativo
          </Text>
          <Button onPress={setHasPermission} title="conceder permissão" />
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
                    onBarCodeScanned={
                      scanned ? undefined : handleBarCodeScanned
                    }
                  >
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => setIsCameraVisible(false)}
                      ></TouchableOpacity>
                      <Button
                        title="Simular leitura de código de barras"
                        onPress={() =>
                          simulateBarCodeScanned("EAN-13", "123456789012")
                        }
                      />
                    </View>
                  </Camera>
                </View>
              </View>
            </View>
          </BlurView>
        </TouchableOpacity>
      </Modal>
      <View>
        <Button title="Abrir Câmera" onPress={() => setIsCameraVisible(true)} />
        <View>
          <Text>{scannedData}</Text>
        </View>
      </View>
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
