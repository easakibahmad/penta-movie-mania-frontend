import { useEffect, useState } from "react";
import { useGetMoviesByGenreMutation } from "../../../redux/features/movies/moviesApi";
import {
  twoMonthsAgo,
  yesterday,
} from "../../../shared/nav_components/NavUtils";
import { IMovieData } from "../movie_interface/Types";
import MovieCard from "./MovieCard";

const MovieGenre = () => {
  const [getMoviesByGenre, { data, error }] = useGetMoviesByGenreMutation();
  const [loadedData, setLoadedData] = useState<IMovieData[]>([]);

  useEffect(() => {
    const genreId = 878; 
    const startDate = new Date(twoMonthsAgo);
    const endDate = new Date(yesterday);

    getMoviesByGenre({ startDate, endDate, genreId });
  }, [getMoviesByGenre]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching movies:", error);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.results) {
      const shuffledResults = shuffleArray(data.results); // Shuffle the array of movie results

      const limitedResults = shuffledResults.slice(0, 5); // Select the first five shuffled movies
      setLoadedData(limitedResults);
    }
  }, [data]);

  const shuffleArray = (array: IMovieData[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div className="px-4 pb-10 pt-6 bg-black text-white">
      <div className="flex gap-2 items-center mb-6">
        <div className="h-8 w-1 bg-yellow-400"></div>
        <h1 className="text-xl font-bold">Genre</h1>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {loadedData.map((movie: IMovieData) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGenre;
