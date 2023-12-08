import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Login: undefined;
  Redirect: undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();
