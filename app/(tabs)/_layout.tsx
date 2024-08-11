import { Tabs } from "expo-router"
import React from "react"

// import { SVGIcon } from "@/shared/ui-kit/svg-icon";
import { SVGIcon } from "@/shared/ui-kit/svg-icon"
import { DEFAULT_COLORS } from "@/utils/constants/Colors"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TabLayout() {
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: DEFAULT_COLORS.interior_blue,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: DEFAULT_COLORS.secondary_white,
          height: insets.bottom + 50,
          borderTopWidth: 0.5,
          position: "relative"
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Users",

          tabBarIcon: ({ color, focused }) => (
            <SVGIcon name="users_group" color={"red"} size={40} />
          )
        }}
      />
      <Tabs.Screen
        name="[...id]"
        options={{
          title: "Users",
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarIconStyle: { display: "none" }
        }}
      />
      <Tabs.Screen
        name="sign-up"
        options={{
          title: "Sign up",
          tabBarIcon: ({ color, focused }) => (
            <SVGIcon name="sign_in" color={"black"} size={40} />
          )
        }}
      />
    </Tabs>
  )
}
