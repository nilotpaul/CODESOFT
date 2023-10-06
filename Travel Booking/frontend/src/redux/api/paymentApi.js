import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/booking",
  }),
  endpoints: (builder) => ({
    createPaymentSession: builder.mutation({
      query: (price) => ({
        url: "/create-checkout-session",
        method: "POST",
        body: price,
      }),
    }),
  }),
});

export const { useCreatePaymentSessionMutation } = paymentApi;
