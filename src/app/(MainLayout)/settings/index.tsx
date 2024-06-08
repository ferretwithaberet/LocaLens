import { Stack } from "expo-router";
import { View, SegmentedControl } from "react-native-ui-lib";
import { useForm, Controller } from "react-hook-form";

import { Theme } from "@/utils/enums";
import CustomField from "@/components/common/CustomField";

type SettingsFormValues = {
  theme: Theme;
  findClosestPoint?: Number;
  minimumRating?: Number;
};

const Settings = () => {
  const form = useForm<SettingsFormValues>({
    defaultValues: {
      theme: Theme.AUTO,
    },
  });

  return (
    <View padding-s4>
      <Stack.Screen options={{ title: "Setări" }} />

      <Controller
        name="theme"
        control={form.control}
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange } }) => (
          <CustomField label="Temă">
            <SegmentedControl
              initialIndex={value == null ? 0 : value - 1}
              segments={[
                { label: "Auto" },
                { label: "Luminos" },
                { label: "Întunecat" },
              ]}
              onChangeIndex={(index) => onChange(index + 1)}
            />
          </CustomField>
        )}
      />
    </View>
  );
};

export default Settings;
