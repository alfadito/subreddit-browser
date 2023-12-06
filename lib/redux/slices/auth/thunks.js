import { createAsyncThunk } from "@reduxjs/toolkit"
import { authenticate } from "./authAPI"

export const authenticateAsync = createAsyncThunk(
  "auth/authenticate",
  async () => {
    const response = await authenticate();
    return await response.json()
  },
)