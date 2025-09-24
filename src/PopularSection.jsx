import Grid from "./Grid";
import ScrollableMovieCards from "./ScrollableMovieCards";
import scr from "/img/scr.svg";
import grid from "/img/grid.svg";

const PopularSection = ({ 
  movies, 
  textAboveSearch, 
  isGrid, 
  onToggleView, 
  onToggleLike, 
  likedMovies 
}) => {
  return (
    <div id="popular-container" className="w-[95vw]">
      <div className="section">
        <h2>{textAboveSearch}</h2>
        <button id="toggle-view" onClick={onToggleView}>
          <img src={isGrid ? scr : grid} className="icon" />
        </button>
      </div>

      {isGrid ? (
        <Grid
          popularMovies={movies}
          onToggleLike={onToggleLike}
          likedMovies={likedMovies}
        />
      ) : (
        <ScrollableMovieCards
          movies={movies}
          onToggleLike={onToggleLike}
          likedMovies={likedMovies}
        />
      )}
    </div>
  );
};

export default PopularSection;