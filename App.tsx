import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { enableScreens } from "react-native-screens";
import { initializeLanguage } from "./src/Hooks/Languages";
import { HomeScreen } from "./src/Pages/Home";
import { SettingsScreen } from "./src/Pages/Settings";
import "./src/i18n";

enableScreens();

const Tab = createBottomTabNavigator();

function App() {
    const { t } = useTranslation();
    const [isLanguageInitialized, setIsLanguageInitialized] = useState(false);

    useEffect(() => {
        initializeLanguage() //
            .then(() => setIsLanguageInitialized(true));
    }, []);

    if (!isLanguageInitialized) {
        return null;
    }

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
