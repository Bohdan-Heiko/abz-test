import { useMemo } from "react"

import { useAppDispatch } from "@/store"
import { setNewToken } from "@/store/slices/auth"
import { setCreatedUserId } from "@/store/slices/user"
import { bindActionCreators } from "@reduxjs/toolkit"

const rootActions = {
  setNewToken,
  setCreatedUserId
}

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
