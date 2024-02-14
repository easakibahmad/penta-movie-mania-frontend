import React from "react";
import genres from "./genre_utils/GenreData";
import MovieGenre from "./genre_componets/MovieGenre";

const Genre = () => {
  return (
    <div className="grid grid-cols-1 gap-10 bg-black">
      {genres.map((item) => (
        <MovieGenre genreId={item.id} genreName={item.name}></MovieGenre>
      ))}
    </div>
  );
};

export default Genre;
