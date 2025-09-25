// ScrollableMovieCards.jsx
import React from "react";
import MovieCard from "./MovieCard";
import "../css/ScrollableMovieCards.css";

const ScrollableMovieCards = ({ movies, likedMovies, onToggleLike }) => {
  return (
    <div className="scrollable-movie-cards">
      <div className="cards-container">
        {movies.map((movie) => (
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

export default ScrollableMovieCards;