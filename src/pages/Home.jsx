import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";

function Home() {

const [searchParams, setSearchParams] = useSearchParams();

const [query, setQuery] = useState(searchParams.get("q") || "");
const [movies, setMovies] = useState([]);
const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
const [type, setType] = useState(searchParams.get("type") || "");
const [loading, setLoading] = useState(false);

const { favorites } = useFavorites();
const [showFavorites, setShowFavorites] = useState(false);


const fetchMovies = async (search, pageNum, movieType) => {

if (!search) return;

setLoading(true);

const data = await searchMovies(search, pageNum, movieType);

if (data && data.Search) {
setMovies(data.Search);
} else {
setMovies([]);
}

setLoading(false);

};


useEffect(() => {

const q = searchParams.get("q");
const p = Number(searchParams.get("page")) || 1;
const t = searchParams.get("type") || "";

if (q) {
fetchMovies(q, p, t);
}

}, [searchParams]);


const handleSearch = (e) => {

e.preventDefault();

setSearchParams({
q: query,
page: 1,
type: type
});

};


const changePage = (newPage) => {

if (newPage < 1) return;

setPage(newPage);

setSearchParams({
q: query,
page: newPage,
type: type
});

};


const handleFilter = (e) => {

const selected = e.target.value;

setType(selected);

setSearchParams({
q: query,
page: 1,
type: selected
});

};


return (

<div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-950 text-white p-6">

{/* Heading */}

<h1 className="text-4xl font-bold text-center mb-8 animate-pulse">
🎬 Movie Search App
</h1>

{/* Search Section */}

<form
onSubmit={handleSearch}
className="flex justify-center gap-3 mb-8 flex-wrap"
>

<input
type="text"
placeholder="Search Movies..."
value={query}
onChange={(e) => setQuery(e.target.value)}
className="px-4 py-2 rounded bg-slate-800 border border-slate-700 outline-none"
/>

<select
value={type}
onChange={handleFilter}
className="px-4 py-2 rounded bg-slate-800 border border-slate-700"
>

<option value="">All</option>
<option value="movie">Movie</option>
<option value="series">Series</option>
<option value="episode">Episode</option>

</select>

<button
type="submit"
className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
>

Search

</button>

<button
type="button"
onClick={() => setShowFavorites(!showFavorites)}
className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded text-sm"
>

❤️ Favorites ({favorites.length})

</button>

</form>


{/* Loading */}

{loading && (

<p className="text-center text-lg">
Loading movies...
</p>

)}


{/* No Results Animation */}

{!loading && movies.length === 0 && !showFavorites && (

<div className="flex justify-center mt-16">

<p className="text-2xl font-semibold text-red-400 animate-bounce">

{type === "movie" && "🎬 No movies found"}

{type === "series" && "📺 No series found"}

{type === "episode" && "🎞️ No episodes found"}

{type === "" && "🔎 No results found"}

</p>

</div>

)}


{/* Favorites */}

{showFavorites ? (

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{favorites.length === 0 ? (

<p className="col-span-full text-center text-xl text-gray-400">
No favorites added yet
</p>

) : (

favorites.map((movie) => (
<MovieCard key={movie.imdbID} movie={movie} />
))

)}

</div>

) : (

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{movies.map((movie) => (
<MovieCard key={movie.imdbID} movie={movie} />
))}

</div>

)}


{/* Pagination */}

{!showFavorites && movies.length > 0 && (

<div className="flex justify-center gap-4 mt-10">

<button
onClick={() => changePage(page - 1)}
className="bg-gray-700 px-4 py-2 rounded disabled:opacity-40"
disabled={page === 1}
>

Prev

</button>

<span className="px-3 py-2">
Page {page}
</span>

<button
onClick={() => changePage(page + 1)}
className="bg-gray-700 px-4 py-2 rounded"
>

Next

</button>

</div>

)}

</div>

);

}

export default Home;