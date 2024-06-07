import { Stack } from "expo-router";

import { withProtected } from "@/utils/auth";

const AccountLayout = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Stack />
    </>
  );
};

export default withProtected(AccountLayout);
