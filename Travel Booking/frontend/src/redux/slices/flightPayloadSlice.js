import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  from: "",
  to: "",
  depart: "",
  adult: "",
  children: "",
};

export const flightPayloadSlice = createSlice({
  name: "flightPayloadSlice",
  initialState,
  reducers: {
    setPayload: (state, action) => {
      state.adult = action.payload.adult;
      state.children = action.payload.children;
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.depart = action.payload.depart;
      state.type = action.payload.type;
    },
    resetPayload: () => {
      initialState;
    },
  },
});

export const { setPayload, resetPayload } = flightPayloadSlice.actions;

export default flightPayloadSlice.reducer;
