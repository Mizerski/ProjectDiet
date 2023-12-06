import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HomeScreen } from "./src/Pages/Home";
import { SettingsScreen } from "./src/Pages/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./src/Pages/Login";
import "./src/i18n";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  const { t } = useTranslation();

  return (
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
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Redirect" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
