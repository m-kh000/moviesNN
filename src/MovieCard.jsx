import "./css/MovieCard.css";
import pl from "/img/img pl.svg";
  const MovieCard = ({ movie: { poster_path, title, release_date, vote_average, original_language, genre, overview}, isLiked, onLike}) => {
  const year = release_date?.split('-')[0] || 'N/A';
  const lang = original_language?.toLowerCase()
  return (lang == "ko" || lang == "ta" || lang == "ja" 
  ? <></>
  :    <div className="movie-card group relative">
      <div className="movie-poster">{poster_path
            ? 
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        : <div>
          <img 
          src ={pl}
          className="p-20 pt-30"/>
        </div>
        }
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
      <div className="
        opacity-0 group-hover:opacity-100
        absolute inset-0 bg-[#000000d8]
        text-white text-center flex flex-col justify-center items-center
        rounded-xs
        z-20 p-2
        transition-all duration-300 ease-in-out
      ">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-xl mb-2">{genre}</p>
        <p className="text-sm">⭐ {vote_average || "N/A"}</p>
        {vote_average && (
          <p className="text-[13px] px-2 ">{overview}</p>
        )}
      </div>
    </div>);
};

// Remove default props for isLiked since it's controlled now
export default MovieCard;