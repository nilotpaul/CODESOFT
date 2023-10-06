import { createSlice } from "@reduxjs/toolkit";

const lc = window.localStorage?.getItem("payload")
  ? JSON.parse(window.localStorage?.getItem("payload"))
  : "";

const initialState = {
  type: lc?.type ?? "",
  from: lc?.from ?? "",
  to: lc?.to ?? "",
  depart: lc?.depart ?? "",
  adult: lc?.adult ?? "",
  children: lc?.children ?? "",
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
      window.localStorage.setItem("payload", JSON.stringify(action.payload));
    },
    resetPayload: () => {
      window.localStorage.removeItem("payload");
      initialState;
    },
  },
});

export const { setPayload, resetPayload } = flightPayloadSlice.actions;

export default flightPayloadSlice.reducer;
