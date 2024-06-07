import * as SplashScreen from "expo-splash-screen";

import { APP_COLOR_SCHEME } from "@/utils/constants";

// Configure rnui lib
// @ts-ignore Only instance of require, will not install @types/node for this
require("react-native-ui-lib/config").setConfig({
  appScheme: APP_COLOR_SCHEME,
});

// Prevent splashscreen close
SplashScreen.preventAutoHideAsync();

import "expo-router/entry";
