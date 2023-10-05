import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import userSlice from "./slices/userSlice";
import authModalSlice from "./slices/authModalSlice";
import flightPayload from "./slices/flightPayloadSlice";
import { flightApi } from "./api/flightApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [flightApi.reducerPath]: flightApi.reducer,
    userSlice,
    authModalSlice,
    flightPayload,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(flightApi.middleware),
});
