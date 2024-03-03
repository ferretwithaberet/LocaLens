import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "expo-router";
import { Colors, View } from "react-native-ui-lib";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCompass as fasCompass } from "@fortawesome/free-solid-svg-icons/faCompass";
import { faUser as fasUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faCog as fasCog } from "@fortawesome/free-solid-svg-icons/faCog";

type IconProps = {
  color: string;
  size: number;
};

const makeTabIcon = (icon: IconProp) => {
  return (props: IconProps) => (
    <FontAwesomeIcon icon={icon} color={props.color} size={props.size} />
  );
};

const MainLayout = () => {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60 },
        tabBarItemStyle: { paddingVertical: 5 },
        tabBarLabelStyle: { fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="account"
        options={{ title: t("tabs.account"), tabBarIcon: makeTabIcon(fasUser) }}
      />

      <Tabs.Screen
        name="(navigate)"
        options={{
          title: t("tabs.navigate"),
          tabBarIcon: (props) => (
            <View className="-mt-[24px]">
              <View
                bg-$outlineDefault
                className="absolute -top-[1px] -left-[1px] h-[70px] w-[70px] rounded-full"
              />

              <View
                bg-$backgroundElevated
                className=" absolute top-0 -left-[1px] mt-[24px] w-[70px] h-[70px]"
              />

              <View
                bg-$backgroundDefault
                style={{ borderColor: Colors.$backgroundElevated }}
                className="border-[10px] rounded-full"
              >
                <FontAwesomeIcon
                  icon={fasCompass}
                  color={props.color}
                  size={48}
                />
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{ title: t("tabs.settings"), tabBarIcon: makeTabIcon(fasCog) }}
      />
    </Tabs>
  );
};

export default MainLayout;
