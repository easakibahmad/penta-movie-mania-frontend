import { useEffect } from "react";
import { useGetMoviesByGenreMutation } from "../../redux/features/movies_by_genre/moviesByGenre";

const Movie = () => {
  // Call the useGetMoviesByGenreMutation hook to fetch movies
  const [getMoviesByGenre, { data, error, isLoading }] =
    useGetMoviesByGenreMutation();

  useEffect(() => {
    // Define the genre ID, start date, and end date for the movie query
    const genreId = 28;
    const startDate = new Date("2024-01-01");
    const endDate = new Date("2024-02-29");

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
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>This is the movie front page</div>
      )}
    </div>
  );
};

export default Movie;
