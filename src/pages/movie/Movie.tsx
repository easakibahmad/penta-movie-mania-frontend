import { useEffect, useState } from "react";
import MovieCard from "./movie_components/MovieCard";
import { IMovieData } from "./movie_interface/Types";
import { useGetAllMoviesInRangeMutation } from "../../redux/features/movies/moviesApi";
import MovieLoader from "./movie_components/MovieLoader";
import { ArrowUpOutlined } from "@ant-design/icons";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { formatDateString } from "./movie_utils/utils";

const Movie = () => {
  const [getAllMoviesInRange, { data, error }] =
    useGetAllMoviesInRangeMutation(); // Call the useGetAllMoviesInRangeMutation hook to fetch movies

  const [page, setPage] = useState(1);
  const [loadedData, setLoadedData] = useState<IMovieData[]>([]);
  const [loading, setLoading] = useState(false);
  const [backToTopButton, setBackToTopButton] = useState(false); // State to control visibility of scroll button

  const dateRange = useSelector((state: RootState) => state.dateRange);

  useEffect(() => {
    const startDate = formatDateString(dateRange.dateRange.startDate);
    const endDate = formatDateString(dateRange.dateRange.endDate);
    console.log(startDate, endDate);

    getAllMoviesInRange({ startDate, endDate, page }); // Fetch movies by release date range and page
  }, [getAllMoviesInRange, page, dateRange]);

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
      <div className="flex gap-2 items-center mb-6">
        <div className="h-8 w-1 bg-yellow-400"></div>
        <h1 className="text-xl font-bold">Latest Movies Just For You</h1>
      </div>
      {!loadedData?.length && (
        <div className="flex justify-center">
          <div className="py-10" style={{ height: "100vh" }}>
            <MovieLoader />
          </div>
        </div>
      )}
      <div className="grid grid-cols-5 gap-6">
        {loadedData.map((movie: IMovieData, index: number) => (
          <MovieCard
            key={index}
            title={movie.title}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
      {loading && (
        <div className={`flex justify-center mt-8`}>
          <MovieLoader />
        </div>
      )}

      {backToTopButton && (
        <div className="flex justify-center">
          <button
            className="fixed top-10  bg-white text-black px-4 py-1 text-sm rounded-full shadow-lg transition-opacity duration-1000 ease-in-out hover:opacity-100 hover:bg-blue-500 hover:text-white"
            onClick={scrollToTop}
            style={{ opacity: backToTopButton ? 1 : 0 }}
          >
            <ArrowUpOutlined style={{ marginRight: "5px" }} />
            Back to Top
          </button>
        </div>
      )}
    </div>
  );
};

export default Movie;
