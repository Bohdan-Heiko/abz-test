import { SVGIcon } from "@/shared/ui-kit/svg-icon";
import { StyleSheet, Text, View } from "react-native";
export const NoUsers = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <SVGIcon name="users_main_group" size={200} color="black" />
        <Text style={styles.text}>There are no users yet</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    gap: 24,
  },
  text: {
    fontSize: 24,
  },
});
