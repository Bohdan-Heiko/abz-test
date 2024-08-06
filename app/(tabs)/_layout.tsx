import { Tabs } from "expo-router";
import React from "react";

// import { SVGIcon } from "@/shared/ui-kit/svg-icon";
import { SVGIcon } from "@/shared/ui-kit/svg-icon";
import { DEFAULT_COLORS } from "@/utils/constants/Colors";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: DEFAULT_COLORS.interior_blue,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => <SVGIcon name="bell" color={"black"} size={30} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Sign up",
          tabBarIcon: ({ color, focused }) => <SVGIcon name="sign_in" color={"black"} size={40} />,
        }}
      />
    </Tabs>
  );
}
