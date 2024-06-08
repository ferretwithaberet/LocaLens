import {
  revokeAsync,
  DiscoveryDocument,
  TokenResponse,
  TokenResponseConfig,
  TokenTypeHint,
} from "expo-auth-session";
import { DateTime } from "luxon";

const AUTHORIZATION_SERVER = process.env
  .EXPO_PUBLIC_AUTHORIZATION_SERVER as string;

export const CLIENT_ID = "Lag630laEbpoEKixgj8JslGC0hOO0iu7gNKeNg8p";

export const discovery: DiscoveryDocument = {
  authorizationEndpoint: `${AUTHORIZATION_SERVER}/authorize/`,
  tokenEndpoint: `${AUTHORIZATION_SERVER}/token/`,
  revocationEndpoint: `${AUTHORIZATION_SERVER}/revoke_token/`,
  endSessionEndpoint: `${AUTHORIZATION_SERVER}/logout/`,
};

export const tokensToConfig = (
  tokens: TokenResponseConfig
): TokenResponseConfig => {
  const {
    accessToken,
    tokenType,
    expiresIn,
    refreshToken,
    scope,
    state,
    idToken,
    issuedAt,
  } = tokens;

  return {
    accessToken,
    tokenType,
    expiresIn,
    refreshToken,
    scope,
    state,
    idToken,
    issuedAt,
  };
};

export const revokeTokens = async (tokens: TokenResponseConfig) => {
  await revokeAsync(
    { token: tokens.accessToken, tokenTypeHint: TokenTypeHint.AccessToken },
    discovery
  );

  if (!tokens.refreshToken) return;

  await revokeAsync(
    { token: tokens.refreshToken, tokenTypeHint: TokenTypeHint.RefreshToken },
    discovery
  );
};

type RefreshTokenOptions = {
  minValiditySeconds?: Number;
};

export const refreshTokens = async (
  tokens: TokenResponseConfig,
  options?: RefreshTokenOptions
) => {
  const { minValiditySeconds = 60 } = options ?? {};

  const tokenResponse = TokenResponse.fromQueryParams(tokens);

  const expiryDate = DateTime.fromSeconds(tokenResponse.issuedAt).plus({
    seconds: tokenResponse.expiresIn,
  });

  if (expiryDate.diffNow("second").seconds < -minValiditySeconds)
    return tokenResponse;

  return await tokenResponse.refreshAsync(
    {
      clientId: CLIENT_ID,
    },
    discovery
  );
};
