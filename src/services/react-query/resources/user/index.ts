import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/services/axios";

export type MeData = {
  username: string;
};

export const getMe = async () => {
  const res = await apiClient.get<MeData>("/me/");

  return res.data;
};

export const getMeQueryOptions = () =>
  queryOptions({
    queryKey: ["user", "me"],
    queryFn: () => getMe(),
  });
