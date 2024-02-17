/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
} from "../../redux/features/movies/movieDetailApi";
import MovieLoader from "../../components/MovieLoader";
import NotFoundMessage from "./movie_detail_component/NotFoundMessage";
import TitleDetails from "./movie_detail_component/TitleDetails";
import { StarOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import RelatedMovies from "./movie_detail_component/RelatedMovies";
import GroupCard from "../../components/GroupCard";
import CastCard from "./movie_detail_component/CastCard";

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
  const [startIndex, setStartIndex] = useState(0);
  const [crewIndex, setCrewIndex] = useState(0);

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
  const handleNext = () => {
    setStartIndex(startIndex + 6);
  };

  const handlePrev = () => {
    setStartIndex(startIndex - 6);
  };
  const handleNextCrew = () => {
    setCrewIndex(crewIndex + 6);
  };

  const handlePrevCrew = () => {
    setCrewIndex(crewIndex - 6);
  };
  return (
    <div className="px-4 pb-10 pt-6 bg-black text-white">
      <div className="grid md:grid-cols-3 grid-cols-1 items-center gap-4">
        <div className="flex md:justify-end justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="sm:h-96 h-72"
          />
        </div>
        <div className="col-span-2 grid grid-cols-1 sm:gap-4 gap-2 md:mr-36 sm:mr-10 mr-0">
          <h2 className="md:text-4xl sm:text-xl text-md font-bold">
            {movie.title}
          </h2>
          <p className="text-sm">{movie.overview}</p>
          <p className="flex justify-start items-center gap-4">
            <span className="font-bold text-sm md:text-md"> IMDb Link:</span>
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
            <span className="font-bold text-sm md:text-md">Rating:</span>{" "}
            <span>
              <span className="text-yellow-500 mr-1">
                <StarOutlined />
              </span>
              {Math.round(movie.vote_average * 10) / 10}
            </span>
          </p>
          {movie.genres && (
            <div className="flex justify-start items-center gap-4">
              <h3 className="font-bold text-sm md:text-md">Genres:</h3>
              <ul className="flex justify-start items-center gap-2">
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
        <div className="lg:flex hidden">
          <TitleDetails title="Meet the Cast"></TitleDetails>
        </div>
        <div className="lg:hidden flex">
          <TitleDetails title="Meet the Top Cast"></TitleDetails>
        </div>
        <div className="grid lg:hidden  md:grid-cols-4 sm:grid-cols-3 grid-cols-2 col-span-8 gap-6">
          {credits?.cast.slice(0, 10).map((item: any, index: any) => {
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
        <div className="lg:flex hidden">
          <GroupCard
            type={credits?.cast}
            handlePrev={handlePrev}
            startIndex={startIndex}
            handleNext={handleNext}
          ></GroupCard>
        </div>
      </div>
      <div className={`my-16`}>
        <div className="lg:flex hidden">
          <TitleDetails title="Meet the Crew"></TitleDetails>
        </div>
        <div className="lg:hidden flex">
          <TitleDetails title="Meet the Top Crew"></TitleDetails>
        </div>
        <div className="grid lg:hidden  md:grid-cols-4 sm:grid-cols-3 grid-cols-2 col-span-8 gap-6">
          {credits?.crew.slice(0, 10).map((item: any, index: any) => {
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
        <div className="lg:flex hidden">
          <GroupCard
            type={credits?.crew}
            handlePrev={handlePrevCrew}
            startIndex={crewIndex}
            handleNext={handleNextCrew}
          ></GroupCard>
        </div>
      </div>
      <RelatedMovies movieId={propsIdMovie} genres={genreIds}></RelatedMovies>
    </div>
  );
};

export default MovieDetail;
