/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
} from "../../redux/features/movies/movieDetailApi";
import MovieLoader from "../../components/MovieLoader";
import NotFoundMessage from "./movie_detail_component/NotFoundMessage";
import CastCard from "./movie_detail_component/CastCard";
import TitleDetails from "./movie_detail_component/TitleDetails";
import { StarOutlined } from "@ant-design/icons";
import React from "react";
import RelatedMovies from "./movie_detail_component/RelatedMovies";

interface IGenre {
  id: number;
  name: string;
}
const MovieDetail = () => {
  const { movieId } = useParams();
  const propsIdMovie = movieId;
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
  const genreIds: number[] = movie.genres.map((genre: IGenre) => genre.id);

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
            <span className="font-bold">Rating:</span>{" "}
            <span>
              <span className="text-yellow-500 mr-1">
                <StarOutlined />
              </span>
              {Math.round(movie.vote_average * 10) / 10}
            </span>
          </p>
          {movie.genres && (
            <div className="flex justify-start gap-4">
              <h3 className="font-bold">Genres:</h3>
              <ul className="flex justify-start gap-2">
                {movie.genres.map(
                  (genre: { id: number; name: string }, index: number) => (
                    <React.Fragment key={genre.id}>
                      <li>{genre.name}</li>
                      {index !== movie.genres.length - 1 && <span>|</span>}
                    </React.Fragment>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="my-16">
        <TitleDetails title="Meet the Cast"></TitleDetails>
        <div className="grid grid-cols-4 gap-6">
          {credits.cast.map((item: any, index: any) => {
            return (
              <CastCard
                key={index}
                actorName={item.original_name}
                characterName={item.character}
                imageUrl={item.profile_path}
              />
            );
          })}
        </div>
      </div>
      <div className={`my-16`}>
        <TitleDetails title="Meet the Crew"></TitleDetails>
        <div className="grid grid-cols-4 gap-6">
          {credits.crew.map((item: any, index: any) => {
            return (
              <CastCard
                key={index}
                actorName={item.original_name}
                characterName={item.known_for_department}
                imageUrl={item.profile_path}
              />
            );
          })}
        </div>
      </div>
      <RelatedMovies movieId={propsIdMovie} genres={genreIds}></RelatedMovies>
    </div>
  );
};

export default MovieDetail;
