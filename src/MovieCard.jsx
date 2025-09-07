import "./css/MovieCard.css";
import pl from "/img/placeholder.jpg";
  const MovieCard = ({ movie: { poster_path, title, release_date, vote_average, original_language }, isLiked, onLike }) => {
  const year = release_date?.split('-')[0] || 'N/A';
  const lang = original_language?.toLowerCase()
  return (lang == "ko" || lang == "ta" || lang == "ja" 
  ? <></>
  :    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : pl}
          alt={title}
        />
        <button onClick={onLike} className={`like-icon ${isLiked ? 'liked' : ''}`}>
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title || 'Unknown Title'}</h3>
        <div className="movie-meta">
          <span className="movie-year">{year}</span>
          <span className="movie-rating">⭐ {vote_average?.toFixed(1) ?? 0}</span>
        </div>
      </div>
    </div>);
};

// Remove default props for isLiked since it's controlled now
export default MovieCard;