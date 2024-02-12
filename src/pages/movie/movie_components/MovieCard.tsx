import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const MovieCard = () => {
  return (
    <div className="w-52 rounded-md">
      <div>
        <img
          src="https://image.tmdb.org/t/p/w500/24CL0ySodCF8bcm38xtBeHzHp7W.jpg"
          alt=""
          className="w-52 h-96"
        />
      </div>
      <div
        className="rounded-md grid grid-cols-1 space-y-6 text-white -mt-2 px-2 pt-6 pb-2"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="font-bold">
          <Link to="#" className="hover:underline">
            Badland Hunters
          </Link>
        </div>
        <button className=" text-white font-bold flex gap-2 justify-center bg-sky-950  items-center hover:bg-sky-800 rounded-sm py-1">
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
