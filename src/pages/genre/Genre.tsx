import { useEffect, useState } from "react";
import genres from "./genre_utils/GenreData";
import MovieGenre from "./genre_componets/MovieGenre";
import BackToTopButton from "../../components/BackToTopButton";

const Genre = () => {
  const [backToTopButton, setBackToTopButton] = useState(false); // State to control visibility of scroll button

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
    <div className="grid grid-cols-1 gap-6 bg-black">
      {genres.map((item) => (
        <MovieGenre genreId={item.id} genreName={item.name}></MovieGenre>
      ))}
      {backToTopButton && (
        <BackToTopButton
          scrollToTop={scrollToTop}
          backToTopButton={backToTopButton}
        ></BackToTopButton>
      )}
    </div>
  );
};

export default Genre;
