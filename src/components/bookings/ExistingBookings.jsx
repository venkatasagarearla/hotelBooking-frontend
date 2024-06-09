import React, { useEffect,useState } from 'react'
import Header from '../common/Header'
import { cancleBooking, getAllBookings } from '../utils/ApiFunctions'
import BookingsTable from './Table' 


const Bookings = () => {
const[bookingInfo,setBookingInfo]=useState([])
const[isLoading,setIsLoading]=useState(true)
const[error,setError]=useState("")
useEffect(()=>{
setTimeout(() => {
    getAllBookings().then((data)=>{
       setBookingInfo(data)
       setIsLoading(false) 
    }).catch((error)=>{
        setError(error.message)
        setIsLoading(false)
    })
}, 1000);
},[])

const handleBookingCancellation=async(bookingId)=>{
              try{
                 await cancleBooking(bookingId)
                  const data=getAllBookings
                  setBookingInfo(data)
              }catch(error){
                setError(error.message)
              }
}

  return (
    <section className='container'style={{backgroundColor:"whitesmoke"}}>
        <Header title={"Existing Bookings"}/>
        {error && (<div className="text-danger">{error}</div>)}
        {isLoading ? (
        <div>Loading existing bookings</div>)
        :(
        <BookingsTable bookingInfo={bookingInfo} handleBookingCancellation={handleBookingCancellation}/>
        )}
        
    </section>





  )
}

export default Bookings