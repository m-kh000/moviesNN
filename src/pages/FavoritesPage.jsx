import { useState } from "react";
import Grid from "../components/Grid";
import ScrollableMovieCards from "../components/ScrollableMovieCards";
import ShinyText from "../components/ShinyText";
import { useFavorites } from "../contexts/FavoritesContext";
import scr from "/img/scr.svg";
import grid from "/img/grid.svg";

const FavoritesPage = () => {
  const [isGrid, setIsGrid] = useState(true);
  const { likedMovies, toggleLike, getFavorites } = useFavorites();
  
  const moviesArray = getFavorites();
  const isEmpty = moviesArray.length === 0;

  const Header = () => (
    <div className="w-[98vw] my-10 h1">
      Your&nbsp;
      <ShinyText text=" MKovies Favorites" speed={3} />
    </div>
  );

  if (isEmpty) {
    return (
        <div className="w-[100vw] place-items-center mt-11 mb-50">
          <Header />
          <div className="w-[95vw] text-center">
            <h2 className="text-2xl text-white mb-4">No Favorites Yet</h2>
            <p className="text-gray-400">Start liking movies to see them here!</p>
          </div>
        </div>
    );
  }

  return (
      <div className="w-[100vw] place-items-center mt-11 mb-50">
        <Header />
        <div className="w-[95vw]">
          <div className="section">
            <h2>Favorites</h2>
            <button onClick={() => setIsGrid(!isGrid)}>
              <img src={isGrid ? scr : grid} className="icon" alt="Toggle view" />
            </button>
          </div>
          {isGrid ? (
            <Grid
              popularMovies={moviesArray}
              onToggleLike={toggleLike}
              likedMovies={likedMovies}
            />
          ) : (
            <ScrollableMovieCards
              movies={moviesArray}
              onToggleLike={toggleLike}
              likedMovies={likedMovies}
            />
          )}
        </div>
      </div>
  );
};

export default FavoritesPage;