import { StyleSheet, Text, View } from "react-native"
import React from "react"

import { DEFAULT_COLORS } from "@/utils/constants/Colors"
import { FontAwesome6 } from "@expo/vector-icons"

interface Props {
  title: string
  iconColor: string
  type: "group" | "profile"
}

export const TabBarElement = ({ title, iconColor, type }: Props) => {
  return (
    <View style={styles.container}>
      {type === "group" && <FontAwesome6 name="user-group" size={24} color={iconColor} />}
      {type === "profile" && (
        <FontAwesome6 name="user-circle" size={30} color={iconColor} />
      )}

      <Text style={[styles.text, { color: iconColor }]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: DEFAULT_COLORS.dark_gray
  }
})
