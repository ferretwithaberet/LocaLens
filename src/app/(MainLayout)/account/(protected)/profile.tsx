import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { View, Text, Button, Colors } from "react-native-ui-lib";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser as fasUser } from "@fortawesome/free-solid-svg-icons";

import { useStore } from "@/services/store";
import { getMeQueryOptions } from "@/services/react-query/resources/user";

const Account = () => {
  const logout = useStore((state) => state.logout);

  const meQuery = useQuery(getMeQueryOptions());

  return (
    <View flex>
      <Stack.Screen options={{ headerShown: false }} />

      <View flex center gap-s5>
        <FontAwesomeIcon
          icon={fasUser}
          color={Colors.$iconDefault}
          size={128}
        />

        <Text text50>
          {!meQuery.isFetching
            ? !meQuery.isError
              ? meQuery.data?.username
              : "Necunoscut"
            : "Se încarcă..."}
        </Text>

        <Button
          color={Colors.white}
          backgroundColor={Colors.grey20}
          label="Delogare"
          onPress={() => logout()}
        />
      </View>
    </View>
  );
};

export default Account;
