import { useGetMoviesByGenreMutation } from "../../../redux/features/movies/moviesApi";
import MovieLoader from "../../../components/MovieLoader";
import { IMovieData } from "../../../types/Types";
import MovieCard from "../../../components/MovieCard";
import { RightOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

import { useShuffledMoviesByGenre } from "../../../custom_hooks/useShuffleMoviesByGenre";

type TGenreProps = {
  genreId: number;
  genreName: string;
};
const MovieGenre = ({ genreId, genreName }: TGenreProps) => {
  const [getMoviesByGenre, { data, error }] = useGetMoviesByGenreMutation();
  const limit = 6;
  const { loadedData } = useShuffledMoviesByGenre(
    genreId,
    limit,
    getMoviesByGenre,
    data,
    error
  );

  return (
    <div className="px-4 pb-6 pt-6 bg-black text-white">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <div className="h-8 w-1 bg-yellow-400"></div>
            <Link
              to={`/genre/${genreId + "&" + genreName}`}
              onClick={(event) => {
                event.preventDefault();
                const href = event.currentTarget.getAttribute("href");
                if (href) {
                  setTimeout(() => {
                    window.location.href = href;
                  }, 500);
                }
              }}
              className="hover:text-blue-600 sm:text-xl text-md flex items-center gap-1 hover:underline  font-bold"
            >
              Latest {genreName}
            </Link>
          </div>
          <Link
            to={`/genre/${genreId + "&" + genreName}`}
            onClick={(event) => {
              event.preventDefault();
              const href = event.currentTarget.getAttribute("href");
              if (href) {
                setTimeout(() => {
                  window.location.href = href;
                }, 500);
              }
            }}
            className="text-blue-600 text-sm flex items-center gap-1 hover:underline sm:text-md font-bold"
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
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
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
