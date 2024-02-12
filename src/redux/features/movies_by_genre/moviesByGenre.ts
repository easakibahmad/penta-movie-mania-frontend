import { baseApi } from "../../api/api";

const createGetMoviesByGenreApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMoviesByGenre: builder.mutation({
      query: ({ genreId, startDate, endDate ,page}) => ({
        url: "/discover/movie",
        method: "GET",
        params: {
          api_key: "7139d17951e650bc10c901e57350fd65", // My TMDB API key
          "primary_release_date.gte": startDate.toISOString(), // Start date for the movie release range
          "primary_release_date.lte": endDate.toISOString(), // End date for the movie release range
          with_genres: genreId, // Include the genre ID to filter movies by genre
          page
        },
      }),
    }),
  }),
});

export const { useGetMoviesByGenreMutation } = createGetMoviesByGenreApi;
