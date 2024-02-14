/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
} from "../../redux/features/movies/movieDetailApi";
import MovieLoader from "../movie/movie_components/MovieLoader";
import NotFoundMessage from "./movie_detail_component/NotFoundMessage";
import CastCard from "./movie_detail_component/CastCard";
import TitleDetails from "./movie_detail_component/TitleDetails";

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
  console.log(credits.crew);
  return (
    <div className="px-4 pb-10 pt-6 bg-black text-white">
      <div className="grid grid-cols-3 items-center">
        <div className="flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="h-96"
          />
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-4">
          <h2 className="text-4xl font-bold">{movie.title}</h2>
          <p className="text-sm">{movie.overview}</p>
          <p className="flex justify-start gap-4">
            <span className="font-bold"> IMDb Link:</span>
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold hover:underline"
            >
              {movie.title}
            </a>
          </p>
          <p className="flex justify-start gap-4">
            <span className="font-bold">Rating:</span> {movie.vote_average}
          </p>
          {movie.genres && (
            <div className="flex justify-start gap-4">
              <h3 className="font-bold">Genres:</h3>
              <ul className="flex justify-start gap-3">
                {movie.genres.map((genre: { id: number; name: string }) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="my-16">
        <TitleDetails title="Meet the Cast"></TitleDetails>
        <div className="grid grid-cols-4 gap-6">
          {credits.cast.map((item: any, index: any) => {
            // if (item.original_name && item.character && item.profile_path) {
            return (
              <CastCard
                key={index}
                actorName={item.original_name}
                characterName={item.character}
                imageUrl={item.profile_path}
              />
            );
            // } else {
            //   return null;
            // }
          })}
        </div>
      </div>
      <div className={`my-16`}>
        <TitleDetails title="Meet the Crew"></TitleDetails>
        <div className="grid grid-cols-4 gap-6">
          {credits.crew.map((item: any, index: any) => {
            // if (
            // item.original_name &&
            // item.known_for_department &&
            // item.profile_path
            // ) {
            return (
              <CastCard
                key={index}
                actorName={item.original_name}
                characterName={item.known_for_department}
                imageUrl={item.profile_path}
              />
            );
            // } else {
            //   return null;
            // }
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
