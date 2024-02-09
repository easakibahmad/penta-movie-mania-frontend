import { Navigate, createBrowserRouter } from "react-router-dom";
import Movie from "../pages/movie/Movie";
import MovieLayout from "../layout/MovieLayout";

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
    ],
  },
]);

export default router;
