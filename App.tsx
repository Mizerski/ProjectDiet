import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { enableScreens } from "react-native-screens";
import { HomeScreen } from "./src/Pages/Home";
import { SettingsScreen } from "./src/Pages/Settings";
import { DataUser } from "./src/hooks/Contexts";
import "./src/i18n";
import i18n from "./src/i18n";

enableScreens();

const Tab = createBottomTabNavigator();

function App() {
    const { t } = useTranslation();
    const { storage } = useContext(DataUser);

    useEffect(() => {
        i18n.changeLanguage(storage.getString("language"));
    }, []);

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{ title: t("Navbar.Home") }} />
                <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t("Navbar.Settings") }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App;
