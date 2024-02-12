/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const MovieCard = ({ title, posterPath }: any) => {
  return (
    <div
      className="grid rounded-sm overflow-hidden"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      <div className="transition-transform duration-300 text-white transform scale-100 hover:scale-105">
        <Link to="#">
          <img
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt="ImageNotFound"
            className="w-full h-72 transition-transform duration-300 transform scale-100 hover:scale-105"
          />
        </Link>
      </div>
      <div
        className="w-full h-cover grid grid-cols-1 text-white pt-3 pb-2 px-3"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="font-bold mb-6">
          <Link to="#" className="text-blue-500 hover:underline">
            {title}
          </Link>
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
