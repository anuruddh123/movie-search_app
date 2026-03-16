import MovieCard from "./MovieCard";

function MovieList({ movies }) {

if(!movies) return <p>No Movies Found</p>;

return(

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{movies.map((movie)=>(
<MovieCard key={movie.imdbID} movie={movie}/>
))}

</div>

)

}

export default MovieList;