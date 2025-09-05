import "./MovieCard.css";
  const MovieCard = ({ movie: { poster_path, title, release_date, vote_average }, isLiked, onLike }) => {
  const year = release_date?.split('-')[0] || 'N/A';

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "/placeholder.jpg"}
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
    </div>
  );
};

// Remove default props for isLiked since it's controlled now
export default MovieCard;