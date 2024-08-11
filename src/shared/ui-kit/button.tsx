import { Pressable, StyleSheet, Text } from "react-native"
import React from "react"

import { DEFAULT_COLORS } from "@/utils/constants/Colors"

interface Props {
  label: string
  disabled?: boolean
  onPress?: () => void
}
export const Button = ({ label, disabled, onPress }: Props) => {
  return (
    <Pressable
      style={[styles.container, disabled && styles.disabled]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          { color: disabled ? DEFAULT_COLORS.dark_gray : DEFAULT_COLORS.dark }
        ]}
      >
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 39,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: DEFAULT_COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 140
  },
  disabled: {
    backgroundColor: DEFAULT_COLORS.gray
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    color: DEFAULT_COLORS.dark
  }
})
