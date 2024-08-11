import { Tabs } from "expo-router"
import React from "react"

// import { SVGIcon } from "@/shared/ui-kit/svg-icon";
import { TabBarElement } from "@/shared/components/tab-bar-element"
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
          title: "",

          tabBarIcon: ({ color, focused }) => (
            <TabBarElement
              title="Users"
              type="group"
              iconColor={focused ? DEFAULT_COLORS.primary_blue : DEFAULT_COLORS.dark_gray}
            />
          )
        }}
      />

      <Tabs.Screen
        name="sign-up"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarElement
              title="Sign up"
              type="profile"
              iconColor={focused ? DEFAULT_COLORS.primary_blue : DEFAULT_COLORS.dark_gray}
            />
          )
        }}
      />
    </Tabs>
  )
}
