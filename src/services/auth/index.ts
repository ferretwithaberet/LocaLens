import {
  revokeAsync,
  DiscoveryDocument,
  TokenResponseConfig,
  TokenTypeHint,
} from "expo-auth-session";

const AUTHORIZATION_SERVER = process.env
  .EXPO_PUBLIC_AUTHORIZATION_SERVER as string;

export const CLIENT_ID = "C7m7GXp2ytFXwspefXizRycD318nq1rlhuXV2S05";

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
