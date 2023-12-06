import { createSlice } from "@reduxjs/toolkit"
import { authenticateAsync } from "./thunks"

const initialState = {
  token: null,
  expiresAt: null,
  status: "idle",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(authenticateAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.token = action.payload.access_token
        state.expiresAt = Date.now() + action.payload.expires_in
      })
      .addCase(authenticateAsync.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { clear } = authSlice.actions
