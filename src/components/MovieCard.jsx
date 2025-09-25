import { useState, useEffect } from "react";
import "../css/MovieCard.css";
import pl from "/img/img pl.svg";
import likedIcon from "/img/liked.svg";
import notLikedIcon from "/img/not liked.svg";

const MovieCard = ({ movie: { poster_path, title, release_date, vote_average, original_language, genre, overview }, isLiked, onLike }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust breakpoint as needed
  const year = release_date?.split('-')[0] || 'N/A';
  const lang = original_language?.toLowerCase();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle card click (only on mobile)
  const handleCardClick = () => {
    if (isMobile) {
      setShowOverlay(prev => !prev);
    }
  };

  // Handle heart click — prevent triggering card click
  const handleLikeClick = (e) => {
    e.stopPropagation(); // 👈 Prevents card onClick from firing
    onLike();
  };

  // Handle hover for desktop
  const handleMouseEnter = () => {
    if (!isMobile) setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setShowOverlay(false);
  };

  if (lang == "ko" || lang == "ta" || lang == "ja") {
    return <></>;
  }

  return (
    <div 
      className="movie-card group relative" 
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="movie-poster py-[0.5px]">
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`} // ⚠️ Fixed extra space in URL
            alt={title}
          />
        ) : (
          <div>
            <img src={pl} className="p-20 pt-30" />
          </div>
        )}
        <button 
          onClick={handleLikeClick} 
          className={`z-30 like-icon ${isLiked ? 'liked' : ''}`}
        >
          <img src={isLiked ? likedIcon : notLikedIcon} alt={isLiked ? 'Liked' : 'Not liked'} className="!w-6 !h-6" />
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title || 'Unknown Title'}</h3>
        <div className="movie-meta">
          <span className="movie-year">{year}</span>
          <span className="movie-rating">⭐ {vote_average?.toFixed(1) ?? 0}</span>
        </div>
      </div>

      {/* Overlay */}
      <div className={`
        absolute inset-0 bg-[#000000d8]
        text-white text-center flex flex-col justify-center items-center
        rounded-xs
        z-20 p-2
        transition-all duration-300 ease-in-out
        ${showOverlay 
          ? 'opacity-100' 
          : isMobile 
            ? 'opacity-0' 
            : 'opacity-0 group-hover:opacity-100'
        }
      `}>
        <h3 className="font-bold text-lg mb-1 break-words whitespace-normal leading-tight">{title}</h3>
        <p className="text-xl mb-2">{genre}</p>
        <p className="text-sm">⭐ {vote_average || "N/A"}</p>
        {vote_average && (
          <p className="text-[13px] px-2 break-words whitespace-normal leading-tight">{overview}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;