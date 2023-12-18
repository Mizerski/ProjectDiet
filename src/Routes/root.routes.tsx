import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Login: undefined;
  MainTab: { screen: string };
};

export const RootStack = createStackNavigator<RootStackParamList>();
