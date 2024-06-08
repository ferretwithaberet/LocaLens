import { ScrollView } from "react-native";
import { View, Button } from "react-native-ui-lib";
import { Redirect, Stack } from "expo-router";
import { useAuthRequest, exchangeCodeAsync } from "expo-auth-session";

import { useStore, COMPUTED_IS_SIGNED_IN } from "@/services/store";
import { discovery, CLIENT_ID } from "@/services/auth";

const REDIRECT_URI = "localens://account/login";
const Login = () => {
  const isSignedIn = useStore(COMPUTED_IS_SIGNED_IN);
  const login = useStore((state) => state.login);
  const [request, , promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ["read", "write"],
      redirectUri: REDIRECT_URI,
    },
    discovery
  );

  if (isSignedIn) return <Redirect href="/account/profile" />;

  const handleLogin = async () => {
    if (!request) return;

    const response = await promptAsync();
    if (response.type !== "success") return;

    const tokens = await exchangeCodeAsync(
      {
        clientId: CLIENT_ID,
        scopes: ["read", "write"],
        code: response.params.code,
        extraParams: request.codeVerifier
          ? { code_verifier: request.codeVerifier }
          : undefined,
        redirectUri: REDIRECT_URI,
      },
      discovery
    );

    if (__DEV__) console.log("TOKENS", tokens);

    login(tokens);
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View flex centerV className="p-12">
        <Button
          label="Autentificare"
          disabled={!request}
          onPress={handleLogin}
        />
      </View>
    </ScrollView>
  );
};

export default Login;
