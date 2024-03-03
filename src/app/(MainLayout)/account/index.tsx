import { useTranslation } from "react-i18next";
import { View, Text } from "react-native-ui-lib";
import { Stack } from "expo-router";

const Account = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Stack.Screen options={{ title: t("tabs.account") }} />

      <Text>Account</Text>
    </View>
  );
};

export default Account;
