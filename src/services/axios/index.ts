import axios, { InternalAxiosRequestConfig } from "axios";

import { BACKEND_URI } from "@/utils/constants";
import { useStore } from "@/services/store";

const API_URI = `${BACKEND_URI}/api`;

export const apiClient = axios.create({
  baseURL: API_URI,
});

const addTokenToAxiosConfig = (config: InternalAxiosRequestConfig) => {
  if (config?.headers?.authorization) return config;

  const { tokens } = useStore.getState();
  if (!tokens) return config;

  const { tokenType, accessToken } = tokens;
  if (!accessToken) return config;

  config.headers.setAuthorization(`${tokenType} ${accessToken}`, true);

  return config;
};

apiClient.interceptors.request.use(async (config) => {
  const { refreshTokens } = useStore.getState();
  await refreshTokens();

  const newConfig = addTokenToAxiosConfig(config);

  return newConfig;
});
