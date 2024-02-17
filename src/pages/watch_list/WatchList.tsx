/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWatchlist } from "../../redux/features/watchlist/watchListSlice";
import Title from "../../components/Title";
import WatchListCard from "../../components/WatchListCard";
import BackToTopButton from "../../components/BackToTopButton";

const WatchList = () => {
  const dispatch = useDispatch();
  const watchlistData = localStorage.getItem("watchlist");
  const watchlist = watchlistData ? JSON.parse(watchlistData) : [];
  const [backToTopButton, setBackToTopButton] = useState(false); // State to control visibility of scroll button
  useEffect(() => {
    const length = watchlist.length;
    dispatch(setWatchlist(length));
  }, [dispatch]);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop; // Show/hide back to top button based on scroll position

    if (scrollTop > 100) {
      setBackToTopButton(true);
    } else {
      setBackToTopButton(false);
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
      <Title title="Your Watchlist"></Title>
      {watchlist?.length === 0 && (
        <p className="text-xl font-bold text-red-600">
          Your watchlist is empty now!
        </p>
      )}
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
        {watchlist?.map((item: any) => (
          <WatchListCard
            title={item?.movie?.title}
            posterPath={item?.movie?.poster_path}
            movieId={item?.movie?.id}
            releaseDate={item?.movie?.release_date}
          ></WatchListCard>
        ))}
      </div>
      {backToTopButton && (
        <BackToTopButton
          scrollToTop={scrollToTop}
          backToTopButton={backToTopButton}
        ></BackToTopButton>
      )}
    </div>
  );
};

export default WatchList;
