/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";
import movieAvatar from "../assets/movie.jpg";
import { DeleteOutlined } from "@ant-design/icons";

const WatchListCard = ({ title, posterPath, movieId, releaseDate }: any) => {
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
            className="w-full h-72 transition-transform duration-300 transform scale-100 hover:scale-105"
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
            className="text-blue-500 hover:underline"
          >
            {title}
          </Link>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 ">{releaseDate?.slice(0, 4)}</p>
        </div>
        <button className="text-white  font-semibold flex gap-2 justify-center bg-sky-950 items-center hover:bg-sky-900 rounded-sm py-1 text-sm">
          <span>
            <DeleteOutlined />
          </span>
          Remove
        </button> 
      </div>
    </div>
  );
};

export default WatchListCard;
