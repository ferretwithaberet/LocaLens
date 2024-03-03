import { useTranslation } from "react-i18next";
import { Stack } from "expo-router";
import { View, Text } from "react-native-ui-lib";

const Settings = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Stack.Screen options={{ title: t("tabs.settings") }} />

      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
