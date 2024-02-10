import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/", 
    prepareHeaders(headers) {
      headers.set("Authorization", `Bearer 7139d17951e650bc10c901e57350fd65`); // Append API key to the 'Authorization' header
      return headers;
    },
  }),
  endpoints: () => ({}),
});
