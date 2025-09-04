// ScrollableMovieCards.jsx
import React from "react";
import MovieCard from "./movieCard";
import "./ScrollableMovieCards.css";

const ScrollableMovieCards = ({ movies }) => {
  return (
    <div className="scrollable-movie-cards">
      <div className="cards-container">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            img={movie.img}
            year={movie.year}
            rating={movie.rating}
            isLiked={movie.isLiked}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollableMovieCards;