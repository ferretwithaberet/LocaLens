import { Redirect } from "expo-router";

import { useStore, COMPUTED_IS_SIGNED_IN } from "@/services/store";

export const withProtected = <P extends Object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ProtectedComponent = (props: P) => {
    const isSignedIn = useStore(COMPUTED_IS_SIGNED_IN);

    if (!isSignedIn) return <Redirect href="/account/login" />;

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};
