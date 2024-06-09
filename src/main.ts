import * as SplashScreen from "expo-splash-screen";

import { APP_COLOR_SCHEME } from "@/utils/constants";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Configure rnui lib
// @ts-ignore Only instance of require, will not install @types/node for this
require("react-native-ui-lib/config").setConfig({
  appScheme: APP_COLOR_SCHEME,
});

// Prevent splashscreen close
SplashScreen.preventAutoHideAsync();
library.add(fas);

import "expo-router/entry";
