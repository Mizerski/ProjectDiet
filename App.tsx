import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { enableScreens } from "react-native-screens";
import { initializeLanguage } from "./src/Hooks/Languages";
import { SettingsScreen } from "./src/Pages/Settings";
import { LoginScreen } from "./src/Pages/Login";
import { HomeScreen } from "./src/Pages/Home";
import "./src/i18n";
import "./setupConsole";
import Colors from "./assets/styles/Colors";
enableScreens();
import { Octicons, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs: React.FC = () => {
  const { t } = useTranslation();
  const [isLanguageInitialized, setIsLanguageInitialized] = useState(false);

  useEffect(() => {
    initializeLanguage().then(() => setIsLanguageInitialized(true));
  }, []);

  if (!isLanguageInitialized) {
    return null;
  }

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.tab_bar,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarInactiveTintColor: Colors.white,
        tabBarActiveTintColor: Colors.black_alternative,
        tabBarStyle: {
          backgroundColor: Colors.tab_bar,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: t("Navbar.Home"),
          tabBarIcon: ({ color }) => (
            <Octicons name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t("Navbar.Settings"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTab" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
