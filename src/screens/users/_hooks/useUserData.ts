import { useEffect, useRef, useState } from "react"
import { Alert } from "react-native"

import { useActions } from "@/shared/hooks/use-actions"
import { useAppSelector } from "@/store"
import { useGetUserByIdQuery, useLazyGetAllUsersQuery } from "@/store/services/users-api"
import { UsersResponse } from "@/types/users"

interface ReturnData {
  users: UsersResponse["users"]
  pageRef: React.MutableRefObject<number>
  loadMoreData: (page: number) => Promise<void>
  isUsersLoading: boolean
}
export const useUserData = (): ReturnData => {
  const pageRef = useRef<number>(1) // STARTED IN FIRST LOADING
  const { setCreatedUserId } = useActions()
  const { id: createdUserid } = useAppSelector((state) => state.user)

  const [users, setUsers] = useState<UsersResponse["users"]>([])

  const [getAllUsers, { isFetching: isUsersLoading }] = useLazyGetAllUsersQuery()
  const { data: onUserData } = useGetUserByIdQuery(createdUserid, {
    skip: !createdUserid
  })

  // LOAD MORE USER DATA
  const loadMoreData = async (page: number) => {
    if (isUsersLoading) return

    await getAllUsers({ count: 6, page })
      .unwrap()
      .then((res) => {
        setUsers((prev) => [...prev, ...res.users])
      })
      .catch(() => Alert.alert("Something went wrong"))
  }

  // SET CREATED USER BY ID
  useEffect(() => {
    if (onUserData?.success) {
      setUsers((prev) => [onUserData.user, ...prev])
      setCreatedUserId("")
    }
  }, [onUserData?.success])

  return {
    users,
    pageRef,
    loadMoreData,
    isUsersLoading
  }
}
