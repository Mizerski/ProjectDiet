import { DEBUG_MODE } from "@env";
import { Platform } from "react-native";

export const logDebugInfo = (data) => {
  if (DEBUG_MODE === "true") {
    console.debug("------------------- DEBUG --------------------");
    console.debug("DEBUG MODE ON");
    console.debug("Platform.OS:", Platform.OS, Platform.Version);
    Object.entries(data).forEach(([key, value]) => {
      console.debug(`${key}:`, value);
    });
  }
};
if (DEBUG_MODE !== "true") {
  console.debug = () => {};
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}
