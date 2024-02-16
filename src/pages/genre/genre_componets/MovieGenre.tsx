import { useEffect, useState } from "react";
import { useGetMoviesByGenreMutation } from "../../../redux/features/movies/moviesApi";
import {
  twoMonthsAgo,
  yesterday,
} from "../../../shared/nav_components/NavUtils";
import MovieLoader from "../../../components/MovieLoader";
import { IMovieData } from "../../../types/Types";
import MovieCard from "../../../components/MovieCard";
import { RightOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

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
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <div className="h-8 w-1 bg-yellow-400"></div>
            <Link
              to={`/genre/${genreId + "&" + genreName}`}
              onClick={() => {
                 window.scrollTo({
                   top: 0,
                   behavior: "smooth",
                 });
              }}
              className="hover:text-blue-600 flex items-center gap-1 hover:underline text-xl font-bold"
            >
              Latest {genreName}
            </Link>
          </div>
          <Link
            to={`/genre/${genreId + "&" + genreName}`}
            onClick={() => {
               window.scrollTo({
                 top: 0,
                 behavior: "smooth",
               });
            }}
            className="text-blue-600 flex items-center gap-1 hover:underline text-md font-bold"
          >
            Explore More <RightOutlined />
          </Link>
        </div>
      </div>
      {loadedData?.length > 0 ? null : (
        <div className="flex justify-center">
          <div className="py-10" style={{ height: "100vh" }}>
            <MovieLoader />
          </div>
        </div>
      )}
      <div className="grid grid-cols-6 gap-6">
        {loadedData?.map((movie: IMovieData, index: number) => (
          <MovieCard
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
