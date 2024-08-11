import { useMemo } from "react"

import { useAppDispatch } from "@/store"
import { setNewToken } from "@/store/slices/auth"
import { bindActionCreators } from "@reduxjs/toolkit"

const rootActions = {
  setNewToken
}

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
