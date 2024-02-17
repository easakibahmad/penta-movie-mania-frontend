import MovieCard from "../../components/MovieCard";
import MovieLoader from "../../components/MovieLoader";
import BackToTopButton from "../../components/BackToTopButton";
import { IMovieData } from "../../types/Types";
import { scrollToTop } from "../../utils/Utils";
import Title from "../../components/Title";
import { useParams } from "react-router-dom";
import { useFetchMoviesByGenre } from "../../custom_hooks/useFetchMoviesByGenre";
import { useGetMoviesByGenreMutation } from "../../redux/features/movies/moviesApi";

const IndividualGenre = () => {
  const [getMoviesByGenre, { data, error }] = useGetMoviesByGenreMutation();

  const { genreNameId } = useParams();
  const [genreId, genreName] = genreNameId!.split("&");
  const { loadedData, loading, backToTopButton } = useFetchMoviesByGenre(
    genreId,
    getMoviesByGenre,
    data,
    error
  );

  return (
    <div className="px-4 pb-10 pt-6 bg-black text-white">
      <Title title={`Latest ${genreName}`}></Title>
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

export default IndividualGenre;
