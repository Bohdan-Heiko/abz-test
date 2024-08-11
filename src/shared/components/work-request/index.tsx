import { StyleSheet, Text, View } from "react-native"

import { DEFAULT_COLORS } from "@/utils/constants/Colors"

interface Props {
  requestType: "GET" | "POST"
}
export const WorkingRequest = ({ requestType }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Working with {requestType} request</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: DEFAULT_COLORS.primary,
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    lineHeight: 24,
    color: "text"
  }
})
