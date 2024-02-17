/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import movieAvatar from "../assets/movie.jpg";
import { useDispatch } from "react-redux";
import { setWatchlist } from "../redux/features/watchlist/watchListSlice";
import { toast } from "sonner";
import { useGetMovieByIdQuery } from "../redux/features/movies/movieDetailApi";
import { addToWatchlist } from "../redux/features/watchlist/addAndRemoveWatchlist";

const MovieCard = ({ title, posterPath, movieId, releaseDate }: any) => {
  const { data: movie } = useGetMovieByIdQuery(movieId);
  const [inWatchlist, setInWatchlist] = useState<boolean>(
    localStorage.getItem("watchlist")?.includes(movieId) || false
  );

  const dispatch = useDispatch();

  const toggleWatchlist = () => {
    let watchlist: any = JSON.parse(localStorage.getItem("watchlist") || "[]");
    if (!inWatchlist) {
      watchlist.push({ movieId, movie });
      dispatch(addToWatchlist({ movieId, movie }));

      toast.success(`${title} added to watchlist`);
    } else {
      watchlist = watchlist.filter((item: any) => item.movieId !== movieId);
      toast.warning(`${title} removed from watchlist`);
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    setInWatchlist(!inWatchlist);
    dispatch(setWatchlist(watchlist?.length));
  };

  const imagePath = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : movieAvatar;

  return (
    <div
      className="grid rounded-sm overflow-hidden"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      <div className="transition-transform duration-300 text-white transform scale-100 hover:scale-105">
        <Link
          to={`/movies/${movieId}`}
          onClick={(event) => {
            event.preventDefault();
            const href = event.currentTarget.getAttribute("href");
            if (href) {
              setTimeout(() => {
                window.location.href = href;
              }, 500);
            }
          }}
        >
          <img
            src={imagePath}
            alt={posterPath ? "ImageNotFound" : "DefaultImage"}
            className="w-full sm:h-72 h-56 transition-transform duration-300 transform scale-100 hover:scale-105"
          />
        </Link>
      </div>
      <div
        className="w-full h-cover grid grid-cols-1 text-white pt-3 pb-2 px-3"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="font-bold mb-2">
          <Link
            to={`/movies/${movieId}`}
            onClick={(event) => {
              event.preventDefault();
              const href = event.currentTarget.getAttribute("href");
              if (href) {
                setTimeout(() => {
                  window.location.href = href;
                }, 500);
              }
            }}
            className="text-blue-500 hover:underline md:text-md text-sm"
          >
            {title}
          </Link>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 ">{releaseDate?.slice(0, 4)}</p>
        </div>
        <button
          className="text-white md:text-md text-sm  font-semibold flex gap-2 justify-center bg-sky-950 items-center hover:bg-sky-900 rounded-sm py-1"
          onClick={toggleWatchlist}
        >
          <span>{inWatchlist ? <CheckOutlined /> : <PlusOutlined />}</span>
          Watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
