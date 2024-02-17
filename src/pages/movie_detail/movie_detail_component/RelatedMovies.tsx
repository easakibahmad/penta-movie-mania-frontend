/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetMoviesByGenresInRangeMutation } from "../../../redux/features/movies/moviesApi";
import { IMovieData } from "../../../types/Types";
import {
  twoMonthsAgoFormatted,
  yesterdayFormatted,
} from "../../../shared/nav_components/NavUtils";
import { formatDateString, scrollToTop } from "../../../utils/Utils";
import Title from "../../../components/Title";
import MovieLoader from "../../../components/MovieLoader";
import MovieCard from "../../../components/MovieCard";
import BackToTopButton from "../../../components/BackToTopButton";

const RelatedMovies = ({ genres, movieId }: any) => {
  const [getMoviesByGenresInRange, { data, error }] =
    useGetMoviesByGenresInRangeMutation(); // Call the useGetMoviesByGenresInRangeMutation hook to fetch movies

  const [loadedData, setLoadedData] = useState<IMovieData[]>([]);
  const [backToTopButton, setBackToTopButton] = useState(false); // State to control visibility of scroll button

  useEffect(() => {
    const startDate = formatDateString(twoMonthsAgoFormatted);
    const endDate = formatDateString(yesterdayFormatted);
    console.log(startDate, endDate);

    getMoviesByGenresInRange({ startDate, endDate, genres }); // Fetch movies by release date range and page
  }, [getMoviesByGenresInRange]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching movies:", error);
    }
  }, [error]);
  useEffect(() => {
    if (data && data.results) {
      const filteredMovies = data.results.filter(
        (movie: IMovieData) => Number(movie.id) !== Number(movieId)
      );
      setLoadedData(filteredMovies);
    }
  }, [data, movieId]);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop; // Show/hide back to top button based on scroll position

    if (scrollTop > 100) {
      setBackToTopButton(true);
    } else {
      setBackToTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="px-4 pb-10 pt-6 bg-black text-white">
      <Title title="Related Movies"></Title>
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

      {backToTopButton && (
        <BackToTopButton
          scrollToTop={scrollToTop}
          backToTopButton={backToTopButton}
        ></BackToTopButton>
      )}
    </div>
  );
};

export default RelatedMovies;
