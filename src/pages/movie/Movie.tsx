/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useGetMoviesByGenreMutation } from "../../redux/features/movies_by_genre/moviesByGenre";
import { twoMonthsAgo, yesterday } from "../../shared/nav_components/NavUtils";
import MovieCard from "./movie_components/MovieCard";
import { IMovieData } from "./movie_interface/Types";
import MovieLoader from "./movie_components/MovieLoader";

const Movie = () => {
  // Call the useGetMoviesByGenreMutation hook to fetch movies
  const [getMoviesByGenre, { data, error, isLoading }] =
    useGetMoviesByGenreMutation();

  const [page, setPage] = useState(1);
  const [loadedData, setLoadedData] = useState<IMovieData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Define the genre ID, start date, and end date for the movie query
    const genreId = 18;
    const startDate = new Date(twoMonthsAgo);
    const endDate = new Date(yesterday);

    // Fetch movies by genre, release date range and page
    getMoviesByGenre({ genreId, startDate, endDate, page });
  }, [getMoviesByGenre, page]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching movies:", error);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.results) {
      // Update loadedData with newly fetched data
      setLoadedData((prevData) => [...prevData, ...data.results]);
      setLoading(false);
    }
  }, [data]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(loadedData);
  return (
    <div className="px-4 my-10">
      <div className="grid grid-cols-5 gap-6">
        {loadedData.map((movie: IMovieData) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {loading && <MovieLoader />}
      </div>

      {/* )} */}
    </div>
  );
};

export default Movie;
