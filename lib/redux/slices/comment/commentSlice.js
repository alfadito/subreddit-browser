import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: {},
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    comment: (state, action) => {
      state.comments[action.payload.id] = [
        action.payload.value,
        ...(state.comments[action.payload.id] || []),
      ];
    },
  },
});

export const { clear } = commentSlice.actions;
