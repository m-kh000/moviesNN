// MovieCard.jsx
import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ img, title, year, rating, isLiked: likedFromParent }) => {
  // Use internal state only if the parent isn't controlling `isLiked`
  // If you plan to control it from parent, see note below
  const [isLiked, setIsLiked] = useState(likedFromParent ?? false);

  const handleLike = () => {
    setIsLiked(prev => !prev);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={img || '/placeholder.jpg'} alt={title} />
        <button onClick={handleLike} className={`like-icon ${isLiked ? 'liked' : ''}`}>
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title || 'Unknown Title'}</h3>
        <div className="movie-meta">
          <span className="movie-year">{year || 'N/A'}</span>
          <span className="movie-rating">⭐ {rating ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

// Default props
MovieCard.defaultProps = {
  img: '/placeholder.jpg', // fallback image (put a black image or poster placeholder in public/)
  title: 'Unknown Title',
  year: 'N/A',
  rating: 0,
  isLiked: false,
};

export default MovieCard;