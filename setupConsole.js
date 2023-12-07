import { DEBUG_MODE } from "@env";
import { Platform } from "react-native";
import { getLanguageData } from "./src/Hooks/Languages";

if (DEBUG_MODE === "true") {
  console.debug("------------------- DEBUG --------------------");
  console.debug("DEBUG MODE ON");
  console.debug("Platform.OS:", Platform.OS, Platform.Version);
  getLanguageData().then((storedLanguage) => {
    console.debug("Stored language:", storedLanguage);
  });
} else {
  console.debug = () => {};
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}
