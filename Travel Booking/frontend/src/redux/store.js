import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import userSlice from "./slices/userSlice";
import authModalSlice from "./slices/authModalSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    userSlice,
    authModalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
