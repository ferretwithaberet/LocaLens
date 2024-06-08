import axios, { InternalAxiosRequestConfig } from "axios";

import { useStore } from "@/services/store";

export const apiClient = axios.create({});

const addTokenToAxiosConfig = (config: InternalAxiosRequestConfig) => {
  if (config?.headers?.authorization) return config;

  const { tokens } = useStore.getState();
  if (!tokens) return config;

  const { tokenType, accessToken } = tokens;
  if (!accessToken) return config;

  config.headers.setAuthorization(`${tokenType} ${accessToken}`, true);

  return config;
};

axios.interceptors.request.use(async (config) => {
  const { refreshTokens } = useStore.getState();
  await refreshTokens();

  const newConfig = addTokenToAxiosConfig(config);

  return newConfig;
});
