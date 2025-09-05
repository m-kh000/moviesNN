// Grid.jsx
import React from "react";
import MovieCard from "./movieCard"; // Adjust path if needed
import "./Grid.css";

const Grid = ({ popularMovies }) => {
  return (
    <div className="movie-grid-container ">
      <div className="movie-grid ">
        {popularMovies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.original_title}
            img={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // 🔴 Fixed: removed extra space
                : "/placeholder.jpg"
            }
            year={movie.release_date?.split("-")[0] || "N/A"}
            rating={movie.vote_average?.toFixed(1)}
            isLiked={movie.isLiked}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;