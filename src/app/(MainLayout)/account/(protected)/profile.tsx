import { Stack } from "expo-router";
import { View, Text, Button, Colors } from "react-native-ui-lib";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser as fasUser } from "@fortawesome/free-solid-svg-icons";

import { useStore } from "@/services/store";

const Account = () => {
  const logout = useStore((state) => state.logout);

  return (
    <View flex>
      <Stack.Screen options={{ headerShown: false }} />

      <View flex center gap-s5>
        <FontAwesomeIcon
          icon={fasUser}
          color={Colors.$iconDefault}
          size={128}
        />

        <Text text50>Meow</Text>

        <Button
          color={Colors.$textDefault}
          backgroundColor={Colors.grey20}
          label="Delogare"
          onPress={() => logout()}
        />
      </View>
    </View>
  );
};

export default Account;
