// ScrollableMovieCards.jsx
import React from "react";
import MovieCard from "./movieCard";
import "./ScrollableMovieCards.css";

const ScrollableMovieCards = ({ movies }) => {
  return (
    <div className="scrollable-movie-cards " >
  <div className="cards-container ">
    {movies.map((movie, index) => {
      return (
        <MovieCard
          key={index}
          title={movie.original_title}
          img={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
          year={movie.release_date?.split('-')[0] || 'N/A'}
          rating={movie.vote_average?.toFixed(1)}
          isLiked={movie.isLiked}
        />
        
      );
    })}
  </div>
</div>
  );
};

export default ScrollableMovieCards;