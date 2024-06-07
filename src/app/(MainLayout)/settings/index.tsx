import { Stack } from "expo-router";
import { View, Text } from "react-native-ui-lib";

const Settings = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Setări" }} />

      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
