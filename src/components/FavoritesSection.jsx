import Grid from "./Grid";
import ScrollableMovieCards from "./ScrollableMovieCards";
import scr from "/img/scr.svg";
import grid from "/img/grid.svg";

const FavoritesSection = ({ 
  likedMovies, 
  isGrid, 
  onToggleView, 
  onToggleLike 
}) => {
  if (Object.keys(likedMovies).length === 0) return null;

  return (
    <div id="fav-container" className="w-[95vw]">
      <div className="section">
        <h2>Favorites</h2>
        <button id="toggle-fav-view" onClick={onToggleView}>
          <img src={isGrid ? scr : grid} className="icon" />
        </button>
      </div>

      {isGrid ? (
        <Grid
          popularMovies={Object.values(likedMovies)}
          onToggleLike={onToggleLike}
          likedMovies={likedMovies}
        />
      ) : (
        <ScrollableMovieCards
          movies={Object.values(likedMovies)}
          onToggleLike={onToggleLike}
          likedMovies={likedMovies}
        />
      )}
    </div>
  );
};

export default FavoritesSection;