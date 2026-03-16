function FilterDropdown({ setType }) {

return(

<select
onChange={(e)=>setType(e.target.value)}
className="dropdown-style"
>

<option value="">All</option>
<option value="movie">Movies</option>
<option value="series">Series</option>
<option value="episode">Episode</option>

</select>

)

}

export default FilterDropdown