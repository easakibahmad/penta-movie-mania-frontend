import { useEffect, useState } from "react";
import { useGetMoviesByGenreMutation } from "../../../redux/features/movies/moviesApi";
import {
  twoMonthsAgo,
  yesterday,
} from "../../../shared/nav_components/NavUtils";
import GenreCard from "./GenreCard";
import MovieLoader from "../../../components/MovieLoader";
import { IMovieData } from "../../../types/Types";

type TGenreProps = {
  genreId: number;
  genreName: string;
};
const MovieGenre = ({ genreId, genreName }: TGenreProps) => {
  const [getMoviesByGenre, { data, error }] = useGetMoviesByGenreMutation();
  const [loadedData, setLoadedData] = useState<IMovieData[]>([]);

  useEffect(() => {
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

      const limitedResults = shuffledResults.slice(0, 6); // Select the first five shuffled movies
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
    <div className="px-4 pb-6 pt-6 bg-black text-white">
      <div className="flex gap-2 items-center mb-6">
        <div className="h-8 w-1 bg-yellow-400"></div>
        <h1 className="text-xl font-bold">Latest {genreName} </h1>
      </div>
      {!loadedData?.length && (
        <div className="flex justify-center">
          <div className="py-10" style={{ height: "100vh" }}>
            <MovieLoader />
          </div>
        </div>
      )}
      <div className="grid grid-cols-6 gap-6">
        {loadedData.map((movie: IMovieData, index: number) => (
          <GenreCard
            key={index}
            title={movie.title}
            posterPath={movie.poster_path}
            movieId={movie.id}
            releaseDate={movie.release_date}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGenre;
