import { useRef, useState } from "react"
import { Alert } from "react-native"

import { useLazyGetAllUsersQuery } from "@/store/services/users-api"
import { UsersResponse } from "@/types/users"
import { usePathname } from "expo-router"

interface ReturnData {
  users: UsersResponse["users"]
  pageRef: React.MutableRefObject<number>
  loadMoreData: (page: number) => Promise<void>
  isUsersLoading: boolean
}
export const useUserData = (): ReturnData => {
  const pageRef = useRef<number>(1)
  const pathname = usePathname()

  const [users, setUsers] = useState<UsersResponse["users"]>([])
  const [getAllUsers, { isFetching: isUsersLoading }] = useLazyGetAllUsersQuery()

  const loadMoreData = async (page: number) => {
    if (isUsersLoading) return

    await getAllUsers({ count: 6, page })
      .unwrap()
      .then((res) => {
        setUsers((prev) => [...prev, ...res.users])
      })
      .catch(() => Alert.alert("Something went wrong"))
  }

  // useEffect(() => {
  //   setUsers([])
  // }, [pathname])

  return {
    users,
    pageRef,
    loadMoreData,
    isUsersLoading
  }
}
