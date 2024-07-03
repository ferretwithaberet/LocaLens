import { DefaultError, queryOptions, useMutation } from "@tanstack/react-query";

import { Theme } from "@/utils/enums";
import { apiClient } from "@/services/axios";
import { queryClient } from "../..";

export type UserSettingsData = {
  theme: Theme;
  find_closest_point: number | null;
  minimum_rating: number | null;
};

export const getUserSettings = async () => {
  const res = await apiClient.get<UserSettingsData>("/user-settings/");

  return res.data;
};

export const getUserSettingsQueryOptions = () =>
  queryOptions({
    queryKey: ["user-settings"],
    queryFn: () => getUserSettings(),
  });

export const updateUserSettings = async (
  payload: Partial<UserSettingsData>
) => {
  await apiClient.patch<UserSettingsData>("/user-settings/", payload);
};

export const useUpdateUserSettingsMutation = () =>
  useMutation<void, DefaultError, { payload: Partial<UserSettingsData> }>({
    mutationFn: async ({ payload }) => updateUserSettings(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user-settings"] }),
  });
