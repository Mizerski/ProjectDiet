import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "../../../assets/styles/Colors";

import { BlurView } from "expo-blur";
interface ModalProps {
  title: string;
  description?: string;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
  twoButtonRow?: React.ReactNode;
}

export const CTModal = (props: React.PropsWithChildren<ModalProps>) => {
  const {
    modalVisible,
    setModalVisible,
    title,
    isLoading,
    description,
    twoButtonRow,
  } = props;
  const onClose = () => setModalVisible(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onDismiss={onClose}
      onRequestClose={onClose}
    >
      <BlurView style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              {title && (
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {title}
                </Text>
              )}
              <TouchableOpacity onPress={onClose}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
            {description && (
              <Text style={[styles.modalText]}>{description}</Text>
            )}
            {twoButtonRow}
            {props.children}
            {isLoading && (
              <ActivityIndicator size="large" color={Colors.black} />
            )}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: wp("92%"),
    maxHeight: hp("90%"),
    minHeight: hp("20%"),
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalText: {
    marginVertical: "5%",
    textAlign: "center",
  },
});
