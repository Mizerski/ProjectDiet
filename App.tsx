import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HomeScreen } from "./src/Pages/Home";
import { SettingsScreen } from "./src/Pages/Settings";
import "./src/i18n";

const Tab = createBottomTabNavigator();

function App() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={t("Navbar.Home")} component={HomeScreen} />
        <Tab.Screen name={t("Navbar.Settings")} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
