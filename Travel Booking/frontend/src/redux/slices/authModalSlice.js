import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const authModalSclice = createSlice({
  initialState,
  name: "authModalSlice",
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen } = authModalSclice.actions;

export default authModalSclice.reducer;
