import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "./Colors";
export const FGTextFieldIcon = {
  width: wp("6%"),
  height: hp("5%"),
};
export const AccordionIcon = {
  width: wp("10%"),
  height: hp("4%"),
};
export const SensorItemIcon = {
  width: wp("5%"),
  height: hp("3%"),
};
export const SensorItemType = {
  width: wp("10%"),
  height: hp("3%"),
};
export const SensorItemType2 = {
  width: wp("4%"),
  height: hp("4%"),
};

export const appBarIcons = {
  width: wp("5%"),
  height: hp("5%"),
};
export const sensorTabBarIcon = {
  width: wp("10%"),
  height: hp("8%"),
};
export const tabBarIcons = {
  width: wp("6%"),
  height: hp("5%"),
};

export const components = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  listContainer: {
    backgroundColor: Colors.background,
  },
  rowText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  appBarIcons: {
    width: 50,
    height: 50,
  },
  rowLabel: {
    marginTop: 37,
    marginHorizontal: 35,
  },
  separate: {
    textAlign: "center",
    marginHorizontal: 15,
  },
});
