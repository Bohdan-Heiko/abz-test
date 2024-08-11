import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  token?: string
}

const initialState: AuthState = {
  token: ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNewToken(state, action) {
      state.token = action.payload
    }
  }
})

export const { setNewToken } = authSlice.actions

export default authSlice.reducer
