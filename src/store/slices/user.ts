import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  id?: string
}

const initialState: AuthState = {
  id: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCreatedUserId(state, action) {
      state.id = action.payload
    }
  }
})

export const { setCreatedUserId } = userSlice.actions

export default userSlice.reducer
