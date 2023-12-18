import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { TFormErrors } from "../../Classes/Form";
import Colors from "../../../assets/styles/Colors";
import { getMandatoryLabel, BaseStyle } from "../Forms/Base/BaseFormField";
import { CTModal } from "../Modal";
import { CheckBox } from "../CheckBox";

interface SelectInputProps<T> {
  title: string;
  options: Array<{ label: string; value: T }>;
  disabled?: boolean;
  getKey?: (value: T) => string;
  placeholder?: string;
  isMandatory?: boolean;
  onEndReached?: () => void;
  isLoading?: boolean;
  onRefresh?: () => void;
  field?: string;
  formErrors?: TFormErrors<string>;
  placeholderColor?: string;
  isMultiSelect?: boolean;
  selectedOption: T | T[] | null;
  onOptionSelect: (option: T | T[]) => void;
  twoButtonRow?: React.ReactNode;
  isOptionsOpen: boolean;
  setIsOptionsOpen?: Dispatch<SetStateAction<boolean>>;
  description?: string;
}
interface Styles {
  fieldLabel: object;
  errorMessage: object;
  disabled: object;
  space: object;
  label: object;
  optionText: object;
  options: object;
  option: object;
  title: object;
}

type Fc<T> = React.PropsWithChildren<SelectInputProps<T>>;

function SelectInput<T>(props: Fc<T>) {
  const { t } = useTranslation();

  const {
    title,
    field,
    formErrors,
    isMandatory = true,
    options,
    selectedOption,
    disabled = false,
    getKey = null,
    isLoading = false,
    onEndReached,
    onRefresh,
    placeholderColor = Colors.gray,
    twoButtonRow,
    isOptionsOpen,
    setIsOptionsOpen,
  } = props;
  const [selectedOptionLabel, setSelectedOptionLabel] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<T[]>(
    Array.isArray(props.selectedOption) ? props.selectedOption : []
  );

  useEffect(() => {
    if (props.isMultiSelect) {
      props.onOptionSelect(selectedOptions);
    }
  }, [selectedOptions]);

  const handleSelectOption = useCallback(
    (value: T) => {
      if (props.isMultiSelect) {
        if (selectedOptions.includes(value)) {
          setSelectedOptions(
            selectedOptions.filter((option) => option !== value)
          );
        } else {
          setSelectedOptions([...selectedOptions, value]);
        }
      } else {
        props.onOptionSelect(value);
        if (setIsOptionsOpen) {
          setIsOptionsOpen(false);
        }
      }
    },
    [props, selectedOptions, setIsOptionsOpen]
  );

  useEffect(() => {
    const matchingOption = options.find(
      ({ value }) => value === selectedOption
    );

    if (matchingOption) {
      setSelectedOptionLabel(matchingOption.label);
    } else if (props.placeholder) {
      setSelectedOptionLabel(props.placeholder);
    }
  }, [options, selectedOption, props.placeholder]);

  const titleDisplay = getMandatoryLabel(title, isMandatory);

  const renderItem = (label: string, value: T) => {
    if (props.isMultiSelect) {
      const isSelected = selectedOptions.includes(value);
      return (
        <View
          style={{
            padding: 10,
            borderColor: isSelected ? Colors.background : Colors.gray,
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 5,
            height: 50,
            backgroundColor: isSelected ? Colors.background : Colors.white,
          }}
        >
          <CheckBox
            text={label}
            isChecked={isSelected}
            onPress={() => handleSelectOption(value)}
          />
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          key={getKey === null ? (value as string) : getKey(value)}
          onPress={() => handleSelectOption(value)}
        >
          <View style={styles.option}>
            <Text numberOfLines={1}>{label}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const active = !disabled && !isLoading;
  return (
    <View style={[styles.space]}>
      <TouchableOpacity
        disabled={!active}
        onPress={() => setIsOptionsOpen && setIsOptionsOpen(!isOptionsOpen)}
      >
        <Text style={[styles.fieldLabel, styles.title]}>{titleDisplay}</Text>
        <View style={[styles.label, styles.option, !active && styles.disabled]}>
          <Text
            style={[
              {
                color: isLoading
                  ? Colors.gray
                  : selectedOption
                  ? Colors.black
                  : placeholderColor,
              },
            ]}
          >
            {isLoading ? t("loading") : selectedOptionLabel}
          </Text>
        </View>
      </TouchableOpacity>

      {isOptionsOpen && setIsOptionsOpen && (
        <CTModal
          modalVisible={isOptionsOpen}
          setModalVisible={setIsOptionsOpen}
          title={titleDisplay}
          description={props.description}
        >
          <View style={styles.options}>
            <FlatList
              data={options}
              onEndReachedThreshold={0.5}
              onEndReached={onEndReached}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
              renderItem={({ item: { label, value } }) =>
                renderItem(label, value)
              }
            />
            {twoButtonRow}
          </View>
        </CTModal>
      )}

      {field && formErrors && formErrors[field] && (
        <Text style={styles.errorMessage}>{formErrors[field]}</Text>
      )}
    </View>
  );
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create({
  ...BaseStyle.fieldLabel,
  ...BaseStyle.errorMessage,
  disabled: {
    backgroundColor: Colors.gray,
  },
  space: {
    marginTop: 10,
  },
  label: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 20,
    color: Colors.grayDisabled,
  },
  options: {
    marginTop: 10,
    paddingBottom: 10,
  },
  option: {
    padding: 10,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
    height: 50,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  title: {
    marginBottom: 10,
    color: Colors.grayDisabled,
  },
});

export default SelectInput;
