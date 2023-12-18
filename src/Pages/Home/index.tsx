import { Button, StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SelectInput from "../../Components/Select";
import { TwoButtonRow } from "../../Components/Buttons/TwoButtonRow";
import { CancelButton } from "../../Components/Buttons/CancelButton";
import LoadingButton from "../../Components/Buttons/ButtonLoading";
import { Camera, CameraType } from "expo-camera";
import { CTModal } from "../../Components/Modal";
import { NutriTableOptions } from "../../Models/Nutri/Options";
import TableTextField from "../../Components/Forms/TableTextField";
import { logDebugInfo } from "../../../setupConsole";
import Colors from "../../../assets/styles/Colors";

export function HomeScreen() {
  const [selectInput, setSelectInputVisible] = React.useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isPermissionCamera, setIsPermissionCamera] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedBarCode, setScannedBarCode] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [savedValues, setSavedValues] = useState<
    Array<{ key: string; value: string | null }>
  >([]);

  const [selectedOptions, setSelectedOptions] = useState<
    Array<{ label: string; value: { label: string; value: string } }>
  >([]);
  const [savedOptions, setSavedOptions] = useState<
    Array<{ label: string; value: { label: string; value: string } }>
  >([]);
  const [scanned, setScanned] = useState(false);
  const [itemViews, setItemViews] = useState<Array<JSX.Element>>([]);
  const [productName, setProductName] = useState("");

  const handleSaveValues = () => {
    setSavedValues((prevValues) => [
      ...prevValues,
      ...Object.entries(fieldValues).map(([key, value]) => ({ key, value })),
      { key: "Barcode", value: scannedBarCode || "" },
    ]);
    setItemViews((prevViews) => [
      ...prevViews,
      <View
        key={savedValues.length}
        style={{
          backgroundColor: Colors.black_alternative,
          padding: 10,
          borderRadius: 5,
          width: "100%",
          height: "auto",
          marginBottom: 10,
          marginTop: 15,
        }}
      >
        <Text
          style={{
            color: Colors.white,
            fontSize: 16,
          }}
        >{`Product Name: ${productName}`}</Text>
        {Object.entries(fieldValues).map(([key, value], index) => (
          <Text
            key={index}
            style={{
              color: Colors.white,
              fontSize: 16,
            }}
          >{`${key}: ${value}`}</Text>
        ))}
        <Text
          style={{
            color: Colors.white,
            fontSize: 16,
          }}
        >{`barcode: ${scannedBarCode || ""}`}</Text>
      </View>,
    ]);
    setIsFieldModalVisible(false);
    setFieldValues({});
    setSelectedOptions([]);
    setScannedBarCode(null);
    setFieldValues({});
    setProductName("");
  };
  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    setIsPermissionCamera(status !== "granted");
  };
  const handleFieldValueChange = (label: string, value: string) => {
    setFieldValues((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  const handleSelectOptions = () => {
    setSelectInputVisible(false);
    setScanned(false);
    setSavedOptions(selectedOptions);
    setTimeout(() => setIsFieldModalVisible(true), 1000);
  };
  const handleCloseModal = () => {
    setSelectInputVisible(false);
    setScanned(false);
    setSelectedOptions([]);
  };

  const handleOpenCamera = () => {
    if (hasPermission === true) {
      setIsCameraOpen(true);
    } else {
      setIsPermissionCamera(true);
    }
  };

  function handleBarCodeScanned({ data }: { data: string }) {
    setScanned(true);
    setScannedBarCode(data);
    setIsCameraOpen(false);
    setSelectInputVisible(true);
  }

  const handleOptionSelect = (
    option:
      | { label: string; value: { label: string; value: string } }
      | { label: string; value: { label: string; value: string } }[]
  ) => {
    if (Array.isArray(option)) {
      setSelectedOptions(option);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  logDebugInfo({
    scannedBarCode,
    savedValues,
    selectedOptions,
  });

  return (
    <View style={styles.container}>
      <CTModal
        modalVisible={isPermissionCamera}
        setModalVisible={setIsPermissionCamera}
        title="Camera Permission"
        description="Please allow camera access to scan Barcode"
        twoButtonRow={
          <TwoButtonRow
            buttonLeft={
              <CancelButton
                onPress={() => setIsPermissionCamera(false)}
                submitText="Cancel"
              />
            }
            buttonRight={
              <LoadingButton
                onPress={requestCameraPermission}
                submitText="Allow"
                isLoading={false}
                disabled={false}
              />
            }
          />
        }
      />
      {selectInput && (
        <SelectInput
          title="Select"
          setIsOptionsOpen={setSelectInputVisible}
          isOptionsOpen={selectInput}
          options={
            NutriTableOptions.map((option) => ({
              label: option.label,
              value: option,
            })) || []
          }
          selectedOption={selectedOptions}
          isMultiSelect={true}
          onOptionSelect={handleOptionSelect}
          placeholder="Select"
          twoButtonRow={
            <TwoButtonRow
              buttonLeft={
                <CancelButton onPress={handleCloseModal} submitText="Cancel" />
              }
              buttonRight={
                <LoadingButton
                  onPress={handleSelectOptions}
                  submitText="Save"
                  isLoading={false}
                  disabled={false}
                />
              }
            />
          }
        />
      )}
      <Button title="Open Camera" onPress={handleOpenCamera} />
      <CTModal
        modalVisible={isCameraOpen}
        setModalVisible={setIsCameraOpen}
        title="Scan Barcode"
        description="Please scan barcode to get the details"
      >
        {isCameraOpen && (
          <Camera
            style={{ width: "100%", height: 200 }}
            type={CameraType.back}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        )}
      </CTModal>

      <CTModal
        modalVisible={isFieldModalVisible}
        setModalVisible={setIsFieldModalVisible}
        title="Enter Field Values"
        description="Please enter the values for the selected fields"
      >
        <ScrollView>
          <TableTextField
            label="Product Name"
            initialValue={productName}
            onValueChange={(value: string) => setProductName(value)}
            inputContainerStyle={{
              height: 40,
            }}
          />
          {savedOptions.map((option, index) => (
            <View key={index}>
              <TableTextField
                label={option.label}
                isNumericKeyboard={true}
                initialValue={fieldValues[option.label] || ""}
                onValueChange={(value: string) =>
                  handleFieldValueChange(option.label, value)
                }
                inputContainerStyle={{
                  height: 40,
                }}
              />
            </View>
          ))}
        </ScrollView>
        <TwoButtonRow
          buttonLeft={
            <CancelButton
              onPress={() => setIsFieldModalVisible(false)}
              submitText="Cancel"
            />
          }
          buttonRight={
            <LoadingButton
              onPress={handleSaveValues}
              submitText="Save"
              isLoading={false}
              disabled={false}
            />
          }
        />
      </CTModal>

      {itemViews}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  PermissionModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
