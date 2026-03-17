import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useState, useRef } from "react";

function MovieCard({ movie }) {

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  const [showOverlay, setShowOverlay] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [toast, setToast] = useState("");

  const lastTap = useRef(0);

  // ❤️ Add/Remove
  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.imdbID);
      showToast("Removed 💔");
    } else {
      addFavorite(movie);
      showToast("Added ❤️");
    }
  };

  // 🔔 Toast
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  // 💖 Heart animation
  const triggerHeart = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 700);
  };

  // 📱 Tap / Double Tap logic
  const handleTap = () => {
    const now = Date.now();

    if (now - lastTap.current < 300) {
      // Double Tap
      if (!isFavorite) {
        addFavorite(movie);
        showToast("Added ❤️");
      }
      triggerHeart();
    } else {
      // Single Tap → toggle overlay
      setShowOverlay((prev) => !prev);
    }

    lastTap.current = now;
  };

  return (

    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">

      <div 
        className="relative group cursor-pointer"
        onClick={handleTap}
      >

        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
          className="w-full h-72 object-cover"
        />

        {/* ❤️ Heart Animation */}
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-6xl animate-ping">❤️</span>
          </div>
        )}

        {/* 🎯 Overlay */}
        <div
          className={`
            absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3
            transition-all duration-300
            ${showOverlay ? "opacity-100" : "opacity-0"}
            md:opacity-0 md:group-hover:opacity-100
          `}
        >

          <button
            onClick={(e) => {
              e.stopPropagation(); // 🔥 important
              handleFavorite();
            }}
            className={`px-4 py-1 rounded font-medium text-sm ${
              isFavorite
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isFavorite ? "Remove ❤️" : "Add ❤️"}
          </button>

          <Link
            to={`/movie/${movie.imdbID}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
          >
            View Details
          </Link>

        </div>

      </div>

      {/* Info */}
      <div className="p-3 text-white">
        <h2 className="font-semibold text-sm line-clamp-1">
          {movie.Title}
        </h2>
        <p className="text-gray-400 text-xs">
          {movie.Year}
        </p>
      </div>

      {/* 🔔 Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg animate-fade-in z-50">
          {toast}
        </div>
      )}

    </div>

  );
}

export default MovieCard;