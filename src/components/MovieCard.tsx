/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import movieAvatar from "../assets/movie.jpg";

const MovieCard = ({ title, posterPath, movieId, releaseDate }: any) => {
  console.log(movieId);
  const imagePath = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : movieAvatar;

  return (
    <div
      className="grid rounded-sm overflow-hidden"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      <div className="transition-transform duration-300 text-white transform scale-100 hover:scale-105">
        <Link to={`/movies/${movieId}`}>
          <img
            src={imagePath}
            alt={posterPath ? "ImageNotFound" : "DefaultImage"}
            className="w-full h-72 transition-transform duration-300 transform scale-100 hover:scale-105"
            // style={{ height: "320px" }}
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
            className="text-blue-500 hover:underline"
          >
            {title}
          </Link>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 ">{releaseDate?.slice(0, 4)}</p>
        </div>
        <button className="text-white font-semibold flex gap-2 justify-center bg-sky-950 items-center hover:bg-sky-900 rounded-sm py-1">
          <span>
            <PlusOutlined />
          </span>
          Watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
