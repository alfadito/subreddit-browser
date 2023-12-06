import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  votes: {},
}

export const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    vote: (state, action) => {
      state.votes[action.payload.id] = action.payload.value
    }
  },
})

export const { clear } = voteSlice.actions
