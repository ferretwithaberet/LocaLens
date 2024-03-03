import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { View, TextField, Button } from "react-native-ui-lib";
import { Stack } from "expo-router";

import TouchableLink from "@/components/common/TouchableLink";

const Login = () => {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View flex centerV className="p-12">
        <TextField
          preset="default"
          placeholder={t("Account")}
          floatingPlaceholder
        />

        <TextField
          preset="default"
          placeholder={t("Password")}
          floatingPlaceholder
        />

        <Button label="Login" />

        <View center>
          <TouchableLink textProps={{ text70: true }}>
            Forgot password?
          </TouchableLink>

          <TouchableLink textProps={{ text70: true }}>Register</TouchableLink>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
