import { StyleSheet, View, ViewProps } from "react-native"

import { DEFAULT_COLORS } from "@/utils/constants/Colors"
import { SafeAreaView } from "react-native-safe-area-context"

export const ScreenContainer: React.FC<ViewProps> = ({ style, ...restProps }) => {
  return (
    <SafeAreaView style={styles.flex1}>
      <View style={[styles.container, style]} {...restProps} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: DEFAULT_COLORS.white
  },
  container: {
    overflow: "visible",
    flex: 1,
    flexGrow: 1,
    backgroundColor: DEFAULT_COLORS.white
  }
})
