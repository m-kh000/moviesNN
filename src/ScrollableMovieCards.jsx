// ScrollableMovieCards.jsx
import React from "react";
import MovieCard from "./MovieCard";
import "./ScrollableMovieCards.css";

const ScrollableMovieCards = ({ movies, likedMovies, onToggleLike }) => {
  return (
    <div className="scrollable-movie-cards">
      <div className="cards-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id} // Use movie.id for key
            movie={movie}
            isLiked={likedMovies[movie.id] ?? false}
            onLike={() => onToggleLike(movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollableMovieCards;