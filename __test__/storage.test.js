import { setLanguageData, getLanguageData } from "../src/Hooks/Languages.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn((key, value) => {
    console.log(`setItem called with ${key}, ${value}`);
    return Promise.resolve(null);
  }),
  getItem: jest.fn((key) => {
    console.log(`getItem called with ${key}`);
    return Promise.resolve("pt-BR");
  }),
}));
describe("Language storage", () => {
  it("should store language data", async () => {
    await setLanguageData("pt-BR");
    console.log(AsyncStorage.setItem.mock);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("language", "pt-BR");
  });

  it("should retrieve language data", async () => {
    const language = await getLanguageData();
    console.log(AsyncStorage.getItem.mock);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("language");
    expect(language).toBe("pt-BR");
  });
});
