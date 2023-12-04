import { createContext } from "react";
import { MMKV } from "react-native-mmkv";

export interface ISettings {
    storage: MMKV;
}

export const DataUser = createContext<ISettings>({
    storage: new MMKV(),
});
