import { Navigate, createBrowserRouter } from "react-router-dom";
import Movie from "../pages/movie/Movie";
import MovieLayout from "../layout/MovieLayout";
import MovieDetail from "../pages/movie_detail/MovieDetali";
import Genre from "../pages/genre/Genre";
import SearchInRange from "../pages/search/SearchInRange";
import IndividualGenre from "../pages/individual_genre/IndividualGenre";
import WatchList from "../pages/watch_list/WatchList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieLayout></MovieLayout>,
    children: [
      {
        path: "/",
        element: <Navigate to="movie" replace />,
      },
      {
        path: "movie",
        element: <Movie></Movie>,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetail />,
      },
      {
        path: "genre/:genreNameId",
        element: <IndividualGenre />,
      },
      {
        path: "movie/:searchInRange",
        element: <SearchInRange />,
      },
      {
        path: "genre",
        element: <Genre></Genre>,
      },
      {
        path: "watchlist",
        element: <WatchList></WatchList>,
      },
    ],
  },
]);

export default router;
