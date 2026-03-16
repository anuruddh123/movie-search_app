import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

function Favorites() {

  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">No Favorite Movies Yet</h2>
      </div>
    );
  }


  const removeFavorite = (id)=>{
setFavorites(favorites.filter(movie=>movie.imdbID !== id))
}
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Your Favorite Movies
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {favorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}

      </div>

    </div>
  );
}

export default Favorites;