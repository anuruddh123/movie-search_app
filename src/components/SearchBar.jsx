import { useState } from "react";

function SearchBar({ onSearch }) {

  const [query,setQuery] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center mb-6">

      <input
      type="text"
      placeholder="Search movie..."
      className="border p-2 rounded w-80"
      value={query}
      onChange={(e)=>setQuery(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 rounded">
        Search
      </button>

    </form>
  )
}

export default SearchBar