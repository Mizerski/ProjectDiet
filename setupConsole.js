import { DEBUG_MODE } from "@env";
import { Platform } from "react-native";

if (DEBUG_MODE === "true") {
  console.debug("------------------- DEBUG --------------------");
  console.debug("DEBUG MODE ON");
  console.debug("Platform.OS:", Platform.OS, Platform.Version);
} else {
  console.debug = () => {};
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}
