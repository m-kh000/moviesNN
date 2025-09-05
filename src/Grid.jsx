// Grid.jsx
import React from "react";
import MovieCard from "./MovieCard"; // Make sure component name matches
import "./Grid.css";

const Grid = ({ popularMovies, likedMovies, onToggleLike }) => {
  return (
    <div className="movie-grid-container">
      <div className="movie-grid">
        {popularMovies.map((movie) => (
          <MovieCard
            key={movie.id} // Use movie.id instead of index
            movie={movie}
            isLiked={likedMovies[movie.id] ?? false}
            onLike={() => onToggleLike(movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;