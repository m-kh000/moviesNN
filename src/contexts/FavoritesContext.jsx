import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState(() => {
    const saved = localStorage.getItem("likedMovies");
    return saved ? JSON.parse(saved) : {};
  });

  const toggleLike = (movie) => {
    setLikedMovies((prev) => {
      const updated = prev[movie.id] 
        ? { ...prev, [movie.id]: undefined } 
        : { ...prev, [movie.id]: movie };
      
      localStorage.setItem("likedMovies", JSON.stringify(updated));
      return updated;
    });
  };

  const getFavorites = () => Object.values(likedMovies).filter(Boolean);

  return (
    <FavoritesContext.Provider value={{ likedMovies, toggleLike, getFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};