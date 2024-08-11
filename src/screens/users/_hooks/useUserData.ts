import { Alert } from "react-native"
import { useRef, useState } from "react"

import { useLazyGetAllUsersQuery } from "@/store/services/users-api"
import { UsersResponse } from "@/types/users"

interface ReturnData {
  users: UsersResponse["users"]
  pageRef: React.MutableRefObject<number>
  loadMoreData: (page: number) => Promise<void>
  isUsersLoading: boolean
}
export const useUserData = (): ReturnData => {
  const pageRef = useRef<number>(1)
  const [users, setUsers] = useState<UsersResponse["users"]>([])
  const [getAllUsers, { isFetching: isUsersLoading }] = useLazyGetAllUsersQuery()

  const loadMoreData = async (page: number) => {
    if (isUsersLoading) return

    await getAllUsers({ count: 3, page })
      .unwrap()
      .then((res) => {
        setUsers((prev) => [...prev, ...res.users])
      })
      .catch(() => Alert.alert("Something went wrong"))
  }

  return {
    users,
    pageRef,
    loadMoreData,
    isUsersLoading
  }
}
