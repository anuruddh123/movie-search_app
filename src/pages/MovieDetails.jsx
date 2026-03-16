import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/omdbApi";

function MovieDetails() {

const { id } = useParams();
const navigate = useNavigate();
const [movie, setMovie] = useState(null);

useEffect(() => {

const fetchDetails = async () => {
const data = await getMovieDetails(id);
setMovie(data);
};

fetchDetails();

}, [id]);

if (!movie)
return (
<div className="flex justify-center items-center h-screen text-white text-xl bg-black">
Loading Movie Details...
</div>
);

return (

<div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-950 text-white p-6">

{/* Back Button */}

<button
onClick={() => navigate(-1)}
className="mb-6 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg"
>
⬅ Back
</button>

{/* Page Heading */}

<h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg">
🎬 Movie Details
</h1>

<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

{/* Poster */}

<div className="flex justify-center">

<div className="bg-slate-900 p-4 rounded-xl shadow-2xl">

<img
src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"}
alt={movie.Title}
className="w-80 rounded-lg hover:scale-105 transition"
/>

</div>

</div>

{/* Movie Info */}

<div className="space-y-5">

<h2 className="text-3xl font-bold">
{movie.Title}
</h2>

{/* Rating + Year */}

<div className="flex gap-3 flex-wrap">

<span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
⭐ IMDB {movie.imdbRating}
</span>

<span className="bg-slate-700 px-3 py-1 rounded-full text-sm">
📅 {movie.Year}
</span>

<span className="bg-slate-700 px-3 py-1 rounded-full text-sm">
⏱ {movie.Runtime}
</span>

</div>

{/* Genre */}

<div>

<h3 className="text-lg font-semibold mb-2 text-blue-400">
Genres
</h3>

<div className="flex gap-2 flex-wrap">

{movie.Genre.split(",").map((g, index) => (

<span
key={index}
className="bg-blue-600 text-sm px-3 py-1 rounded-full"
>
{g}
</span>

))}

</div>

</div>

{/* Plot */}

<div>

<h3 className="text-lg font-semibold mb-2 text-blue-400">
Storyline
</h3>

<p className="text-gray-300 leading-relaxed">
{movie.Plot}
</p>

</div>

{/* Extra Info */}

<div>

<h3 className="text-lg font-semibold mb-3 text-blue-400">
Movie Information
</h3>

<div className="grid grid-cols-2 gap-4 text-sm">

<p>
<span className="text-gray-400">Director:</span> {movie.Director}
</p>

<p>
<span className="text-gray-400">Actors:</span> {movie.Actors}
</p>

<p>
<span className="text-gray-400">Language:</span> {movie.Language}
</p>

<p>
<span className="text-gray-400">Awards:</span> {movie.Awards}
</p>

<p>
<span className="text-gray-400">Country:</span> {movie.Country}
</p>

<p>
<span className="text-gray-400">Released:</span> {movie.Released}
</p>

</div>

</div>

</div>

</div>

</div>

);

}

export default MovieDetails;