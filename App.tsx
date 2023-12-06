import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { enableScreens } from "react-native-screens";
import { initializeLanguage } from "./src/Hooks/Languages";
import { HomeScreen } from "./src/Pages/Home";
import { SettingsScreen } from "./src/Pages/Settings";
import { LoginScreen } from "./src/Pages/Login";
import "./src/i18n";

enableScreens();

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

function Home() {
  const { t } = useTranslation();
  const [isLanguageInitialized, setIsLanguageInitialized] = useState(false);

  useEffect(() => {
    initializeLanguage().then(() => setIsLanguageInitialized(true));
  }, []);

  if (!isLanguageInitialized) {
    return null;
  }

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
      <Stack.Navigator screenOptions={{ headerShown: false, }} >
        <Stack.Screen name="Login" component={LoginScreen} options={{}} />
        <Stack.Screen name="Redirect" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
