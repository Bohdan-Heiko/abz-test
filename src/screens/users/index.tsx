import { WorkingRequest } from "@/shared/components/work-request";
import { ScreenContainer } from "@/shared/ui-kit/screen-container";
import { StyleSheet, View } from "react-native";
import { User } from "./components/user";
// import { NoUsers } from "./components/no-users";

export const Users = () => {
  return (
    <ScreenContainer>
      <WorkingRequest requestType="GET" />
      {/* <NoUsers /> */}

      <View style={styles.usersContainer}>
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  usersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 24,
  },
});
