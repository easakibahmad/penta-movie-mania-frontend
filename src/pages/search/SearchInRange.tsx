import MovieCard from "../../components/MovieCard";
import { useGetAllMoviesInRangeMutation } from "../../redux/features/movies/moviesApi";
import MovieLoader from "../../components/MovieLoader";
import BackToTopButton from "../../components/BackToTopButton";
import { IMovieData } from "../../types/Types";
import Title from "../../components/Title";
import { useParams } from "react-router-dom";
import { scrollToTop } from "../../utils/Utils";
import { useFetchAllMoviesInRange } from "../../custom_hooks/useFetchAllMoviesInRange";

const SearchInRange = () => {
  const [getAllMoviesInRange, { data, error }] =
    useGetAllMoviesInRangeMutation();
  const { searchInRange } = useParams();

  const [startDateString, endDateString] = searchInRange!.split("&");
  const startDate: Date = new Date(startDateString);
  const endDate: Date = new Date(endDateString);

  const { loadedData, loading, backToTopButton } = useFetchAllMoviesInRange(
    getAllMoviesInRange,
    error,
    data,
    startDate,
    endDate
  );

  return (
    <div className="px-4 pb-10 pt-6 bg-black text-white">
      <Title
        title={`Find the newest movies released between ${startDate
          ?.toString()
          .slice(0, 16)} and ${endDate?.toString().slice(0, 16)}`}
      ></Title>
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

export default SearchInRange;
