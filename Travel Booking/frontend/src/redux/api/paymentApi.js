import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/booking",
  }),
  endpoints: (builder) => ({
    createPaymentSession: builder.mutation({
      query: (paymentData) => ({
        url: "/create-checkout-session",
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const { useCreatePaymentSessionMutation } = paymentApi;
