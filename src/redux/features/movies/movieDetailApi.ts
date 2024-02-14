import { baseApi } from "../../api/api";

const getMoviesByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovieById: builder.query({
      query: (movieId) => ({
        url: `/movie/${movieId}`,
        method: "GET",
        params: {
          api_key: "7139d17951e650bc10c901e57350fd65",
        },
      }),
    }),
    getMovieCredits: builder.query({
      query: (movieId) => ({
        url: `/movie/${movieId}/credits`,
        method: "GET",
        params: {
          api_key: "7139d17951e650bc10c901e57350fd65",
        },
      }),
    }),
  }),
});

export const { useGetMovieByIdQuery, useGetMovieCreditsQuery } =
  getMoviesByIdApi;
