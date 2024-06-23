import { Appearance } from "react-native";

// Due to a bug in rnui lib, this is required as theme does not change while app is open
export const APP_COLOR_SCHEME = Appearance.getColorScheme() ?? "light";
export const BACKEND_URI = "http://192.168.0.170:8000";
