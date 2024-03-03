import { useEffect } from "react";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "react-native-ui-lib";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";

import { APP_COLOR_SCHEME } from "@/utils/constants";

// TODO: Check theme colors on real device
Colors.loadDesignTokens({ primaryColor: "#72a82f" });
Colors.loadSchemes({
  light: {
    $backgroundDefault: Colors.white,
    $backgroundElevated: Colors.white,
    $backgroundElevatedLight: Colors.white,
    $backgroundDark: Colors.grey10,
    $backgroundDarkElevated: Colors.grey10,
    $backgroundDarkActive: Colors.grey20,
    $backgroundInverted: Colors.grey10,
  },
  dark: {
    $backgroundDefault: "#101010",
    $backgroundElevated: Colors.black,
    $backgroundElevatedLight: "#252525",
    $backgroundDark: Colors.black,
    $backgroundDarkElevated: "#0e0e0e",
    $backgroundDarkActive: Colors.grey10,
    $backgroundInverted: Colors.white,
  },
});

const RootLayout = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    dark: isDark,
    colors: {
      primary: Colors.$textPrimary,
      background: Colors.$backgroundDefault,
      card: Colors.$backgroundElevated,
      text: Colors.$textDefault,
      border: Colors.$outlineDefault,
      notification: Colors.$textDanger,
    },
  };

  return (
    <ThemeProvider value={theme}>
      <StatusBar style={APP_COLOR_SCHEME === "dark" ? "light" : "dark"} />

      <Slot />
    </ThemeProvider>
  );
};

export default RootLayout;
