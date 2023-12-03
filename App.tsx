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
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: t("Navbar.Home") }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: t("Navbar.Settings") }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
