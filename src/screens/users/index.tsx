import { WorkingRequest } from "@/shared/components/work-request";
import { ScreenContainer } from "@/shared/ui-kit/screen-container";
import { useLazyGetAllUsersQuery } from "@/store/services/users-api";
import { UsersResponse } from "@/types/users";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, StyleSheet, View } from "react-native";
import { NoUsers } from "./_components/no-users";
import { User } from "./_components/user";

export const Users = () => {
  const pageRef = useRef<number>(1);
  const [users, setUsers] = useState<UsersResponse["users"]>([]);
  const [getAllUsers, { data: usersData, isFetching: isUsersLoading }] = useLazyGetAllUsersQuery();
  const KEY_EXTRACTOR = useCallback((item: UsersResponse["users"][0]) => item.id.toString(), []);

  const loadMoreData = async (page: number) => {
    if (isUsersLoading) return;

    await getAllUsers({ count: 3, page })
      .unwrap()
      .then((res) => {
        setUsers((prev) => [...prev, ...res.users]);
      })
      .catch((e) => {
        console.log(e);

        Alert.alert("Something went wrong");
      });
  };

  const renderFooter = () => {
    if (!isUsersLoading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  return (
    <ScreenContainer>
      <WorkingRequest requestType="GET" />

      <View style={styles.usersContainer}>
        <FlashList
          data={users}
          numColumns={1}
          refreshing={isUsersLoading}
          nestedScrollEnabled={true}
          onEndReachedThreshold={0.1}
          progressViewOffset={Dimensions.get("window").width}
          indicatorStyle="white"
          contentContainerStyle={{ paddingBottom: 40 }}
          keyExtractor={KEY_EXTRACTOR} // MEMOIZED KEY LIBRARY REQUIRED
          showsVerticalScrollIndicator={false}
          estimatedItemSize={Dimensions.get("window").width}
          onLoad={() => loadMoreData(pageRef.current)} // STARTED IN FIRST LOADING
          onEndReached={() => loadMoreData((pageRef.current += 1))} // STARTED IN WHEN WE SCROLLING TO CENTER OF COMPONENT
          renderItem={({ item }) => <User user={item} />}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={() => (
            <View style={styles.emptyComponentContainer}>
              <NoUsers />
            </View>
          )}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  usersContainer: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 24,
  },
  emptyComponentContainer: {
    flex: 1,
    height: Dimensions.get("window").height - 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
