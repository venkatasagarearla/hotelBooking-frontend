import React, { useState } from 'react'
import { cancleBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'

const FindBooking = () => {
    const[confirmationCode,setConfirmationCode]=useState("")
    const[error,setError]=useState("")
    const[isLoading,setIsLoading]=useState(false)
    const[bookingInfo,setBookingInfo]=useState({
         id:"",
         room:{id:" "},
          
        bookingConfirmationCode :"" ,
        roomNumber: "",
        checkInDate:"",
        checkOutDate:"",
        guestName:"",
        guestEmail:"",
        numOfAdults:"",
        numOfChildren:"",
        totalNumOfGuests:""
    })

    const clearBookingInfo={
        id:"",
         room:{id:" "},
          
        bookingConfirmationCode :"" ,
        roomNumber: "",
        checkInDate:"",
        checkOutDate:"",
        guestName:"",
        guestEmail:"",
        numOfAdults:"",
        numOfChildren:"",
        totalNumOfGuests:""
    }
    const[isDeleted,setIsDeleted]=useState(false)
  const handleInputChange=(e)=>{
    setConfirmationCode(e.target.value)
  }
    const handleFormSubmit=async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        try{
            const result=await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(result)
            console.log(result.id)
            console.log(result.checkInDate)
            console.log(result.checkOutDate)
            console.log(result.guestName)
            console.log(result.totalNumOfGuests)
           
            console.log("HIIIIIIIIIi")
        }catch(error){
            setBookingInfo(clearBookingInfo)
            if(error.response && error.response.status===404){
                setError(error.response.data.message)
            }
            else{
                setError(error.response)
            }
        }
       setTimeout(() => {
        setIsLoading(false)
       },2000);
    }
     const handleBookingCancellation=async(bookingId)=>{
        try{
            await cancleBooking(bookingInfo.id)
            setIsDeleted(true)
            setBookingInfo(clearBookingInfo)
            setConfirmationCode("")
            setError("")
        }
        catch(error){
            setError(error.message)
        }
    }
    

  return (
   <>
   <div className='container mt-5 d-flex flex-coloumn justify-content-center align-item-center'>
    <h2>Find My Booking</h2>
    <form onSubmit={handleFormSubmit} className='col-md-6'>
        <div className='input-group mb-3'>
           <input className='form-control' id="confirmationCode "
           name="confirmationCode"
           value={confirmationCode}
           placeholder='Enter the booking confirmation code'
           onChange={handleInputChange}>
           </input>
           <button className="btn btn-hotel input-group-text">Find Booking</button>
        </div>

    </form>

    {isLoading ?
      ( <div>Finding booking</div>
    ):error ?(<div className='text-danger'>{error}</div>
      ) :bookingInfo.bookingConfirmationCode ?(
        <div className='col-md-6 mt-4 mb-5'>
           <h3> Booking Information</h3> 
           <p>Booking Confirmation Code : {bookingInfo.bookingConfirmationCode}</p>
            <p>Booking ID:{bookingInfo.id}</p>
            <p>Room Number:{bookingInfo.room.id}</p>
            <p>Check-in Date:{bookingInfo.checkInDate}</p>
            <p>check-Out-Date:{bookingInfo.checkOutDate}</p>
            <p>FUll Name:{bookingInfo.guestName}</p>
            <p>Email Id:{bookingInfo.guestEmail}</p>
            <p>Adults:{bookingInfo.numOfAdults}</p>
            <p>Childrens:{bookingInfo.numOfChildren}</p>
            <p>Total Number of Guests:{bookingInfo.totalNumOfGuests}</p>
            {!isDeleted &&(
              <button className='btn-btn-danger' 
              onClick={()=>handleBookingCancellation(bookingInfo.id)}
              > Cancle Booking</button>
            )

            }
        </div>
      ):(
        <div>Find Booking.....
          </div>
      )
        }
        {isDeleted &&(
          <div className='alert alert-sucess mt-3' role="alert">Booking has been cancelled sucessfully</div>
        )}

   </div>
   </>
  )
}

export default FindBooking