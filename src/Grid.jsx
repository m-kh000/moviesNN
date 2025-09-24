// Grid.jsx
import React from "react";
import MovieCard from "./MovieCard"; // Make sure component name matches
import "./css/Grid.css";

const Grid = ({ popularMovies, likedMovies, onToggleLike }) => {
  return (
    <div className="movie-grid-container">
      <div className="movie-grid">
        {popularMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isLiked={!!likedMovies[movie.id]}
            onLike={() => onToggleLike(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;