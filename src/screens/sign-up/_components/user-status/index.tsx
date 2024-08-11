import { Image, StyleSheet, Text, View } from "react-native"
import React from "react"

import { Button } from "@/shared/ui-kit/button"
import { DEFAULT_COLORS } from "@/utils/constants/Colors"

// import { BarcodeScanningResult, useCameraPermissions } from "expo-camera/legacy";
import RejectImg from "#/images/sign-up/reject.png"
import SuccessImg from "#/images/sign-up/success.png"

interface Props {
  status: "success" | "reject"
  onPress: () => void
  title: string
}
export const UserStatus = ({ status, onPress, title }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={status === "success" ? SuccessImg : RejectImg} style={styles.img} />
      <Text style={styles.text}>{title}</Text>
      <Button onPress={onPress} label={status === "success" ? "Got it" : "Try again"} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: DEFAULT_COLORS.white
  },
  img: {
    width: 200,
    height: 200
  },
  text: {
    fontSize: 20,
    lineHeight: 24
  }
})
