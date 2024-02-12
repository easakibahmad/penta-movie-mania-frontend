/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useGetMoviesByGenreMutation } from "../../redux/features/movies_by_genre/moviesByGenre";
import { twoMonthsAgo, yesterday } from "../../shared/nav_components/NavUtils";
import MovieCard from "./movie_components/MovieCard";

const Movie = () => {
  // Call the useGetMoviesByGenreMutation hook to fetch movies
  const [getMoviesByGenre, { data, error, isLoading }] =
    useGetMoviesByGenreMutation();

  useEffect(() => {
    // Define the genre ID, start date, and end date for the movie query
    const genreId = 28;
    const startDate = new Date(twoMonthsAgo);
    const endDate = new Date(yesterday);
    // console.log(startDate, endDate);

    // Fetch movies by genre and release date range
    getMoviesByGenre({ genreId, startDate, endDate });
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching movies:", error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      console.log("Movies fetched successfully:", data);
    }
  }, [data]);

  return (
    <div className="px-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-5 gap-6">
          {data &&
            data.results &&
            data.results.map((movie:any) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Movie;
