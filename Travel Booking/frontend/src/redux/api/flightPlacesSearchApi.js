import { flightApi } from "./flightApi";

export const flightPlacesSearchApi = flightApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlacesSearch: builder.mutation({
      query: (query) => ({
        method: "POST",
        url: "/api/flight/query",
        body: query,
        cache: "force-cache",
      }),
    }),

    createOneWayFlightSearch: builder.query({
      query: ({ from, to, depart, adult, children }) => ({
        url: `/api/flight/create?from=${from}&to=${to}&depart=${depart}&adult=${adult}&children=${children}`,
        cache: "force-cache",
      }),
    }),
  }),
});

export const { useGetPlacesSearchMutation, useCreateOneWayFlightSearchQuery } =
  flightPlacesSearchApi;
