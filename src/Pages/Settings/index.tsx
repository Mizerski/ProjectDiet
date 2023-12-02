import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "../../Components/Dropdown";

export function SettingsScreen() {
    const { t, i18n } = useTranslation();

    function onChangeLanguage(value: string) {
        console.log(value);
        i18n.changeLanguage(value);
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.labelLanguageContainer}>{t("Text.Language")}</Text>
                <Dropdown
                    placeholder={t("Text.SelectLanguage")}
                    items={[
                        { label: "Português", value: "pt-BR" },
                        { label: "Inglês", value: "en-US" },
                    ]}
                    style={{ width: "90%" }}
                    onChangeValue={onChangeLanguage}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    labelLanguageContainer: {
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical: 10,
    },
});
