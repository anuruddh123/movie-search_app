function Pagination({page,setPage,totalResults}){

const totalPages = Math.ceil(totalResults / 10);

return(

<div className="flex justify-center gap-4 mt-8">

<button
onClick={()=>setPage(page-1)}
disabled={page===1}
className="bg-gray-300 px-3 py-1 rounded"
>
Prev
</button>

<span>{page} / {totalPages}</span>

<button
onClick={()=>setPage(page+1)}
disabled={page===totalPages}
className="bg-gray-300 px-3 py-1 rounded"
>
Next
</button>

</div>

)

}

export default Pagination