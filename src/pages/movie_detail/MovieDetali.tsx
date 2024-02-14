import { useParams } from "react-router-dom";
import {
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
} from "../../redux/features/movies/movieDetailApi";
import MovieLoader from "../movie/movie_components/MovieLoader";
import NotFoundMessage from "./movie_detail_component/NotFoundMessage";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(movieId);
  const {
    data: credits,
    error: creditsError,
    isLoading: isCreditsLoading,
  } = useGetMovieCreditsQuery(movieId);

  if (isLoading || isCreditsLoading) {
    return (
      <div className="flex justify-center bg-black">
        <div className="py-10" style={{ height: "100vh" }}>
          <MovieLoader />
        </div>
      </div>
    );
  }

  if (error || creditsError) {
    return <NotFoundMessage></NotFoundMessage>;
  }

  if (!movie) {
    return <NotFoundMessage></NotFoundMessage>;
  }
  console.log(credits);
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>
        IMDb Link:{" "}
        <a
          href={`https://www.imdb.com/title/${movie.imdb_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-bold hover:underline"
        >
          {movie.title}
        </a>
      </p>
      <p>Rating: {movie.vote_average}</p>
      {movie.genres && (
        <div>
          <h3>Genres:</h3>
          <ul>
            {movie.genres.map((genre: { id: number; name: string }) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Add more details like cast and crew */}
    </div>
  );
};

export default MovieDetail;
