import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import { useGetAllMoviesInRangeMutation } from "../../redux/features/movies/moviesApi";
import MovieLoader from "../../components/MovieLoader";
import BackToTopButton from "../../components/BackToTopButton";
import { IMovieData } from "../../types/Types";
import Title from "../../components/Title";
import { useParams } from "react-router-dom";

const SearchInRange = () => {
  const [getAllMoviesInRange, { data, error }] =
    useGetAllMoviesInRangeMutation(); // Call the useGetAllMoviesInRangeMutation hook to fetch movies
  const { searchInRange } = useParams();

  const [startDateString, endDateString] = searchInRange!.split("&");
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const [page, setPage] = useState(1);
  const [loadedData, setLoadedData] = useState<IMovieData[]>([]);
  const [loading, setLoading] = useState(false);
  const [backToTopButton, setBackToTopButton] = useState(false); // State to control visibility of scroll button

  useEffect(() => {
    console.log(startDate, endDate);

    getAllMoviesInRange({ startDate, endDate, page }); // Fetch movies by release date range and page
  }, [getAllMoviesInRange, page]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching movies:", error);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.results) {
      setLoadedData((prevData) => [...prevData, ...data.results]); // Update loadedData with newly fetched data

      setLoading(false);
    }
  }, [data]);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop; // Show/hide back to top button based on scroll position

    if (scrollTop > 100) {
      setBackToTopButton(true);
    } else {
      setBackToTopButton(false);
    }

    if (
      window.innerHeight + scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1); // Load more movies if user reaches bottom
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    }); // Scroll to the top when back to button is clicked
  };

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
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
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
