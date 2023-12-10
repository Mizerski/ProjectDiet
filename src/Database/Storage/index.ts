import AsyncStorage from "@react-native-async-storage/async-storage";

enum DBKeyString {
  userEmail = "userEmail",
  authToken = "authToken",
  userID = "userID",
  defaultLanguage = "defaultLanguage",
  defaultTemperatureUnit = "defaultTemperatureUnit",
  rememberEmailState = "rememberEmailState",
}

enum DBKeyBool {
  isUserActive = "isUserActive",
  isTemporaryAccess = "isTemporaryAccess",
  rememberTemporaryAccess = "rememberTemporaryAccess",
}

enum DBKeyInt {
  loginCount = "loginCount",
}

class DB {
  static async __getItem<T>(key: string, defaultValue?: T): Promise<T | null> {
    const res = await AsyncStorage.getItem(key);
    if (!res && defaultValue) {
      return defaultValue;
    }
    return res as T;
  }

  static async __setItem<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, value as string);
  }

  static removeItem(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }

  static async getItemStr(
    key: DBKeyString,
    defaultValue?: string
  ): Promise<string | null> {
    return DB.__getItem<string>(key, defaultValue);
  }

  static async setItemStr(key: DBKeyString, value: string): Promise<void> {
    return DB.__setItem<string>(key, value);
  }

  static async getItemBool(key: DBKeyBool): Promise<boolean | null> {
    const promise = await DB.__getItem<string>(key, "");
    return promise === "true";
  }

  static async setItemBool(key: DBKeyBool, value: boolean): Promise<void> {
    return DB.__setItem<string>(key, value.toString());
  }

  public static async printAllKeys() {
    await AsyncStorage.getAllKeys((err, keys) => console.log(keys));
  }
}

export { DB, DBKeyInt, DBKeyString, DBKeyBool };
