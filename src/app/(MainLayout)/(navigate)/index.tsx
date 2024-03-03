import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { View, Colors } from "react-native-ui-lib";
import MapView from "react-native-maps";

const IndexPage = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [permissionStatus, requestPermission] =
    Location.useForegroundPermissions();

  useEffect(() => {
    if (permissionStatus?.granted) return;

    requestPermission();
  }, [permissionStatus]);

  return (
    <View flex>
      {isFocused ? (
        <StatusBar
          style="light"
          backgroundColor={Colors.rgba(Colors.black, 0.5)}
        />
      ) : null}

      <Stack.Screen options={{ headerShown: false }} />

      <MapView
        className="flex-1"
        mapPadding={{ top: safeAreaInsets.top, bottom: 0, left: 0, right: 0 }}
        showsUserLocation={permissionStatus?.granted}
      />
    </View>
  );
};

export default IndexPage;
