import { RootStackParamList } from "./src/Routes/root.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
