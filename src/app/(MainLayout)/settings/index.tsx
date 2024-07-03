import { useEffect } from "react";
import { Stack } from "expo-router";
import { View, Button } from "react-native-ui-lib";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { Theme } from "@/utils/enums";
import {
  getUserSettingsQueryOptions,
  useUpdateUserSettingsMutation,
} from "@/services/react-query/resources/user-settings";
import SettingsForm from "@/components/forms/SettingsForm";
import QueryStateView from "@/components/common/QueryStateView";

type SettingsFormValues = {
  theme?: Theme;
  findClosestPoint?: Number;
  minimumRating?: Number;
};

const Settings = () => {
  const form = useForm<SettingsFormValues>({
    defaultValues: {
      theme: Theme.AUTO,
    },
  });

  const userSettingsQuery = useQuery(getUserSettingsQueryOptions());

  const updateUserSettingsMutation = useUpdateUserSettingsMutation();

  useEffect(() => {
    if (!userSettingsQuery.data) return;

    Object.entries(userSettingsQuery.data).map(([key, value]) =>
      form.setValue(key as any, value)
    );
  }, [userSettingsQuery.data]);

  return (
    <QueryStateView
      isLoading={userSettingsQuery.isLoading}
      isError={userSettingsQuery.isError}
    >
      {() => (
        <View flex padding-s4 paddingB-s8>
          <Stack.Screen options={{ title: "Setări" }} />

          <View flex>
            <View flex gap-s8>
              <SettingsForm form={form} />
            </View>

            <Button
              label="Salvează"
              onPress={form.handleSubmit((data) => {
                updateUserSettingsMutation.mutate({ payload: data });
              })}
            />
          </View>
        </View>
      )}
    </QueryStateView>
  );
};

export default Settings;
