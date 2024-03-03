import * as SplashScreen from "expo-splash-screen";

import { APP_COLOR_SCHEME } from "@/utils/constants";
import { initI18n } from "@/services/i18n";

// Configure rnui lib
require("react-native-ui-lib/config").setConfig({
  appScheme: APP_COLOR_SCHEME,
});

// Prevent splashscreen close
SplashScreen.preventAutoHideAsync();

// Initialize I18N service
initI18n();

import "expo-router/entry";
