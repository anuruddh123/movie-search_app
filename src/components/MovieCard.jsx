import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function MovieCard({ movie }) {

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (

<div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">

<div className="relative group">

<img
src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
alt={movie.Title}
className="w-full h-72 object-cover"
/>

{/* Overlay */}

<div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition">

<button
onClick={handleFavorite}
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
className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
>

View Details

</Link>

</div>

</div>

<div className="p-3 text-white">

<h2 className="font-semibold text-sm line-clamp-1">
{movie.Title}
</h2>

<p className="text-gray-400 text-xs">
{movie.Year}
</p>

</div>

</div>

  );
}

export default MovieCard;