import { SafeAreaView, StyleSheet, View, ViewProps } from "react-native"

import { DEFAULT_COLORS } from "@/utils/constants/Colors"

export const ScreenContainer: React.FC<ViewProps> = ({ style, ...restProps }) => {
  return (
    <SafeAreaView style={styles.flex1}>
      <View style={[styles.container, style]} {...restProps} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  container: {
    overflow: "visible",
    flex: 1,
    flexGrow: 1,
    backgroundColor: DEFAULT_COLORS.white
  }
})
