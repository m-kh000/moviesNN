import { useState } from "react";
import Grid from "./Grid";
import ScrollableMovieCards from "./ScrollableMovieCards";
import ShinyText from "./ShinyText";
import Navbar from "./Navbar";
import scr from "/img/scr.svg";
import grid from "/img/grid.svg";

const FavoritesPage = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [likedMovies, setLikedMovies] = useState(() => {
    const saved = localStorage.getItem("likedMovies");
    return saved ? JSON.parse(saved) : {};
  });

  const toggleView = () => {
    setIsGrid(prev => !prev);
  };

  const toggleLike = (movie) => {
    setLikedMovies((prev) => {
      if (prev[movie.id]) {
        const { [movie.id]: removed, ...rest } = prev;
        const updated = rest;
        localStorage.setItem("likedMovies", JSON.stringify(updated));
        return updated;
      } else {
        const updated = { ...prev, [movie.id]: movie };
        localStorage.setItem("likedMovies", JSON.stringify(updated));
        return updated;
      }
    });
  };

  if (Object.keys(likedMovies).length === 0) {
    return (
      <div>
        <Navbar />
        <div className="place-items-center mt-11 mb-50">
          <div className="w-[95vw] text-center">
            <h2 className="text-2xl text-white mb-4">No Favorites Yet</h2>
            <p className="text-gray-400">Start liking movies to see them here!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="place-items-center mt-11 mb-50">
      <div className="w-[110vw] sm:w-[98vw] my-10">
        <div className="h1">
          Your&nbsp;
          <ShinyText
            text=" MKovies Favorites"
            disabled={false}
            speed={3}
            className="custom-class"
          />
        </div>
      </div>
      
      <div className="w-[95vw]">
        <div className="section">
          <h2>Favorites</h2>
          <button onClick={toggleView}>
            <img src={isGrid ? scr : grid} className="icon" />
          </button>
        </div>

        {isGrid ? (
          <Grid
            popularMovies={Object.values(likedMovies)}
            onToggleLike={toggleLike}
            likedMovies={likedMovies}
          />
        ) : (
          <ScrollableMovieCards
            movies={Object.values(likedMovies)}
            onToggleLike={toggleLike}
            likedMovies={likedMovies}
          />
        )}
      </div>
    </div>
    </div>
  );
};

export default FavoritesPage;