import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { DEFAULT_COLORS } from "@/utils/constants/Colors";

interface CheckBoxProps {
  isChecked: boolean;
  variant?: "ios" | "android";
  disabled?: boolean;
  onPress: () => void;
}

export const CheckBox = ({ isChecked, onPress, disabled, variant = "ios" }: CheckBoxProps) => {
  return (
    <Pressable
      style={[
        styles.container,
        variant === "android" && styles.androidCheckContainer,
        {
          width: variant === "ios" ? 14 : 20,
          borderRadius: variant === "ios" ? 7 : 10,
        },
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      {isChecked && (
        <View style={[styles.checkItem, variant === "android" && styles.androidCheckItem]}></View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    aspectRatio: 1,
    borderColor: DEFAULT_COLORS.gray,
  },
  checkItem: {
    width: 14,
    height: 14,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 5,
    borderColor: DEFAULT_COLORS.secondary,
  },
  squareCheckItem: {
    width: 18,
    height: 18,
    borderRadius: 3,
  },

  androidCheckContainer: {
    borderWidth: 2,
    borderColor: DEFAULT_COLORS.secondary,
  },

  androidCheckItem: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: DEFAULT_COLORS.secondary,
  },
});
