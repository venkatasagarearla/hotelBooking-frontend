import React from 'react'
import { useState } from 'react'
import RoomPaginator from './RoomPaginator'
import {Button,Row} from "react-bootstrap"
import RoomCard from "../room/RoomCard"
const RoomSearchResult = ({results,onClearSearch}) => {
    const[currentPage,setCurrentPage]=useState(1)
    const resultsPerPage=3
    const totalResults=results.length()
    const totalPages=Math.ceil(totalResults / resultsPerPage)

    const handlePageChange=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    const startIndex=(currentPage-1) * resultsPerPage
    const endIndex=startIndex+resultsPerPage
    const paginatedResult=results.sclice(startIndex,endIndex)
  return (
  
<>
 { results.length> 0 ?(
    <>
   <h5 className='text-center mt-5'>Sreach Results</h5>
   <Row>
    {paginatedResult.map((room)=>(
        <RoomCard key={room.id } room={room}/>
    ))}
   </Row>
   <Row>
       {totalResults>resultsPerPage &&(
         <RoomPaginator currentPage={currentPage}
         totalPages={totalPages}
         onpageChange={handlePageChange}/>
       )}
<Button variant="secondary" onClick={onClearSearch}>
 Clear Search
 </Button>
   </Row>
</>
 ):(<p></p>)
    
 }


</>

    
  )
}

export default RoomSearchResult