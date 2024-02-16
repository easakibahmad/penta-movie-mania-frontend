import { baseApi } from "../../api/api";

const getMoviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMoviesByGenre: builder.mutation({
      query: ({ genreId }) => ({
        url: "/discover/movie",
        method: "GET",
        params: {
          api_key: "7139d17951e650bc10c901e57350fd65",
          with_genres: genreId,
          sort_by: "popularity.desc", // Sort by popularity to get random movies
          page: 1, // We only need the first page as we're getting random movies
        },
      }),
    }),

    getAllMoviesInRange: builder.mutation({
      query: ({ startDate, endDate, page }) => ({
        url: "/discover/movie",
        method: "GET",
        params: {
          api_key: "7139d17951e650bc10c901e57350fd65", // My TMDB API key
          "primary_release_date.gte": startDate.toISOString(), // Start date for the movie release range
          "primary_release_date.lte": endDate.toISOString(), // End date for the movie release range
          page, // for pagination purpose to load data smoothly
        },
      }),
    }),

    getMoviesByGenresInRange: builder.mutation({
      query: ({ genres, startDate, endDate }) => ({
        url: "/discover/movie",
        method: "GET",
        params: {
          api_key: "7139d17951e650bc10c901e57350fd65",
          with_genres: genres.join("|"),
          "primary_release_date.gte": startDate.toISOString(),
          "primary_release_date.lte": endDate.toISOString(),
        },
      }),
    }),
  }),
});

export const {
  useGetMoviesByGenreMutation,
  useGetAllMoviesInRangeMutation,
  useGetMoviesByGenresInRangeMutation,
} = getMoviesApi;
