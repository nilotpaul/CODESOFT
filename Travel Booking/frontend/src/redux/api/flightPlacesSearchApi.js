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

    createOneWayFlightSearch: builder.mutation({
      query: (payload) => ({
        method: "POST",
        url: "/api/flight/create",
        body: payload,
        cache: "force-cache",
      }),
    }),
  }),
});

export const {
  useGetPlacesSearchMutation,
  useCreateOneWayFlightSearchMutation,
} = flightPlacesSearchApi;
