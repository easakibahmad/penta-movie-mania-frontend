import MovieCard from "../../components/MovieCard";
import { useGetAllMoviesInRangeMutation } from "../../redux/features/movies/moviesApi";
import MovieLoader from "../../components/MovieLoader";
import BackToTopButton from "../../components/BackToTopButton";
import { IMovieData } from "../../types/Types";
import { formatDateString, scrollToTop } from "../../utils/Utils";
import Title from "../../components/Title";
import { useFetchAllMoviesInRange } from "../../custom_hooks/useFetchAllMoviesInRange";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const Movie = () => {
  const dateRange = useAppSelector((state: RootState) => state.dateRange);
  const startDate = formatDateString(dateRange.dateRange.startDate);
  const endDate = formatDateString(dateRange.dateRange.endDate);

  const [getAllMoviesInRange, { data, error }] =
    useGetAllMoviesInRangeMutation(); // Call the useGetAllMoviesInRangeMutation hook to fetch movies

  const { loadedData, loading, backToTopButton } = useFetchAllMoviesInRange(
    getAllMoviesInRange,
    error,
    data,
    startDate,
    endDate
  );

  return (
    <div className="px-4 pb-10 pt-6 bg-black text-white">
      <Title title="Latest Movies Just For You"></Title>
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
      {loading && (
        <div className={`flex justify-center mt-8`}>
          <MovieLoader />
        </div>
      )}

      {backToTopButton && (
        <BackToTopButton
          scrollToTop={scrollToTop}
          backToTopButton={backToTopButton}
        ></BackToTopButton>
      )}
    </div>
  );
};

export default Movie;
