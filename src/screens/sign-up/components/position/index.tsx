import { CheckBox } from "@/shared/ui-kit/check-box";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

interface Props {
  position: string;
}
export const Position = ({ position }: Props) => {
  return (
    <View style={styles.container}>
      <CheckBox onPress={() => {}} isChecked={false} />
      <Text style={styles.text}>{position}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 22,
    alignItems: "center",
    paddingVertical: Platform.OS === "ios" ? 17 : 14,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});
