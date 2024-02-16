import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWatchlist } from "../../redux/features/watchlist/watchListSlice";

const WatchList = () => {
  const dispatch = useDispatch();
  const [watchlistLength, setWatchlistLength] = useState(0);

  useEffect(() => {
    const watchlistData = localStorage.getItem("watchlist");

    if (watchlistData) {
      const watchlist = JSON.parse(watchlistData);
      const length = watchlist.length;
      setWatchlistLength(length);
      dispatch(setWatchlist(length));
    }
  }, [dispatch]);

  return (
    <div>
      <h1>Watchlist Length: {watchlistLength}</h1>
    </div>
  );
};

export default WatchList;
