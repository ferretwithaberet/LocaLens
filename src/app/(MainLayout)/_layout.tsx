import { Tabs } from "expo-router";

const MainLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="(navigate)" options={{ title: "Navigate" }} />
      <Tabs.Screen name="account" options={{ title: "Account" }} />
    </Tabs>
  );
};

export default MainLayout;
