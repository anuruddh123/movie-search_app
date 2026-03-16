import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {

  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add movie to favorites
  const addFavorite = (movie) => {
    const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);

    if (!exists) {
      setFavorites([...favorites, movie]);
    }
  };

  // Remove movie from favorites
  const removeFavorite = (id) => {
    const updated = favorites.filter((movie) => movie.imdbID !== id);
    setFavorites(updated);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};